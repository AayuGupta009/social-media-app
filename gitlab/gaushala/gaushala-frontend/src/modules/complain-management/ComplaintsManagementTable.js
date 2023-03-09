import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useTranslation } from "react-i18next";
import CustomDialog from "../../components/common/Dialogue/";
import { ReactComponent as HandoverSvg } from "../../assets/images/handover.svg";
import { ReactComponent as TrashIcon } from "../../assets/images/trash.svg";
import { ReactComponent as ImageIcon } from "../../assets/images/image.svg";
import { useState } from "react";
import HandoverDialogueBox from "./HandoverDialogueBox";
import DeleteModal from "../../components/common/delete-modal/DeleteModal";
import { formatDate, truncateDescription } from "../../utils/commonFunctions";

export default function ComplaintsManagementTable({
  rows,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
  count,
  message,
  isDelete,
  setIsDelete,
  handleDelete,
}) {
  // const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [isFullImage, setIsFullImage] = useState(false);
  const [reasonBox, setReasonBox] = useState(false);
  const { t, i18n } = useTranslation();

  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    { id: "cowshedName", label: `${t("table.gaushala")}`, minWidth: 100 },
    { id: "complaintBy", label: `${t("table.c_name")}` },
    {
      id: "createdAt",
      label: `${t("table.date")}`,
      minWidth: 170,
      align: "left",
    },
    { id: "mobileNo", label: `${t("table.mob_no")}` },
    {
      id: "address",
      label: `${t("table.address")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "types_of_complain",
      label: `${t("table.types_of_complain")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "description",
      label: `${t("table.descriptipn")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "media",
      label: `${t("table.view_photo_video")}`,
      minWidth: 100,
      align: "left",
    },
    {
      id: "status",
      label: `${t("table.status")}`,
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
  const handleReasonBox = (id) => {
    setReasonBox({
      opens: true,
      rowId: id,
    });
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
                              {row?.status === 2 ? (
                                <TrashIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    setIsDelete({ isopen: true, id: row._id })
                                  }
                                />
                              ) : (
                                <HandoverSvg
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleReasonBox(row._id)}
                                />
                              )}
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
                          ) : column.id === "media" ? (
                            <TableCell key={column.id} align={column.align}>
                              <ImageIcon
                                onClick={() => setIsFullImage(row.media)}
                                style={{ cursor: "pointer" }}
                              />
                            </TableCell>
                          ) : column.id === "createdAt" ? (
                            <TableCell key={column.id} align={column.align}>
                              {formatDate(value) ?? "NA"}
                            </TableCell>
                          ) : column.id === "status" ? (
                            <TableCell key={column.id} align={column.align}>
                              {value === 0
                                ? `${t("dropdown.complain_pending")}`
                                : value === 1
                                ? `${t("dropdown.complain_inprocess")}`
                                : `${t("dropdown.complain_complete")}`}
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
        header={t("table.descriptipn")}
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
      <HandoverDialogueBox
        isOpen={reasonBox}
        header={t("modal_title.complain")}
        labelClass="input_label"
        mainClass="large_dailogue_box"
        header_style="custom_header"
        complaintID={reasonBox?.rowId}
        handleClose={() => setReasonBox(false)}
      />
      <DeleteModal
        isOpen={isDelete}
        handleConfirm={() => handleDelete(isDelete)}
        handleClose={() => setIsDelete(false)}
        title={t("table.descriptipn")}
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
