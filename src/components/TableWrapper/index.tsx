import React, { FC, useCallback, useState } from "react";
import { observer } from "mobx-react";
import "./style.scss";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    TableFooter,
    TablePagination,
    CircularProgress,
    Avatar,
    IconButton,
    Link,
} from "@material-ui/core";
import TablePaginationActions from "../../utils/TablePaginationActions";
import { IDataUnit } from "../Info";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { Launch } from "@material-ui/icons";

type Props = {
    loading?: boolean;
    sortRequest: (sortBy: "title" | "weight" | "price_per_kg") => void;
    rows: IDataUnit[];
    sortBy: "title" | "weight" | "price_per_kg";
    sortOrder: "asc" | "desc";
};

export const TableWrapper: FC<Props> = observer(
    ({ rows, loading, sortRequest, sortBy, sortOrder }) => {
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(10);

        const handleChangePage = (
            event: React.MouseEvent<HTMLButtonElement> | null,
            newPage: number,
        ) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        return (
            <div className="Table">
                {loading ? (
                    <CircularProgress color="secondary" />
                ) : (
                    <TableContainer component={Paper}>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortBy === "title"}
                                            direction={sortOrder}
                                            onClick={() =>
                                                sortRequest("title")
                                            }>
                                            Найменування товару
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortBy === "price_per_kg"}
                                            direction={sortOrder}
                                            onClick={() =>
                                                sortRequest("price_per_kg")
                                            }>
                                            Ціна за 1 кг, грн
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortBy === "weight"}
                                            direction={sortOrder}
                                            onClick={() =>
                                                sortRequest("weight")
                                            }>
                                            Вага, кг
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>Магазин</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? rows.slice(
                                          page * rowsPerPage,
                                          page * rowsPerPage + rowsPerPage,
                                      )
                                    : rows
                                ).map((row: IDataUnit) => (
                                    <TableRow key={row.title}>
                                        <TableCell>
                                            <Avatar
                                                alt="Product"
                                                src={row.photo_url}>
                                                G
                                            </Avatar>
                                        </TableCell>
                                        <TableCell component="th">
                                            {row.title}{" "}
                                            <Link href={row.page_url}>
                                                <Launch
                                                    fontSize="small"
                                                    color="secondary"
                                                    className="linkIcon"
                                                />
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {Math.round(
                                                (row.price_per_kg +
                                                    Number.EPSILON) *
                                                    100,
                                            ) / 100}
                                        </TableCell>
                                        <TableCell>
                                            {Math.round(
                                                (row.weight + Number.EPSILON) *
                                                    100,
                                            ) / 100}
                                        </TableCell>
                                        <TableCell>
                                            {capitalizeFirstLetter(
                                                row.shopName,
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        labelRowsPerPage="Рядків на сторінку"
                                        labelDisplayedRows={({
                                            from,
                                            to,
                                            count,
                                        }) => {
                                            return (
                                                "" +
                                                from +
                                                "-" +
                                                to +
                                                " з " +
                                                count
                                            );
                                        }}
                                        rowsPerPageOptions={[
                                            10,
                                            25,
                                            50,
                                            { label: "Усі", value: -1 },
                                        ]}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                "aria-label": "rows per page",
                                            },
                                            native: true,
                                        }}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={
                                            handleChangeRowsPerPage
                                        }
                                        ActionsComponent={
                                            TablePaginationActions
                                        }
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                )}
            </div>
        );
    },
);
