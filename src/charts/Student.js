import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useStateValue } from "../stateProvider";
import { axiosCall } from "../axios";

am4core.useTheme(am4themes_animated);

const Population = () => {
  const [{}, dispatch] = useStateValue();
  const [usercount, setUsercount] = useState({
    student: "",
  });
  const studentRef = useRef(null);

  const convertStrTonum = (str) => Number(str);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosCall({
        path: "/api/v1/user/usercount",
        method: "get",
      });
      setUsercount({
        student: convertStrTonum(result.user.User.student),
      });
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    let x = am4core.create("student", am4charts.PieChart);
    x.data = [
      {
        name: "Students",
        numbers: usercount.student,
      },
    ];

    var pieSeries = x.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "numbers";
    pieSeries.dataFields.category = "name";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.colors.list = [am4core.color("#a367dc")];

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    x.innerRadius = am4core.percent(40);

    let label = pieSeries.createChild(am4core.Label);
    label.text = `${usercount.student}`;
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 25;
    label.fill = am4core.color("#888");

    pieSeries.ticks.template.disabled = true;
    pieSeries.alignLabels = false;
    pieSeries.labels.template.text = "";
    pieSeries.labels.template.radius = am4core.percent(-40);
    pieSeries.labels.template.fill = am4core.color("white");

    x.hiddenState.properties.radius = am4core.percent(0);

    studentRef.current = x;

    return () => {
      x.dispose();
    };
  }, [usercount]);
  return <div id="student" style={{ width: "100%", height: "100%" }}></div>;
};

export default Population;
