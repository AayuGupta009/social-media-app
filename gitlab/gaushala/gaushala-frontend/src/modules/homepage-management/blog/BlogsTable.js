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
import { ReactComponent as EyeIcon } from "../../../assets/images/eye.svg";
import { useTranslation } from "react-i18next";
import { ReactComponent as TickSvg } from "../../../assets/images/tick-circle.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "../../../components/common/delete-modal/DeleteModal";
import { ReactComponent as ImageIcon } from "../../../assets/images/image.svg";
import CustomDialog from "../../../components/common/Dialogue";
import { Tooltip } from "@mui/material";
import {
  formatDate,
  truncateDescription,
  truncateTitle,
} from "../../../utils/commonFunctions";

export default function BlogsTable({
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
  const [opens, setOpens] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isFullImage, setIsFullImage] = useState(false);

  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    {
      id: "image",
      label: `${t("table.picture")}`,
      align: "left",
    },
    { id: "createdAt", label: `${t("table.date")}` },
    { id: "title", label: `${t("table.title")}` },
    { id: "description", label: `${t("table.description_n")}` },
    { id: "status", label: `${t("table.status")}` },
    {
      id: "action",
      label: `${t("table.action")}`,
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
                                <div className="action-icon">
                                  <EditIcon
                                    onClick={() =>
                                      navigate(
                                        `/homepage-management/edit-blog/${row._id}`
                                      )
                                    }
                                  />
                                  <TrashIcon
                                    onClick={() =>
                                      setIsDelete({
                                        isopen: true,
                                        id: row._id,
                                        val: row.description,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </TableCell>
                          ) : column.id === "image" ? (
                            <TableCell key={column.id} align={column.align}>
                              <ImageIcon
                                onClick={() => setIsFullImage(row.image)}
                                style={{ cursor: "pointer" }}
                              />
                            </TableCell>
                          ) : column.id === "createdAt" ? (
                            <TableCell key={column.id} align={column.align}>
                              {formatDate(value) ?? "NA"}
                            </TableCell>
                          ) : column.id === "description" ? (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ cursor: "pointer" }}
                            >
                              <div
                                className="action-icon"
                                onClick={() =>
                                  setOpens({ open: true, val: value })
                                }
                              >
                                {truncateDescription(value)}
                              </div>
                            </TableCell>
                          ) : column.id === "title" ? (
                            <Tooltip title={row.title}>
                              <TableCell key={column.id} align={column.align}>
                                {truncateTitle(value) ?? "NA"}
                              </TableCell>
                            </Tooltip>
                          ) : (
                            <TableCell key={column.id} align={column.align}>
                              {value}
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
        header={t("add_programmes.blog_descri")}
        bodyChild={opens?.val}
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
        title={"Banner"}
      />
      {isFullImage && (
        <CustomDialog
          fullScreen={true}
          isOpen={isFullImage}
          bodyChild={<img src={isFullImage} alt={""} />}
          handleClose={() => setIsFullImage("")}
          isClose={true}
          mainClass="fullscreen_image"
        />
      )}
    </Paper>
  );
}
