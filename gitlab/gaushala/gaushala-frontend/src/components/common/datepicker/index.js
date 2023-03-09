import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, InputLabel } from "@mui/material";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CalenderSvg from "../../../assets/images/dashboard/calendar.svg";

export default function ResponsiveDatePickers({
  title,
  classNames,
  placeholder,
  main_input_wrapper,
  value,
  onChange,
}) {
  return (
    <>
      <div className={main_input_wrapper}>
        <InputLabel id="label" className={classNames}>
          {title}
        </InputLabel>
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={value}
              onChange={onChange}
              inputFormat="DD/MM/YYYY"
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: "dd-mm-yyyy",
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </FormControl>
      </div>
    </>
  );
}
