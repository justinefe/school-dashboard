import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

// import { useStateValue } from "../stateProvider";
import { axiosCall } from "../axios";

const AgeDistribution = () => {
  // const [{ basket, user }, dispatch] = useStateValue();
  const [age, setAge] = useState(null);
  const chart = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosCall({
          path: "/api/v1/user/agedistribution",
          method: "get",
        });

        setAge(result.user.User);
      } catch (err) {
        console.log(">>>>>>>errrrrrrrrrrrrrrr>>>>>>>", err);
      }
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    let x = am4core.create("agediv", am4charts.XYChart);

    x.data = age?.map((eachSlice) => ({
      principalAge: Number(eachSlice.age),
      principal: Number(eachSlice.principal),
      teacherAge: Number(eachSlice.age),
      teacher: Number(eachSlice.teacher),
      studentAge: Number(eachSlice.age),
      student: Number(eachSlice.student),
    }));

    let valueAxisX = x.xAxes.push(new am4charts.ValueAxis());
    valueAxisX.title.text = "Age in numbers";
    valueAxisX.title.fill = am4core.color("#888");
    valueAxisX.title.fontSize = 13;
    valueAxisX.renderer.minGridDistance = 40;
    valueAxisX.renderer.grid.template.strokeDasharray = "8,8";
    valueAxisX.renderer.labels.template.fill = am4core.color("#888");
    valueAxisX.renderer.labels.template.fontSize = 13;

    console.log("=============>");

    x.legend = new am4charts.Legend();
    x.legend.position = "bottom";
    x.legend.paddingBottom = 20;
    x.legend.labels.template.fontSize = "12px";
    x.legend.valueLabels.template.fontSize = "12px";
    x.legend.useDefaultMarker = true;

    let marker = x.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    // marker.strokeWidth = 1;
    // marker.strokeOpacity = 1;
    // marker.stroke = am4core.color("#ccc");
    marker.width = 17;
    marker.height = 17;
    // x.legend.labels.template.maxWidth = 10;
    // x.legend.labels.template.truncate = true;

    x.legend.labels.template.fill = am4core.color("#888");
    x.legend.valueLabels.template.fill = am4core.color("#888");

    // Create value axis
    let valueAxisY = x.yAxes.push(new am4charts.ValueAxis());
    // valueAxisY.renderer.minGridDistance = 100;
    valueAxisY.title.text = "Principal, Teachers, and Student";
    valueAxisY.title.fill = am4core.color("#888");
    valueAxisY.title.fontSize = 13;
    valueAxisY.renderer.labels.template.fill = am4core.color("#888");
    valueAxisY.renderer.labels.template.fontSize = 13;

    // Create series
    const createSeries = (field, fieldName, Value) => {
      let lineSeries = x.series.push(new am4charts.LineSeries());
      let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
      lineSeries.dataFields.valueY = field;
      lineSeries.dataFields.valueX = Value;
      lineSeries.name = fieldName;
      lineSeries.tooltipText = `${fieldName}: {valueY} / Age : {valueX}`;
      return lineSeries;
    };
    createSeries("principal", "Principal", "principalAge");
    createSeries("teacher", "Teacher", "teacherAge");
    createSeries("student", "Student", "studentAge");

    // Scrollbars
    // x.scrollbarX = new am4core.Scrollbar();
    // x.scrollbarY = new am4core.Scrollbar();

    // Add cursor and series tooltip support
    x.cursor = new am4charts.XYCursor();

    valueAxisX.getSeriesDataItem = function (series, position) {
      let key = this.axisFieldName + this.axisLetter;
      let value = this.positionToValue(position);

      const dataItem = series.dataItems.getIndex(
        series.dataItems.findClosestIndex(
          value,
          function (x) {
            return x[key] ? x[key] : undefined;
          },
          "any"
        )
      );
      return dataItem;
    };

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [age]);
  return <div id="agediv" style={{ width: "100%", height: "400px" }}></div>;
};

export default AgeDistribution;
