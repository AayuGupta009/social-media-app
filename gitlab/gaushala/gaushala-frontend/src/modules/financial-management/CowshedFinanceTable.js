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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tooltip } from "@mui/material";
import { truncateTitle } from "../../utils/commonFunctions";

export default function CowshedFinanceTable({
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
  const navigate = useNavigate();

  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    { id: "cowshedName", label: `${t("table.gaushala")}` },
    {
      id: "address",
      label: `${t("table.address")}`,
      align: "left",
    },
    {
      id: "totalDonation",
      label: `${t("table.rec_donation")}`,
      align: "left",
    },
    {
      id: "adoptionAmount",
      label: `${t("table.received_adop_amount")}`,
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
            {rows && rows.length > 0 ? (
              rows?.slice(0, rows.length).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.id === "cowshedName" ? (
                            <Tooltip title={row?.cowshedName}>
                              <TableCell
                                key={column.id}
                                align={column.align}
                                onClick={() =>
                                  navigate(
                                    `/financial-management/donation-details/${row._id}`
                                  )
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {truncateTitle(value) ?? "NA"}
                              </TableCell>
                            </Tooltip>
                          ) : column.id === "address" ? (
                            <TableCell key={column.id} align={column.align}>
                              {value?.address ?? "NA"},{value?.city ?? "NA"},
                              {value?.district ?? "NA"},{value?.pincode ?? "NA"}
                              ,{value?.state ?? "NA"},
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
    </>
  );
}
