import React, { useRef } from "react";
import DropDown from "./Dropdown";
import "./Select.css";

const Select = React.forwardRef(
  ({ arr, width, val, setVal, setError }, selectRef) => {
    const openRef = useRef(null);

    const handleOpen = (e) => {
      e.preventDefault();
      if (openRef.current.style.display === "block") {
        openRef.current.style.display = "none";
        selectRef.current.style.boxShadow = "none";
      } else {
        openRef.current.style.display = "block";
        selectRef.current.style.border = "none";
      }
    };
    const handleClick = (e, val, key) => {
      e.preventDefault();

      setVal((prev) => ({ ...prev, value: val }));
      setVal((prev) => ({ ...prev, key }));
      setError((prev) => ({ ...prev, select: "" }));
      openRef.current.style.display = "none";
      selectRef.current.style.border = "1px solid #67b7dc";
    };
    return (
      <div
        style={{
          width: `${width}`,
          border: "1px solid #ced4da",
          borderRadius: "4px",
        }}
        className="select"
      >
        <div ref={selectRef} onClick={handleOpen} className="select_input">
          <span>{val.value}</span>
          <DropDown />
        </div>
        <div
          style={{ width: `${width}` }}
          ref={openRef}
          className="select_result"
        >
          {arr?.map((ar) => (
            <div
              className="select_result_each"
              key={ar.value}
              onClick={(e) => handleClick(e, ar.value, ar.key)}
            >
              <span>{ar.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default Select;
