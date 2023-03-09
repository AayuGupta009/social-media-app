import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ReactComponent as EyeIcon } from "../../../../../assets/images/eye.svg";
import { useTranslation } from "react-i18next";
import CustomDialog from "../../../../../components/common/Dialogue";
import { useNavigate, useParams } from "react-router-dom";
import ModalAdopReq from "../user-adoption-request/ModalAdopReq";
import { useState } from "react";
import { useEffect } from "react";
import { userAdopDataViewAction } from "../../../../../redux/action/user-management/user-details/userDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../../../utils/commonFunctions";

export default function UserAdoptionReqTable({
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
  const dispatch = useDispatch();
  const params = useParams();
  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    { id: "cowshedName", label: `${t("table.gaushala")}` },
    {
      id: "createdAt",
      label: `${t("table.date")}`,
      align: "left",
    },
    {
      id: "cowbreed",
      label: `${t("table.breed")}`,
      align: "left",
    },
    {
      id: "requestStatus",
      label: `${t("table.status")}`,
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
    setOpen(true);
    dispatch(userAdopDataViewAction(appnId, params?.id));
  };

  const applicationData = useSelector(
    (store) => store.userAdopReqViewReducer?.userAdopData
  );

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
                                <EyeIcon onClick={() => handleOpen(row?._id)} />
                              </div>
                            </TableCell>
                          ) : column.id === "cowbreed" ? (
                            <TableCell key={column.id} align={column.align}>
                              {value ?? "NA"}
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
        count={count ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={`${t("pagination_label.show")}`}
      />
      <CustomDialog
        header={t("modal_title.adoption_req")}
        header_style="custom_header"
        bodyChild={<ModalAdopReq datas={applicationData?.result} />}
        isOpen={open}
        isButton={true}
        yes={`${t("modal_title.ok")}`}
        isText={false}
        placeholder={`${t("modal_title.reason")}`}
        fullWidth={true}
        display="none"
        button_show={true}
        handleConfirm={() => setOpen(false)}
        labelClass="input_label"
        mainClass="large_dailogue_box"
        singlebtn_class="singlebtn_class"
        rows="4"
      />
    </>
  );
}
