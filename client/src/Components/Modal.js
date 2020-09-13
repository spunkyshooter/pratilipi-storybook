import React from "react";

const Modal = ({ show, closeHndlr, children }) => {
  const onClickBackDrop = (e) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    closeHndlr();
  };

  return (
    <div
      className="fixed left-0 right-0 bottom-0 top-0  z-50 overflow-auto flex transition-opacity duration-150 ease-in"
      style={{
        opacity: show ? "1" : "0",
        visibility: show ? "visible" : "hidden",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }}
      onClick={onClickBackDrop}
    >
      <div style={{ zIndex: 999 }}>{children}</div>
    </div>
  );
};

export default Modal;
