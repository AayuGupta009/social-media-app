import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ReactComponent as EyeIcon } from "../../assets/images/eye.svg";
import { useTranslation } from "react-i18next";
import CustomDialog from "../../components/common/Dialogue";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { formatDate } from "../../utils/commonFunctions";

export default function NgoReqTable({
  rows,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
  count,
  message,
}) {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    { id: "name", label: `${t("table.ngo_name")}` },
    {
      id: "createdAt",
      label: `${t("table.date")}`,
      align: "left",
    },
    {
      id: "address",
      label: `${t("table.address")}`,
      align: "left",
    },
    {
      id: "registrationNo",
      label: `${t("table.reg_no")}`,
      align: "left",
    },
    {
      id: "email",
      label: `${t("table.email")}`,
      align: "left",
    },
    {
      id: "mobileNo",
      label: `${t("table.mob_no")}`,
      align: "left",
    },
    {
      id: "action",
      label: `${t("table.action")}`,
      align: "left",
    },
  ];

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.length > 0 ? (
              rows?.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.id === "action" ? (
                            <TableCell key={column.id} align={column.align}>
                              <div className="action-icon">
                                <EyeIcon
                                  onClick={() =>
                                    navigate(
                                      `/ngo-management/view-ngo-application-form/${row?._id}`
                                    )
                                  }
                                />
                              </div>
                            </TableCell>
                          ) : column.id === "createdAt" ? (
                            <TableCell key={column.id} align={column.align}>
                              {formatDate(value) ?? "NA"}
                            </TableCell>
                          ) : (
                            <TableCell key={column.id} align={column.align}>
                              {value ?? "NA"}
                            </TableCell>
                          )}
                        </>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell colSpan={9} className="buttonCell">
                  {message}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={`${t("pagination_label.show")}`}
      />
      <CustomDialog
        header={"गौशाला का चयन करें"}
        isOpen={open}
        isButton={true}
        // bodyChild={"Do you really want to delete this item?"}
        yes="सेव "
        no="रद्द करें"
        isText={true}
        placeholder="चयन करें"
        handleClose={() => setOpen(false)}
        label="गौशाला का नाम"
        labelClass="input_label"
        mainClass="cattle_dialogue_main"
      />
    </>
  );
}
