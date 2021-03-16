import React, { useState, useEffect, useRef } from "react";
import Select from "../Select/Select";
import moment from "moment";
import { useStateValue } from "../../stateProvider";
import { axiosCall } from "../../axios";

const Filter = () => {
  const [val, setVal] = useState({ value: "Select Year", key: 0 });
  const [select, setSelect] = useState({ value: "All years", key: 0 });
  const [month, setMonth] = useState({ value: "Select month", key: 0 });
  const [error, setError] = useState({ value: "All years", select: "" });
  const [years, setYears] = useState([]);
  const selectRef = useRef();
  const yearRef = useRef();
  const convertStrTonum = (str) => Number(str);

  const [
    { basket, user, allYears, months, days, weeks },
    dispatch,
  ] = useStateValue();

  useEffect(async () => {
    // const year = await axiosCall({
    //   path: "/api/v1/user/year",
    //   method: "get",
    // });
    // setYears(year.user.year);
    // if (select === "month") {
    //   const month = await axiosCall({
    //     path: `/api/v1/user/month?year=${val.year}`,
    //     method: "get",
    //   });
    //   console.log(">>>>>>>>>>>>>>>>>>..", month);
    // }
    // if (select === "week") {
    //   const week = await axiosCall({
    //     path: `/api/v1/user/week?year=${val.year}`,
    //     method: "get",
    //   });
    //   console.log(">>>>>>>>>>>>>>>>>>..", week);
    // }
    // if (select === "day") {
    //   const day = await axiosCall({
    //     path: `/api/v1/user/day?year=${val.year}&month=${month.key}`,
    //     method: "get",
    //   });
    //   console.log(">>>>>>>>>>>>>>>>>>..", day);
    // }
  }, [select.value]);
  console.log(">>>>>>>>>>>>>>>>>>..", select);

  const ar = years.map((yr) => ({
    key: yr.year,
    value: moment(yr.year).format("YYYY"),
  }));
  return (
    <div>
      Select:{" "}
      <Select
        arr={[
          { value: "All year", key: 0 },
          { value: "Year", key: 1 },
          { value: "Week", key: 2 },
          { value: "Days", key: 3 },
        ]}
        width="100px"
        val={select}
        setVal={setSelect}
        setError={setError}
        ref={selectRef}
      />
      {/*select.value === "All years" ? (
          ""
        ) : select.value === "Year" ? (
          <Select
            arr={ar}
            width="130px"
            val={val}
            setVal={setVal}
            setError={setError}
            ref={yearRef}
          />
        ) : (
          <>
            <Select
              arr={ar}
              width="130px"
              val={val}
              setVal={setVal}
              setError={setError}
              ref={yearRef}
            />

            <Select
              arr={[
                { value: "Jan", key: 1 },
                { value: "Feb", key: 2 },
                { value: "Mar", key: 3 },
                { value: "Apr", key: 4 },
                { value: "May", key: 5 },
                { value: "Jun", key: 6 },
                { value: "Jul", key: 7 },
                { value: "Aug", key: 8 },
                { value: "Sep", key: 9 },
                { value: "Oct", key: 10 },
                { value: "Nov", key: 11 },
                { value: "Dec", key: 12 },
              ]}
              width="140px"
              val={month}
              setVal={setMonth}
              setError={setError}
              ref={yearRef}
            />
          </>
            )*/}
    </div>
  );
};

export default Filter;
