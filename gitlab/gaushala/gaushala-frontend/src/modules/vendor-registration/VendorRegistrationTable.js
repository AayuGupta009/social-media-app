import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ReactComponent as EditIcon } from "../../assets/images/edit-2.svg";
import { ReactComponent as TrashIcon } from "../../assets/images/trash.svg";
import { ReactComponent as EyeIcon } from "../../assets/images/eye.svg";
import { useTranslation } from "react-i18next";
import { ReactComponent as TickSvg } from "../../assets/images/tick-circle.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomDialog from "../../components/common/Dialogue/";
import DeleteModal from "../../components/common/delete-modal/DeleteModal";
import { ReactComponent as PendingSvg } from "../../assets/images/pending-icon.svg";
import {
  formatDate,
  truncateDescription,
  truncateTitle,
} from "../../utils/commonFunctions";
import { Tooltip } from "@mui/material";

export default function VendorRegistrationTable({
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
  const { t, i18n } = useTranslation();
  const [opens, setOpens] = useState(false);
  const navigate = useNavigate();
  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    {
      id: "cowshed",
      label: `${t("table.gaushala")}`,
      minWidth: 170,
      align: "left",
    },
    { id: "title", label: `${t("table.req_title")}`, minWidth: 100 },
    {
      id: "createdAt",
      label: `${t("table.date")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "description",
      label: `${t("table.description")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "document",
      label: `${t("table.view_document")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "vol_appn",
      label: `${t("modal_title.vendor")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "createdBy",
      label: `${t("table.addedBy")}`,
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
  const handleDownload = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                                <div className="action-icon">
                                  {row.isCompleted ? (
                                    <>
                                      <TickSvg />
                                      <EditIcon className="mySvg" />
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <PendingSvg />
                                      <EditIcon
                                        onClick={() =>
                                          navigate(
                                            `/vendor-management/edit-vendor/${row._id}`
                                          )
                                        }
                                      />
                                    </>
                                  )}
                                  <TrashIcon
                                    onClick={() =>
                                      setIsDelete({
                                        isopen: true,
                                        id: row._id,
                                        title: row.title,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </TableCell>
                          ) : column.id === "document" ? (
                            <TableCell key={column.id} align={column.align}>
                              <EyeIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDownload(row.document)}
                              />
                            </TableCell>
                          ) : column.id === "description" ? (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setOpens({ open: true, val: value })
                              }
                            >
                              {truncateDescription(value) ?? "NA"}
                            </TableCell>
                          ) : column.id === "createdAt" ? (
                            <TableCell key={column.id} align={column.align}>
                              {formatDate(value) ?? "NA"}
                            </TableCell>
                          ) : column.id === "title" ? (
                            <Tooltip title={row.title}>
                              <TableCell key={column.id} align={column.align}>
                                {truncateTitle(value) ?? "NA"}
                              </TableCell>
                            </Tooltip>
                          ) : column.id === "createdBy" ? (
                            <TableCell key={column.id} align={column.align}>
                              {value === 1
                                ? `${t("tab.cowshed")}`
                                : `${t("tab.admin")}`}
                            </TableCell>
                          ) : column.id === "cowshed" ? (
                            <TableCell key={column.id} align={column.align}>
                              {value?.cowshedName ?? "NA"}
                            </TableCell>
                          ) : column.id === "vol_appn" ? (
                            <TableCell key={column.id} align={column.align}>
                              <div className="action-icon">
                                <div className="action-icon">
                                  <EyeIcon
                                    onClick={() =>
                                      navigate(
                                        `/vendor-management/vendor-applicants-list/${row?._id}`
                                      )
                                    }
                                  />
                                </div>
                              </div>
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
        header={t("table.description")}
        bodyChild={opens?.val}
        isOpen={opens}
        isButton={true}
        yes={t("modal_title.ok")}
        fullWidth={true}
        display="none"
        button_show={true}
        handleConfirm={() => setOpens(false)}
        labelClass="input_label"
        mainClass="large_dailogue_box description_modal"
        singlebtn_class="singlebtn_class"
        header_style="custom_header"
      />
      <DeleteModal
        isOpen={isDelete}
        handleConfirm={() => handleDelete(isDelete)}
        handleClose={() => setIsDelete(false)}
        title={isDelete.title}
      />
    </Paper>
  );
}
