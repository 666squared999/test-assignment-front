import { ButtonProps } from "@material-ui/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Filters } from "../Filters";
import { SearchBar } from "../SearchBar";
import "./style.scss";
import { getBuckWeat } from "../../api/requests";
import { TableWrapper } from "../TableWrapper";

export interface IDataUnit {
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

export const Info: FC = () => {
    const [rows, setRows] = useState<IDataUnit[]>([]);
    const [loading, setLoading] = useState<boolean>();

    const [priceBottom, setPriceBottom] = useState<number>();
    const [priceTop, setPriceTop] = useState<number>();
    const [weightBottom, setWeightBottom] = useState<number>();
    const [weightTop, setWeightTop] = useState<number>();

    const [filteredRows, setFilteredRows] = useState<IDataUnit[]>([]);

    const [searchValue, setSearchValue] = useState("");

    const resetData = useCallback(() => {
        setFilteredRows(rows);
        setSearchValue("");
    }, [rows]);

    const applyFilters = useCallback(() => {
        if (!priceBottom && !priceTop && !weightBottom && !weightTop) {
            resetData();
            return;
        }

        const filtered = filteredRows.filter((data) => {
            const priceCondition = priceBottom
                ? priceTop
                    ? data.price_per_kg >= priceBottom &&
                      data.price_per_kg <= priceTop
                    : data.price_per_kg >= priceBottom
                : priceTop
                ? data.price_per_kg <= priceTop
                : true;

            const weightCondition = weightBottom
                ? weightTop
                    ? data.weight >= weightBottom && data.weight <= weightTop
                    : data.weight >= weightBottom
                : weightTop
                ? data.weight <= weightTop
                : true;

            return priceCondition && weightCondition;
        });

        setFilteredRows(filtered);
    }, [
        filteredRows,
        priceBottom,
        priceTop,
        resetData,
        weightBottom,
        weightTop,
    ]);

    const applySearch = useCallback(() => {
        setFilteredRows(rows);

        if (!searchValue) {
            return;
        }

        const filtered = filteredRows.filter((data) => {
            const title = data.title.toLowerCase();

            return title.includes(searchValue.toLowerCase());
        });
        setFilteredRows(filtered);
    }, [filteredRows, rows, searchValue]);

    const handleFetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getBuckWeat();
            const data = await response.json();
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
            setFilteredRows(preparedData);
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
        <div className="Info">
            <div className="header">
                <p>Гречка для народу</p>
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onClick={applySearch}
                />
            </div>

            <Filters
                priceBottom={priceBottom}
                priceTop={priceTop}
                weightBottom={weightBottom}
                weightTop={weightTop}
                setPriceBottom={setPriceBottom}
                setPriceTop={setPriceTop}
                setWeightBottom={setWeightBottom}
                setWeightTop={setWeightTop}
                onSubmit={applyFilters}
                onCancel={resetData}
            />

            <TableWrapper rows={filteredRows} loading={loading} />
        </div>
    );
};
