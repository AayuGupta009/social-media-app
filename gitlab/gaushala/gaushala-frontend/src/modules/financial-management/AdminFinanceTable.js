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
import { useState } from "react";
import { formatDate } from "../../utils/commonFunctions";

export default function AdminFinanceTable({
  rows,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
  count,
  message,
}) {
  const [opens, setOpens] = useState(false);
  const { t, i18n } = useTranslation();

  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    { id: "name", label: `${t("table.name")}` },
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
      id: "mobileNo",
      label: `${t("table.m_no")}`,
      align: "left",
    },
    {
      id: "addresss",
      label: `${t("table.address")}`,
      align: "left",
    },
    {
      id: "amount",
      label: `${t("table.amount")}`,
      align: "left",
    },
  ];

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
              rows.slice(0, rows.length).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.id === "createdAt" ? (
                            <TableCell key={column.id} align={column.align}>
                              {formatDate(value?.slice(0, 10)) ?? "NA"}
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
