import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { FC, useEffect } from "react";
import "./style.scss";

type Props = {
    searchValue: string;
    setSearchValue: (value: string) => void;
    onClick: () => void;
};

export const SearchBar: FC<Props> = ({
    searchValue,
    setSearchValue,
    onClick,
}) => {
    const handleSearchValueChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSearchValue(event.currentTarget.value);
    };

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                onClick();
            }
        };

        document.addEventListener("keydown", listener);

        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [onClick]);

    return (
        <TextField
            color="primary"
            className="searchBar"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={onClick}>
                            <Search color="secondary" />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            onChange={handleSearchValueChange}
            value={searchValue}
            label="Search"
            variant="outlined"
        />
    );
};
