import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ReactComponent as TrashIcon } from "../../../assets/images/trash.svg";
import { ReactComponent as EyeIcon } from "../../../assets/images/eye.svg";
import { useTranslation } from "react-i18next";
import CustomDialog from "../../../components/common/Dialogue";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/common/delete-modal/DeleteModal";
import { useState } from "react";
import { formatDate } from "../../../utils/commonFunctions";

export default function CowshedRequestTable({
  rows,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
  count,
  handleDelete,
  message,
  isDelete,
  setIsDelete,
}) {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    { id: "cowshedName", label: `${t("table.gaushala")}`, minWidth: 100 },
    {
      id: "createdAt",
      label: `${t("table.date")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "address",
      label: `${t("table.address")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "registrationNo",
      label: `${t("reg_appn_form.reg_no")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "user",
      label: `${t("reg_appn_form.mob_n")}`,
      minWidth: 170,
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
              rows?.slice(0, rows.length).map((row, index) => {
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
                                      `/registered-gaushala-management/view-application-form/${row._id}`
                                    )
                                  }
                                />
                                <TrashIcon
                                  onClick={() =>
                                    setIsDelete({ isopen: true, id: row._id })
                                  }
                                />
                              </div>
                            </TableCell>
                          ) : column.id === "createdAt" ? (
                            <TableCell key={column.id} align={column.align}>
                              {formatDate(value) ?? "NA"}
                            </TableCell>
                          ) : column.id === "address" ? (
                            <TableCell key={column.id} align={column.align}>
                              {value?.city ?? "NA"}
                            </TableCell>
                          ) : column.id === "user" ? (
                            <TableCell key={column.id} align={column.align}>
                              {value?.mobileNo ?? "NA"}
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
        header={"खारिज करने का कारण"}
        isOpen={open}
        isButton={true}
        yes="भेजें"
        isText={true}
        placeholder="प्रवेश करना"
        fullWidth={true}
        display="none"
        button_show={true}
        handleClose={() => setOpen(false)}
        // label="प्रवेश करना"
        header_style="custom_header"
        labelClass="input_label"
        mainClass="cattle_dialogue_main"
        modal_reason="modal_reason"
      />
      <DeleteModal
        isOpen={isDelete}
        handleConfirm={() => handleDelete(isDelete)}
        handleClose={() => setIsDelete(false)}
      />
    </>
  );
}
