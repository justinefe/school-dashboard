import React, { useEffect, useState } from "react";
// react plugin for creating charts
import GenderGraph from "../../charts/Gender";
import Ethnicity from "../../charts/Ethnicity";
import Join from "../../charts/Join";
import Nationality from "../../charts/Nationality";
import AgeDistribution from "../../charts/AgeDistribution";

import { useStateValue } from "../../stateProvider";
import { axiosCall } from "../../axios";
// import Search from "../../components/Filter/Filter";
import DashboardLayer from "../../layouts/DashboardLayer";
import Principal from "../../charts/Principal";
import Teachers from "../../charts/Teacher";
import Students from "../../charts/Student";

const Dashboard = () => {
  const [usercount, setUsercount] = useState({
    principal: "",
    teacher: "",
    student: "",
  });
  const [years, setYears] = useState("");
  // const [{ basket, user, loading }, dispatch] = useStateValue();

  const convertStrTonum = (str) => Number(str);

  useEffect(async () => {
    const result = await axiosCall({
      path: "/api/v1/user/usercount",
      method: "get",
    });
    setUsercount({
      principal: convertStrTonum(result.user.User.principal),
      teacher: convertStrTonum(result.user.User.teacher),
      student: convertStrTonum(result.user.User.student),
    });
    const year = await axiosCall({
      path: "/api/v1/user/year",
      method: "get",
    });
    setYears(year.user.year);
  }, []);

  return (
    <DashboardLayer>
      <div className="px-6 py-6 w-full bg-backcolor">
        <div className="flex flex-row w-full h-56 justify-between">
          <div className="flex flex-col w-1/3 mx-3 my-3 bg-white shadow-lg overflow-hidden">
            <div className="pt-2 pl-3 border-gray-200">
              <h1 className="text-base text-primary">School Principal</h1>
            </div>
            <Principal />
          </div>
          <div className="flex flex-col w-1/3 mx-3 my-3 bg-white shadow-lg overflow-hidden">
            <div className="pt-2 pl-3 border-gray-200">
              <h1 className="text-base text-primary">School Teachers</h1>
            </div>
            <Teachers />
          </div>
          <div className="flex flex-col w-1/3 mx-3 my-3 bg-white shadow-lg overflow-hidden">
            <div className="pt-2 pl-3 border-gray-200">
              <h1 className="text-base text-primary">School Students</h1>
            </div>
            <Students />
          </div>
        </div>
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col w-1/2 mx-3 my-3 bg-white  shadow-lg overflow-hidden">
            <div className="py-1 pl-3 border-gray-200 ">
              <h1 className="text-base text-primary">
                School Ethnicity Distribution
              </h1>
            </div>
            <Ethnicity />
          </div>
          <div className=" w-1/2 h-96 mx-3 my-3  bg-white  shadow-lg overflow-hidden">
            <div className="block py-1 pl-3 border-gray-200 ">
              <h1 className="text-base text-primary">
                School Gender Distribution
              </h1>
            </div>
            <GenderGraph />
          </div>
        </div>{" "}
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col w-1/2 mx-3 my-3 bg-white shadow-lg">
            <div className="py-1 pl-3 border-gray-200 ">
              <h1 className="text-base text-primary">
                School Nationality Distribution
              </h1>
            </div>
            <Nationality />
          </div>
          <div className="flex flex-col w-1/2 mx-3 my-3 bg-white  shadow-lg">
            {/*       <Search /> */}
            <div className="block py-1 pl-3 border-gray-200 ">
              <h1 className="text-base text-primary">
                School Join Distribution
              </h1>
            </div>
            <Join />
          </div>
        </div>
        <div className="flex flex-col bg-white mx-3 my-3  shadow-lg"></div>
        <div className="flex flex-col bg-white mx-3 my-3 shadow-lg">
          {" "}
          <div className="block py-1 pl-3 border-gray-200 ">
            <h1 className="text-base text-primary">School Age Distribution</h1>
          </div>
          <AgeDistribution />
        </div>
      </div>
    </DashboardLayer>
  );
};
export default Dashboard;
