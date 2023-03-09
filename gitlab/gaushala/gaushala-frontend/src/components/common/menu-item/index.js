import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ReactComponent as DotIcon } from "../../../assets/images/more-horizontal.svg";
import {
  Backdrop,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function DropdownItem({
  options,
  anchorEl,
  open,
  handleClose,
  isbuttons,
  ok,
  filter_btn,
  isheading,
  main_title,
  title,
  ischeckbx,
  defaultValue,
  isDistrictName,
  onChange,
  isBreedOptions,
  handleBreedChange,
}) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "10px",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            maxHeight: "400px",
            minWidth: "200px",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {isheading && (
          <div className={main_title}>
            <p>{title}</p>
          </div>
        )}
        {options &&
          options.map((option) => (
            <MenuItem
              onClick={option.onClick}
              key={option.value}
              value={option.value}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText>{option.value}</ListItemText>
            </MenuItem>
          ))}

        {isBreedOptions
          ? isBreedOptions.map((option) => (
              <div
                style={{
                  paddingLeft: ".8rem",
                  paddingBottom: ".5rem",
                  width: "250px",
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={onChange} id={option?._id} />}
                    label={option?.name}
                  />
                </FormGroup>
              </div>
            ))
          : ""}
        {isDistrictName?.map((district) => (
          <div
            style={{
              paddingLeft: ".8rem",
              paddingBottom: ".5rem",
              width: "250px",
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={onChange} id={district?._id} />}
                label={district?.name}
              />
            </FormGroup>
          </div>
        ))}

        {isbuttons && (
          <div className={filter_btn}>
            <Button color="primary" variant="contained" fullWidth>
              {ok}
            </Button>
          </div>
        )}
      </Menu>
    </Backdrop>
  );
}
