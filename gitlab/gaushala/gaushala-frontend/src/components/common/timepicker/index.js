import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { FormControl, InputLabel } from "@mui/material";

export default function ResponsiveTimePickers({
  title,
  classNames,
  placeholder,
  main_input_wrapper,
  onChange,
  value,
}) {
  console.log(value, "vllllllllllll");
  return (
    <div className={main_input_wrapper}>
      <InputLabel id="label" className={classNames}>
        {title}
      </InputLabel>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            value={value}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  placeholder: "hh:mm",
                }}
              />
            )}
            ampm={false}
          />
        </LocalizationProvider>
      </FormControl>
    </div>
  );
}
