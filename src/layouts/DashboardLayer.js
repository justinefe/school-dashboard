import React from "react";
import { Tree } from "../utils";
import Search from "../assets/Search";
import Notification from "../assets/Notif";
import Message from "../assets/Message";

const folders = [
  {
    name: "Dashboard",
    children: [
      { name: "Staff", children: [] },
      {
        name: "Students",
        children: [],
      },
      { name: "Principal", children: [] },
      { name: "Teachers", children: [] },
    ],
  },
  {
    name: "Profile",
    children: [],
  },
  {
    name: "School Calender",
  },
  {
    name: "Payment Details",
  },
  {
    name: "Accomodation",
  },
  {
    name: "Library",
  },
];

const DashboardLayer = ({ children }) => {
  return (
    <div className="flex flex-row h-full">
      <div className="flex  flex-col sticky top-0  bg-blue-800 w-1/5  py-8 px-8 ">
        <div className="fixed">{Tree({ items: folders })}</div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between px-9 items-center h-20 text-lg text-primary bg-white shadow-lg">
          <div className="flex justify-between w-1/3 h-14 bg-backcolor ring-full px-4 rounded-xl items-center bg-red-600">
            <input
              className="flex-grow bg-transparent border-none outline-none"
              type="text"
            />
            <Search />
          </div>
          <div className="flex items-center  w-1/5 justify-between">
            <Notification />
            <Message />
            <div className="flex overflow-hidden rounded-full h-10 w-10 flex items-center justify-center">
              <img
                className="h-full object-contain"
                src="https://lh3.googleusercontent.com/ogw/ADGmqu8SYM7Xu7shhTaAAQ65f1_nGN_tQv7V8GxjhrGw_g=s83-c-mo"
                alt="UserImg"
              />
            </div>
            <h3>Justin Igugu</h3>
          </div>
        </div>
        <div className="flex flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayer;
