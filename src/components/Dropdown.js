import React, { useRef } from "react";
import Drop from "../assets/Drop";

const Dropdown = ({ title, children, depth = 5 }) => {
  const dropRef = useRef();
  const handleClose = (e) => {
    e.preventDefault();
    if (dropRef.current.style.display === "flex") {
      dropRef.current.style.display = "none";
    } else {
      dropRef.current.style.display = "flex";
    }
  };
  if (!title) {
    return null;
  }
  return (
    <React.Fragment>
      <div
        style={{ paddingLeft: depth * 8 }}
        className={`flex w-full py-2 cursor-pointer hover:bg-blue-900 text-lg text-white font-medium justify-between items-center`}
      >
        {" "}
        <span>{title}</span>
        {children?.length ? <Drop handleClose={handleClose} /> : ""}
      </div>
      <div ref={dropRef} className=" hidden flex-col  ">
        {children?.map((child) => (
          <Dropdown
            key={child}
            title={child.name}
            children={child.children}
            depth={depth + 2}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Dropdown;
