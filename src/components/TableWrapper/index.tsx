import React, { FC, useEffect, useState } from "react";
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
} from "@material-ui/core";
import { getBuckWeat } from "../../api/requests";

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
    useEffect(() => {
        handleFetchData();
    }, []);

    const handleFetchData = async () => {
        try {
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
        } catch (e) {
            console.log("Error fetching data", e);
        }
    };
    return (
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
                    {rows.map((row: IDataUnit) => (
                        <TableRow key={row.title}>
                            <TableCell component="th">{row.title}</TableCell>
                            <TableCell>{row.price_per_kg}</TableCell>
                            <TableCell>{row.weight}</TableCell>
                            <TableCell>{row.shopName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});
