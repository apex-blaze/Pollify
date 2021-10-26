import React, { useState } from "react";
import "../styles.css";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const ToggleSwitch = (props) => {
  function onChangeSwitch(e) {
    props.setCheck(!props.check);
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <label className="switch ">
        <input type="checkbox" onChange={onChangeSwitch} />
        <span className="slider round"></span>
      </label>
      <div className="px-4">
        {props.check ? (
          <DateTimePicker
            value={props.selectedDate}
            disablePast
            onChange={props.setSelectedDate}
          />
        ) : null}
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default ToggleSwitch;
