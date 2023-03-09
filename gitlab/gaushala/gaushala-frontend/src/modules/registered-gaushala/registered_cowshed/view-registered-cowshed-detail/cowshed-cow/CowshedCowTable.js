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
import { formatDate } from "../../../../../utils/commonFunctions";

export default function CowshedCowTable({
  rows,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
  count,
  message,
}) {
  const { t, i18n } = useTranslation();
  console.log(i18n.language, "lng");
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
      id: "document",
      label: `${t("table.health_report")}`,
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
  ];

  const handleDownload = () => {
    const pdfUrl =
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    window.open(pdfUrl, "_blank");
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
            {rows && rows.length > 0 ? (
              rows?.slice(0, rows.length).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.id === "health_report" ? (
                            <TableCell key={column.id} align={column.align}>
                              <div className="action-icon">
                                <EyeIcon />
                              </div>
                            </TableCell>
                          ) : column.id === "cowBreed" ? (
                            <TableCell key={column.id} align={column.align}>
                              {i18n.language === "hi"
                                ? value?.name.hi
                                : value?.name.en ?? "NA"}
                            </TableCell>
                          ) : column.id === "document" ? (
                            <TableCell key={column.id} align={column.align}>
                              <EyeIcon
                                style={{ cursor: "pointer" }}
                                onClick={handleDownload}
                              />
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
    </>
  );
}
