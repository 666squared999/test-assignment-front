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
import { getBuckWeat } from "../../api/requests";
import TablePaginationActions from "../../utils/TablePaginationActions";

interface IDataUnit {
    id: string;
    title: string;
    weight: number;
    price_per_kg: number;
    page_url: string;
    photo_url: string;
    shopName: string;
}

enum ShopNames {
    rozetka = 1,
    fozzyshop = 2,
    novus = 3,
    auchan = 4,
}

export const TableWrapper: FC = observer(() => {
    const [rows, setRows] = useState<IDataUnit[]>([]);
    const [loading, setLoading] = useState<boolean>();

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

    const handleFetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getBuckWeat();
            const data = await response.json();
            console.log(data);
            const preparedData: IDataUnit[] = [];
            for (let i = 0; i < data.length; i++) {
                const shopData = data[i];
                const shopName = ShopNames[i + 1];
                for (let j = 0; j < shopData[shopName].length; j++) {
                    const productData = shopData[shopName][j];
                    preparedData.push({
                        id: `${i}${j}`,
                        shopName,
                        ...productData,
                    });
                }
            }
            console.log(preparedData);

            setRows(preparedData);
            setLoading(false);
        } catch (e) {
            console.log("Error fetching data", e);
        }
    }, []);

    useEffect(() => {
        handleFetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
