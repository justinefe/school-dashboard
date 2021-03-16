import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import { useStateValue } from "../stateProvider";
import { axiosCall } from "../axios";

am4core.useTheme(am4themes_animated);

const Ethnicity = () => {
  // const [{ basket, user }, dispatch] = useStateValue();
  const [ethnicity, setEthnicity] = useState(null);
  const ethnicityRef = useRef(null);

  useEffect(async () => {
    const result = await axiosCall({
      path: "/api/v1/user/ethnicity",
      method: "get",
    });
    setEthnicity(result.user.User);
  }, []);
  useLayoutEffect(() => {
    let x = am4core.create("ethnicitydiv", am4charts.PieChart);
    x.data = ethnicity?.map(({ count, ethnicity }) => ({
      count: Number(count),
      ethnic: ethnicity.replace(/\*/i, " "),
    }));

    // Add and configure Series
    let pieSeries = x.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "ethnic";
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

    ethnicityRef.current = x;

    return () => {
      x.dispose();
    };
  }, [ethnicity]);
  return (
    <div id="ethnicitydiv" style={{ width: "100%", height: "100%" }}></div>
  );
};

export default Ethnicity;
