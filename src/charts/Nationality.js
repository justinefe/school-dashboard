import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useStateValue } from "../stateProvider";
import { axiosCall } from "../axios";

am4core.useTheme(am4themes_animated);

const Nationality = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [nationality, setNationality] = useState(null);
  const chart = useRef(null);

  useEffect(async () => {
    const result = await axiosCall({
      path: "/api/v1/user/nationality",
      method: "get",
    });
    setNationality(result.user.User);
  }, []);
  useLayoutEffect(() => {
    let x = am4core.create("nationalitydiv", am4charts.XYChart);
    // x.scrollbarX = new am4core.Scrollbar();

    x.data = nationality?.map(({ count, nationality }) => ({
      count: Number(count),
      country: nationality.replace(/\*/i, " "),
    }));

    // Create axes
    let categoryAxis = x.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    // categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;
    categoryAxis.renderer.labels.template.fill = am4core.color("#888");
    categoryAxis.renderer.labels.template.fontSize = 13;

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    valueAxis.renderer.labels.template.fill = am4core.color("#888");
    valueAxis.renderer.labels.template.fontSize = 13;

    // Create series
    let series = x.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "count";
    series.dataFields.categoryX = "country";
    // series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    // series.tooltipText = "[{categoryX}]:{valueY}";
    // series.tooltipText = "{categoryX}: {valueY}";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.adapter.add("fill", function (fill, target) {
      return x.colors.getIndex(target.dataItem.index);
    });

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [nationality]);
  return (
    <div id="nationalitydiv" style={{ width: "100%", height: "500px" }}></div>
  );
};

export default Nationality;
