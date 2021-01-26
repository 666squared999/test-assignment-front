import React, { FC, useCallback, useEffect, useState } from "react";
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
} from "@material-ui/core";
import TablePaginationActions from "../../utils/TablePaginationActions";
import { IDataUnit } from "../Info";

type Props = {
    loading?: boolean;
    rows: IDataUnit[];
};

export const TableWrapper: FC<Props> = observer(({ rows, loading }) => {
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
                                <TableCell sortDirection="desc">
                                    Найменування товару
                                </TableCell>
                                <TableCell>Ціна за 1 кг, грн</TableCell>
                                <TableCell>Вага, кг</TableCell>
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
                                    <TableCell component="th">
                                        {row.title}
                                    </TableCell>
                                    <TableCell>{row.price_per_kg}</TableCell>
                                    <TableCell>{row.weight}</TableCell>
                                    <TableCell>{row.shopName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[
                                        10,
                                        25,
                                        50,
                                        { label: "All", value: -1 },
                                    ]}
                                    colSpan={3}
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
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
});
