import React from "react";

const InfoBox = ({ text, isError, color, className = "" }) => {
  return (
    <p
      className={`mt-2 leading-4 text-xs ${className}`}
      style={{ color: color || (isError ? "#FF5B4E" : "#999999") }}
    >
      {text}
    </p>
  );
};

export default InfoBox;
