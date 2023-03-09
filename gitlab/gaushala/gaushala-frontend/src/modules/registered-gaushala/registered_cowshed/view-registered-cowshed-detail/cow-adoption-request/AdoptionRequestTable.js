import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import { useTranslation } from "react-i18next";
import CustomDialog from "../../../../../components/common/Dialogue";
import { useState } from "react";
import DeleteModal from "../../../../../components/common/delete-modal/DeleteModal";
import { formatDate } from "../../../../../utils/commonFunctions";

export default function AdoptionRequestTable({
  rows,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
  count,
  message,
  handleDelete,
  isDelete,
  setIsDelete,
}) {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    { id: "name", label: `${t("table.name")}`, minWidth: 100 },
    {
      id: "createdAt",
      label: `${t("table.date_no")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "breed",
      label: `${t("table.breed")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "mobileNo",
      label: `${t("table.m_no")}`,
      minWidth: 170,
      align: "left",
    },

    {
      id: "description",
      label: `${t("table.reason")}`,
      minWidth: 170,
      align: "left",
    },

    {
      id: "aadharNo",
      label: `${t("table.aadhar_no")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "requestStatus",
      label: `${t("table.status")}`,
      minWidth: 100,
      align: "left",
    },
    {
      id: "address",
      label: `${t("table.place")}`,
      minWidth: 100,
      align: "left",
    },
    {
      id: "action",
      label: `${t("table.action")}`,
      minWidth: 100,
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
              rows?.slice(0, rows?.length).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.id === "action" ? (
                            <TableCell key={column.id} align={column.align}>
                              <div className="action-icon">
                                <TrashIcon
                                  onClick={() =>
                                    setIsDelete({ open: true, id: row._id })
                                  }
                                />
                              </div>
                            </TableCell>
                          ) : column.id === "description" ? (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              onClick={() =>
                                setOpen({ id: true, reason: value })
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {value ?? "NA"}
                            </TableCell>
                          ) : column.id === "cowBreed" ? (
                            <TableCell key={column.id} align={column.align}>
                              {value?.name.hi ?? "NA"}
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
        header={"गाय गोद लेने का कारण"}
        bodyChild={open?.reason}
        isOpen={open}
        isButton={true}
        yes={`${t("modal_title.ok")}`}
        fullWidth={true}
        display="none"
        button_show={true}
        handleConfirm={() => setOpen(false)}
        labelClass="input_label"
        header_style="custom_header"
        mainClass="large_dailogue_box description_modal"
        singlebtn_class="singlebtn_class"
      />
      <DeleteModal
        isOpen={isDelete}
        handleConfirm={() => handleDelete(isDelete)}
        handleClose={() => setIsDelete(false)}
      />
    </>
  );
}
