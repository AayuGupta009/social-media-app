import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputLabel, FormControl } from "@mui/material";
import Icon from "@mui/material/Icon";

export default function Inputs({
  title,
  placeholder,
  classNames,
  rows,
  istextField,
  istextArea,
  main_input_wrapper,
  name,
  value,
  id,
  onChange,
  onKeyPress,
  props,
}) {
  return (
    <div className={main_input_wrapper}>
      <InputLabel id="label" className={classNames}>
        {title}
      </InputLabel>
      <FormControl fullWidth>
        {istextField && (
          <TextField
            fullWidth
            placeholder={placeholder}
            onChange={onChange}
            id={id}
            name={name}
            value={value}
            onKeyPress={onKeyPress}
          />
        )}
        {istextArea && (
          <TextField
            fullWidth
            placeholder={placeholder}
            onChange={onChange}
            id={id}
            rows={rows}
            name={name}
            value={value}
            onKeyPress={onKeyPress}
            multiline
          />
        )}
      </FormControl>
    </div>
  );
}
