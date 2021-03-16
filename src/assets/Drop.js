import React from "react";

const Drop = ({ handleClose }) => {
  return (
    <>
      <svg
        onClick={handleClose}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        fill="white"
        height="15px"
        viewBox="0 0 213.333 213.333"
        style={{ enableBackground: "new 0 0 213.333 213.333" }}
      >
        <g>
          <g>
            <polygon points="0,53.333 106.667,160 213.333,53.333 		" />
          </g>
        </g>
      </svg>
    </>
  );
};

export default Drop;
