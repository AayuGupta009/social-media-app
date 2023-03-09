import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ReactComponent as EditIcon } from "../../../assets/images/edit-2.svg";
import { ReactComponent as TrashIcon } from "../../../assets/images/trash.svg";
import { ReactComponent as SlashIcon } from "../../../assets/images/slash.svg";
import { ReactComponent as EyeIcon } from "../../../assets/images/eye.svg";
import DropdownItem from "../../../components/common/menu-item";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/common/delete-modal/DeleteModal";
import { useState } from "react";
import BlockModal from "../../../components/common/block-modal/BlockModal";
import { formatDate } from "../../../utils/commonFunctions";

export default function RegisteredCowshedTable({
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
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { t, i18n } = useTranslation();
  const opens = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const columns = [
    { id: "_id", label: `${t("table.s_no")}` },
    { id: "cowshedName", label: `${t("table.gaushala")}`, minWidth: 100 },
    {
      id: "createdAt",
      label: `${t("table.date")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "address",
      label: `${t("table.address")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "registrationNo",
      label: `${t("reg_appn_form.reg_no")}`,
      minWidth: 170,
      align: "left",
    },
    {
      id: "totalCow",
      label: `${t("table.reg_cow_no")}`,
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

  const options = [
    {
      icon: <EditIcon />,
      value: `${t("action.edit")}`,
    },
    {
      icon: <TrashIcon />,
      value: `${t("action.delete")}`,
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
              rows?.slice(0, rows.length).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      // console.log(row.value, "valuevalue");
                      return (
                        <>
                          {column.id === "action" ? (
                            <TableCell key={column.id} align={column.align}>
                              <div className="action-icon">
                                <SlashIcon
                                  onClick={() =>
                                    setIsBlock({
                                      isopen: true,
                                      id: row.userId,
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
                                      `/registered-gaushala-management/reg-cowshed-info-detail/${row.userId}`,
                                      { state: row }
                                    )
                                  }
                                />
                                <TrashIcon
                                  onClick={() =>
                                    setIsDelete({
                                      isopen: true,
                                      id: row._id,
                                      title: row.cowshedName,
                                    })
                                  }
                                />
                              </div>
                            </TableCell>
                          ) : column.id === "createdAt" ? (
                            <TableCell key={column.id} align={column.align}>
                              {formatDate(value) ?? "NA"}
                            </TableCell>
                          ) : column.id === "address" ? (
                            <TableCell key={column.id} align={column.align}>
                              {value?.city ?? "NA"}
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
      <DropdownItem
        options={options}
        open={opens}
        handleClose={handleClose}
        anchorEl={anchorEl}
      />
      <DeleteModal
        isOpen={isDelete}
        handleConfirm={() => handleDelete(isDelete)}
        handleClose={() => setIsDelete(false)}
        title={isDelete.title}
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
