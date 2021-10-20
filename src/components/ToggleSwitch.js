import React from "react";
import "../styles.css";

const ToggleSwitch = () => {
  return (
    <label className="switch">
      <input type="checkbox" />
      <span class="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;
