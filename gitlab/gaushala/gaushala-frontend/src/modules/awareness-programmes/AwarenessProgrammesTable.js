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
import { useTranslation } from "react-i18next";
import { ReactComponent as ViewIcon } from "../../assets/images/eye.svg";
import DeleteModal from "../../components/common/delete-modal/DeleteModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, truncateTitle } from "../../utils/commonFunctions";
import { Tooltip } from "@mui/material";
import { ReactComponent as EyeIcon } from "../../assets/images/eye.svg";
import CustomDialog from "../../components/common/Dialogue/";
import { ReactComponent as ImageIcon } from "../../assets/images/image.svg";

export default function AwarenessProgrammesTable({
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
  const [isFullImage, setIsFullImage] = useState(false);

  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    { id: "cowshedName", label: `${t("table.gaushala")}` },
    {
      id: "eventDate",
      label: `${t("table.date")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "title",
      label: `${t("table.title")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "image",
      label: `${t("table.picture")}`,
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
      id: "createdBy",
      label: `${t("table.by")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "action",
      label: `${t("table.action_2")}`,
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
                                        `/awareness-programmes/edit-programmes/${row._id}`
                                      )
                                    }
                                  />
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
                          ) : column.id === "image" ? (
                            <TableCell key={column.id} align={column.align}>
                              <ImageIcon
                                onClick={() => setIsFullImage(row.image)}
                                style={{ cursor: "pointer" }}
                              />
                            </TableCell>
                          ) : column.id === "title" ? (
                            <Tooltip title={row.title}>
                              <TableCell key={column.id} align={column.align}>
                                {truncateTitle(value) ?? "NA"}
                              </TableCell>
                            </Tooltip>
                          ) : column.id === "event" ? (
                            <TableCell key={column.id} align={column.align}>
                              <ViewIcon />
                            </TableCell>
                          ) : column.id === "createdBy" ? (
                            <TableCell key={column.id} align={column.align}>
                              {value === 1
                                ? `${t("tab.cowshed")}`
                                : `${t("tab.admin")}`}
                            </TableCell>
                          ) : column.id === "document" ? (
                            <TableCell key={column.id} align={column.align}>
                              <EyeIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDownload(row.document)}
                              />
                            </TableCell>
                          ) : column.id === "eventDate" ? (
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

      <DeleteModal
        isOpen={isDelete}
        handleConfirm={() => handleDelete(isDelete)}
        handleClose={() => setIsDelete(false)}
        title={isDelete.title}
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
