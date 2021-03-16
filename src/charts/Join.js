import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

// import { useStateValue } from "../stateProvider";
import { axiosCall } from "../axios";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const Join = () => {
  // const [{ basket, user, years, month, day, week }, dispatch] = useStateValue();
  const [joindate, setJoindate] = useState(null);
  const chart = useRef(null);
  useEffect(async () => {
    const fetchData = async () => {
      const result = await axiosCall({
        path: "/api/v1/user/joindate",
        method: "get",
      });
      setJoindate(result.user.User);
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    //creating chart instance
    let x = am4core.create("chartdiv", am4charts.XYChart);
    x.colors.step = 2;

    //creating legend instance
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

    //data to fill the legend
    x.data = joindate?.map((eachSlice) => ({
      category: Number(eachSlice.year),
      first: Number(eachSlice.teacher),
      second: Number(eachSlice.student),
      third: Number(eachSlice.principal),
    }));
    //creating x axis for data
    let xAxis = x.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0;
    xAxis.renderer.cellEndLocation = 1;
    xAxis.renderer.grid.template.location = 0;
    xAxis.title.text = "Joined date (years)";
    xAxis.title.fill = am4core.color("#888");
    xAxis.title.fontSize = 13;
    xAxis.renderer.labels.template.fill = am4core.color("#888");
    xAxis.renderer.labels.template.fontSize = 13;

    //creating y axis for data
    let yAxis = x.yAxes.push(new am4charts.ValueAxis());
    yAxis.title.text = "Numbers than joined";
    yAxis.title.fill = am4core.color("#888");
    yAxis.title.fontSize = 13;
    yAxis.min = 0;
    yAxis.renderer.labels.template.fill = am4core.color("#888");
    yAxis.renderer.labels.template.fontSize = 13;

    const arrangeColumns = () => {
      let series = x.series.getIndex(0);

      let w =
        1 -
        xAxis.renderer.cellStartLocation -
        (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / x.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = x.series.length / 2;

          let newIndex = 0;
          x.series.each((series) => {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            } else {
              series.dummyData = x.series.indexOf(series);
            }
          });
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          x.series.each((series) => {
            let trueIndex = x.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            series.bulletsContainer.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
          });
        }
      }
    };

    //creating series axis
    const createSeries = (value, name) => {
      let series = x.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;
      series.columns.template.width = am4core.percent(100);
      series.columns.template.tooltipText = "{name}: {categoryX}: {valueY}";
      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);
      return series;
    };

    createSeries("first", "Teachers");
    createSeries("second", "Students");
    createSeries("third", "Principal");

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [joindate]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default Join;
