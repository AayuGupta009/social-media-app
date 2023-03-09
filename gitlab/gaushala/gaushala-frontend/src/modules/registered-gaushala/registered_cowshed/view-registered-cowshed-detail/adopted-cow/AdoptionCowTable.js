import * as React from "react";
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
import ModalContent from "./ModalContent";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewAdoptedCowDetail } from "../../../../../redux/action/gaushala-management/getGaushalaManagementData";
import { formatDate } from "../../../../../utils/commonFunctions";

export default function AdoptionCowTable({
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

  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    { id: "barcodeNo", label: `${t("table.bar_code")}`, minWidth: 100 },
    {
      id: "createdAt",
      label: `${t("table.date_no")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "cowBreed",
      label: `${t("table.breed")}`,
      minWidth: 170,
      align: "left",
    },

    {
      id: "birthYear",
      label: `${t("table.dob")}`,
      minWidth: 170,
      align: "left",
    },

    {
      id: "healthStatus",
      label: `${t("table.health_con")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "action",
      label: `${t("table.action")}`,
      minWidth: 170,
      align: "left",
    },
  ];
  useEffect(() => {
    if (open) {
      dispatch(ViewAdoptedCowDetail(open?.id));
    }
  }, [dispatch, open?.id, open]);

  const { result } = useSelector(
    (store) => store.viewAdoptedCowDetailData.viewData
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
                                <EyeIcon
                                  onClick={() =>
                                    setOpen({ open: true, id: row._id })
                                  }
                                />
                              </div>
                            </TableCell>
                          ) : column.id === "health_report" ? (
                            <TableCell key={column.id} align={column.align}>
                              <div className="action-icon">
                                <EyeIcon />
                              </div>
                            </TableCell>
                          ) : column.id === "s_no" ? (
                            <TableCell key={column.id} align={column.align}>
                              {page === 0 ? index + 1 : page * 10 + (index + 1)}
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
        header={`${t("tab.adopted_cow")}`}
        bodyChild={<ModalContent datas={result} />}
        header_style="custom_header"
        isOpen={open}
        isButton={true}
        yes={`${t("modal_title.ok")}`}
        placeholder={`${t("modal_title.reason")}`}
        fullWidth={true}
        display="none"
        button_show={true}
        handleConfirm={() => setOpen(false)}
        labelClass="input_label"
        mainClass="large_dailogue_box"
        singlebtn_class="singlebtn_class"
      />
    </>
  );
}
