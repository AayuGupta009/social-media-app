import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CommonSelect({
  classNames,
  fullWidth,
  options,
  id,
  name,
  selectedValue,
  handleChange,
  main_className,
  ...props
}) {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <FormControl
        fullWidth
        className={`${main_className} main_className global_select `}
      >
        <Select
          onChange={handleChange}
          value={selectedValue}
          id={id}
          name={name}
          fullWidth={fullWidth}
          InputLabelProps={{ shrink: false }}
          {...props}
          displayEmpty
        >
          <MenuItem value="">
            <em>{t("dropdown.select")}</em>
          </MenuItem>
          {options &&
            options.map((item) => (
              <MenuItem value={item.value}>{item.label}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
