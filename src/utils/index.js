import React from "react";
import DropDown from "../components/Dropdown";

export const Tree = ({ items, depth = 0 }) => {
  if (!items || !items.length) {
    return null;
  }
  return items.map((item) => (
    <div key={item.name}>
      {/* Multiply the depth by a constant to create consistent spacing */}
      <DropDown depth={depth} title={item.name} children={item.children} />
    </div>
  ));
};
