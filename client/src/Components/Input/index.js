import React from "react";
import "./index.scss";

const Input = ({
  id,
  label,
  wrprClsName = "",
  onChange,
  isInvalid,
  ComponentBelowInput, //usefull if we wanna place some text
  ...rest
}) => {
  return (
    <div className={`mb-4 ${wrprClsName}`}>
      <label
        htmlFor={id}
        className="label-grey text-xs inline-block mb-2"
        style={{ letterSpacing: 0.45 }}
      >
        {label}
        <span className="text-primary"> (*)</span>
      </label>
      <input
        id={id}
        className="block w-full py-2 px-4"
        style={{ borderRadius: "3px" }}
        required
        onChange={onChange}
        data-invalid={isInvalid}
        {...rest}
      />
      {ComponentBelowInput}
    </div>
  );
};

export default Input;
