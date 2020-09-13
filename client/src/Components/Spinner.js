import React from "react";

const Spinner = ({ className = "", style = {} }) => {
  return <div className={`loader ${className}`} style={style}></div>;
};
export default Spinner;
