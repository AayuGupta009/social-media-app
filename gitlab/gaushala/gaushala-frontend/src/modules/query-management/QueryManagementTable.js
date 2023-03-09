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
// import { ReactComponent as ImageIcon } from "../../assets/images/image.svg";
import { ReactComponent as TrashIcon } from "../../assets/images/trash.svg";
import { useTranslation } from "react-i18next";
import CustomDialog from "../../components/common/Dialogue";
import { ReactComponent as SlashIcon } from "../../assets/images/slash.svg";
import { ReactComponent as EyeIcon } from "../../assets/images/eye.svg";
import { ReactComponent as ReplyIconSvg } from "../../assets/images/replyIcon.svg";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReplyContentModal from "./ReplyContentModal";
import DeleteModal from "../../components/common/delete-modal/DeleteModal";
import { formatDate } from "../../utils/commonFunctions";

export default function QueryManagementTable({
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
  handleSubmit,
  reasonText,
  open,
  setOpen,
  setModalId,
}) {
  const [opens, setOpens] = useState(false);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    { id: "name", label: `${t("table.name")}` },
    {
      id: "mobileNo",
      label: `${t("table.mob_no")}`,
      align: "left",
    },
    {
      id: "createdAt",
      label: `${t("table.date")}`,
      align: "left",
    },
    {
      id: "email",
      label: `${t("table.email")}`,
      align: "left",
    },
    {
      id: "question",
      label: `${t("reg_appn_form.qus")}`,
      align: "left",
    },
    {
      id: "action",
      label: `${t("table.action")}`,
      align: "left",
    },
  ];

  const handleReply = () => {
    setOpen(true);
    setOpens(false);
  };
  const handleQusModalOpen = (row) => {
    setOpens({ isOpen: true, val: row?.question });
    setModalId(row?._id);
  };
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
            {rows && rows?.length > 0 ? (
              rows.slice(0, rows?.length).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.id === "action" ? (
                            <TableCell key={column.id} align={column.align}>
                              <div className="action-icon">
                                <ReplyIconSvg
                                  onClick={() =>
                                    setOpen({ isOpen: true, replyId: row._id })
                                  }
                                />
                                <TrashIcon
                                  onClick={() =>
                                    setIsDelete({
                                      open: true,
                                      deleteId: row._id,
                                    })
                                  }
                                />
                              </div>
                            </TableCell>
                          ) : column.id === "question" ? (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ cursor: "pointer" }}
                            >
                              <div
                                className="action-icon"
                                onClick={() => handleQusModalOpen(row)}
                              >
                                {value}
                              </div>
                            </TableCell>
                          ) : column.id === "createdAt" ? (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ cursor: "pointer" }}
                            >
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
        count={count ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={`${t("pagination_label.show")}`}
      />
      <CustomDialog
        header={t("modal_title.enterReply")}
        header_style="custom_header"
        isOpen={open}
        isButton={true}
        no={t("action.reject")}
        yes={t("modal_title.send")}
        isText="2"
        placeholder={t("modal_title.reason")}
        fullWidth={true}
        handleConfirm={handleSubmit}
        handleClose={() => setOpen(false)}
        labelClass="input_label"
        mainClass="large_dailogue_box"
        singlebtn_class="singlebtn_class"
        modal_reason="modal_reason"
        reasonText={reasonText}
        rows="4"
      />
      <CustomDialog
        header={t("page_title.question_details")}
        bodyChild={opens?.val}
        header_style="custom_header"
        isOpen={opens}
        isButton={true}
        yes={t("modal_title.reply")}
        fullWidth={true}
        display="none"
        button_show={true}
        handleConfirm={handleReply}
        handleClose={() => setOpens(false)}
        labelClass="input_label"
        mainClass="large_dailogue_box description_modal"
        singlebtn_class="singlebtn_class"
        isClose={true}
      />
      <DeleteModal
        isOpen={isDelete}
        handleConfirm={() => handleDelete(isDelete)}
        handleClose={() => setIsDelete(false)}
        // title={isDelete.titles}
      />
    </>
  );
}
