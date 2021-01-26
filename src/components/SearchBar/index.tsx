import { InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { FC, useState } from "react";
import "./style.scss";

export const SearchBar: FC = () => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchValueChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSearchValue(event.currentTarget.value);
    };

    return (
        <TextField
            color="primary"
            className="searchBar"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Search color="secondary" />
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
