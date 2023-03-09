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
import VenModalContent from "./VenModalContent";
import CustomDialog from "../../../components/common/Dialogue";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { viewVenApplicantsDataAction } from "../../../redux/action/vendor-management/vendorActions.js";
import DeleteModal from "../../../components/common/delete-modal/DeleteModal";
import { formatDate } from "../../../utils/commonFunctions";

export default function ViewVenApplicantsListTable({
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
  const [opens, setOpens] = useState("");
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();

  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    {
      id: "name",
      label: `${t("table.name")}`,
      minWidth: 170,
      align: "left",
    },
    { id: "gstNumber", label: `${t("reg_appn_form.gst")}`, minWidth: 100 },
    {
      id: "companyName",
      label: `${t("modal_content.company_name")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "user",
      label: `${t("table.mob_no")}`,
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

  const handleOpen = (appnId) => {
    setOpens(true);
    dispatch(viewVenApplicantsDataAction(params?.id, appnId));
  };

  const applicationData = useSelector(
    (store) => store.viewVenApplicantsDataReducer?.viewData
  );
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
                                  <EyeIcon
                                    onClick={() => handleOpen(row?._id)}
                                  />
                                  <TrashIcon
                                    onClick={() =>
                                      setIsDelete({ isopen: true, id: row._id })
                                    }
                                  />
                                </div>
                              </div>
                            </TableCell>
                          ) : column.id === "user" ? (
                            <TableCell key={column.id} align={column.align}>
                              {value?.mobileNo ?? "NA"}
                            </TableCell>
                          ) : column.id === "dateOfBirth" ? (
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
        header={t("modal_title.vendor")}
        header_style="custom_header"
        bodyChild={<VenModalContent datas={applicationData?.result} />}
        isOpen={opens}
        isButton={true}
        yes={`${t("modal_title.ok")}`}
        fullWidth={true}
        display="none"
        button_show={true}
        handleConfirm={() => setOpens(false)}
        labelClass="input_label"
        mainClass="large_dailogue_box"
        singlebtn_class="singlebtn_class"
      />
      <DeleteModal
        isOpen={isDelete}
        handleConfirm={() => handleDelete(isDelete)}
        handleClose={() => setIsDelete(false)}
        title={t("delete_modal_title.vol_need")}
      />
    </Paper>
  );
}
