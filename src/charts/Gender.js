import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useStateValue } from "../stateProvider";
import { axiosCall } from "../axios";

am4core.useTheme(am4themes_animated);

const Gender = () => {
  const [{}, dispatch] = useStateValue();
  const [gender, setGender] = useState(null);
  const genderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosCall({
        path: "/api/v1/user/gender",
        method: "get",
      });
      dispatch({
        type: "SET_GENDER",
        gender: result.user.User,
      });
      setGender(result.user.User);
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    let x = am4core.create("piediv", am4charts.PieChart);
    x.data = gender?.map(({ count, gender }) => ({
      count: Number(count),
      gender: gender.replace(/\*/i, " "),
    }));
    // Add and configure Series
    let pieSeries = x.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "gender";
    x.innerRadius = am4core.percent(40);

    //creating legend instance
    x.legend = new am4charts.Legend();
    x.legend.position = "right";
    // x.legend.marginBottom = 20;
    x.legend.labels.template.fontSize = "12px";
    x.legend.valueLabels.template.fontSize = "12px";
    x.legend.useDefaultMarker = true;

    let marker = x.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.width = 17;
    marker.height = 17;
    // x.legend.labels.template.maxWidth = 10;
    x.legend.labels.template.truncate = true;
    x.legend.maxHeight = 250;
    x.legend.scrollable = true;

    x.legend.itemContainers.template.paddingTop = 5;
    x.legend.itemContainers.template.paddingBottom = 5;

    x.legend.labels.template.fill = am4core.color("#888");
    x.legend.valueLabels.template.fill = am4core.color("#888");

    pieSeries.ticks.template.disabled = true;
    pieSeries.alignLabels = false;
    pieSeries.labels.template.text = "";
    pieSeries.labels.template.radius = am4core.percent(-30);
    pieSeries.labels.template.fill = am4core.color("white");

    genderRef.current = x;

    return () => {
      x.dispose();
    };
  }, [gender]);
  return <div id="piediv" style={{ width: "100%", height: "100%" }}></div>;
};

export default Gender;
