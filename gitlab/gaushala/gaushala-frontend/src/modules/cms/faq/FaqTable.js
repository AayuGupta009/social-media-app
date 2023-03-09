import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ReactComponent as EditIcon } from "../../../assets/images/edit-2.svg";
import { ReactComponent as TrashIcon } from "../../../assets/images/trash.svg";
import { useTranslation } from "react-i18next";
import { ReactComponent as ViewIcon } from "../../../assets/images/eye.svg";
import DeleteModal from "../../../components/common/delete-modal/DeleteModal";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomDialog from "../../../components/common/Dialogue";
import ViewFaq from "./ViewFaq";
import { truncateTitle } from "../../../utils/commonFunctions";
import { Tooltip } from "@mui/material";

export default function FaqTable({
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
  const navigate = useNavigate();
  const { activeTab } = useParams();
  const [opens, setOpens] = useState(false);

  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    {
      id: "question",
      label: `${t("reg_appn_form.qus")}`,
      align: "left",
    },
    {
      id: "answer",
      label: `${t("reg_appn_form.ans")}`,
      align: "left",
    },

    {
      id: "action",
      label: `${t("table.action_2")}`,
      align: "left",
    },
  ];

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
                                <ViewIcon
                                  onClick={() =>
                                    setOpens({ open: true, val: row })
                                  }
                                />
                                <EditIcon
                                  onClick={() =>
                                    navigate(`/cms/edit-faq/${row._id}`)
                                  }
                                />
                                <TrashIcon
                                  onClick={() =>
                                    setIsDelete({
                                      isopen: true,
                                      id: row._id,
                                      // title: row.title,
                                    })
                                  }
                                />
                              </div>
                            </TableCell>
                          ) : column.id === "question" ? (
                            <Tooltip title={row.question}>
                              <TableCell key={column.id} align={column.align}>
                                {truncateTitle(value) ?? "NA"}
                              </TableCell>
                            </Tooltip>
                          ) : column.id === "answer" ? (
                            <Tooltip title={row.answer}>
                              <TableCell key={column.id} align={column.align}>
                                {truncateTitle(value) ?? "NA"}
                              </TableCell>
                            </Tooltip>
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
        header={t("add_programmes.faq_descri")}
        bodyChild={<ViewFaq datas={opens.val} />}
        isOpen={opens}
        isButton={true}
        yes={`${t("modal_title.ok")}`}
        fullWidth={true}
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
        title={"FAQ"}
      />
    </Paper>
  );
}
