import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ReactComponent as TrashIcon } from "../../assets/images/trash.svg";
import { ReactComponent as SlashIcon } from "../../assets/images/slash.svg";
import { ReactComponent as EyeIcon } from "../../assets/images/eye.svg";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/common/delete-modal/DeleteModal";
import { useState } from "react";
import { formatDate } from "../../utils/commonFunctions";
import BlockModal from "../../components/common/block-modal/BlockModal";

export default function NgoRegisterTable({
  rows,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
  count,
  message,
  isBlock,
  setIsBlock,
  handleBlock,
  handleDelete,
  isDelete,
  setIsDelete,
}) {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    { id: "name", label: `${t("table.ngo_name")}` },
    {
      id: "createdAt",
      label: `${t("table.date")}`,
      align: "left",
    },
    {
      id: "address",
      label: `${t("table.address")}`,
      align: "left",
    },
    {
      id: "registrationNo",
      label: `${t("table.reg_no")}`,
      align: "left",
    },
    {
      id: "email",
      label: `${t("table.email")}`,
      align: "left",
    },
    {
      id: "mobileNo",
      label: `${t("table.mob_no")}`,
      align: "left",
    },
    {
      id: "action",
      label: `${t("table.action")}`,
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
              rows?.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.id === "action" ? (
                            <TableCell key={column.id} align={column.align}>
                              <div className="action-icon">
                                <SlashIcon
                                  onClick={() =>
                                    setIsBlock({
                                      isopen: true,
                                      id: row._id,
                                      title: row.name,
                                      status: row.status,
                                    })
                                  }
                                  className={
                                    row?.status === 0 ? "blockUnblock" : ""
                                  }
                                />
                                <EyeIcon
                                  onClick={() =>
                                    navigate(
                                      `/ngo-management/registered-ngo-form/${row?._id}`
                                    )
                                  }
                                />
                                <TrashIcon
                                  onClick={() =>
                                    setIsDelete({
                                      isopen: true,
                                      id: row._id,
                                    })
                                  }
                                />
                              </div>
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

      <DeleteModal
        isOpen={isDelete}
        handleConfirm={() => handleDelete(isDelete)}
        handleClose={() => setIsDelete(false)}
      />
      <BlockModal
        isOpen={isBlock}
        handleConfirm={() => handleBlock(isBlock)}
        handleClose={() => setIsBlock(false)}
        title={isBlock?.title}
        isBlock={isBlock}
      />
    </>
  );
}
