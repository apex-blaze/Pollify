import React, { useState } from "react";
import "../styles.css";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const ToggleSwitch = () => {
  const [check, setCheck] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  function onChangeSwitch(e) {
    setCheck(!check);
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <label className="switch ">
        <input type="checkbox" onChange={onChangeSwitch} />
        <span className="slider round"></span>
      </label>
      <div className="px-4">
        {check ? (
          <DateTimePicker
            value={selectedDate}
            disablePast
            onChange={setSelectedDate}
          />
        ) : null}
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default ToggleSwitch;
