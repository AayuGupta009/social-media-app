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
// import { ReactComponent as ImageIcon } from "../../assets/images/image.svg";
import { ReactComponent as TrashIcon } from "../../assets/images/trash.svg";
import DropdownItem from "../../components/common/menu-item";
import { useTranslation } from "react-i18next";
import CustomDialog from "../../components/common/Dialogue";
import { ReactComponent as SlashIcon } from "../../assets/images/slash.svg";
import { ReactComponent as EyeIcon } from "../../assets/images/eye.svg";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/common/delete-modal/DeleteModal";
import { useState } from "react";
import BlockModal from "../../components/common/block-modal/BlockModal";
import { formatDate } from "../../utils/commonFunctions";

export default function UserManagementTable({
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
  isBlock,
  setIsBlock,
  handleBlock,
}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    { id: "name", label: `${t("table.user_name")}`, minWidth: 100 },
    {
      id: "mobileNo",
      label: `${t("table.m_no")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "createdAt",
      label: `${t("table.dor")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "email",
      label: `${t("table.email")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "address",
      label: `${t("table.address")}`,
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
              rows?.slice(0, rows?.length).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
                                      `/user-management/user-details/${row?._id}`,
                                      { state: row }
                                    )
                                  }
                                />
                                <TrashIcon
                                  onClick={() =>
                                    setIsDelete({
                                      isopen: true,
                                      id: row._id,
                                      val: row.name,
                                    })
                                  }
                                />
                              </div>
                            </TableCell>
                          ) : column.id === "createdAt" ? (
                            <TableCell key={column.id} align={column.align}>
                              {formatDate(value) ?? "NA"}
                            </TableCell>
                          ) : column.id === "s_no" ? (
                            <TableCell key={column.id} align={column.align}>
                              {page === 0 ? index + 1 : page * 10 + (index + 1)}
                            </TableCell>
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
        title={isDelete?.val}
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
