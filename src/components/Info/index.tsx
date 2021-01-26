import { InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { FC, useState } from "react";
import { Filters } from "../Filters";
import "./style.scss";

export const Info: FC = () => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchValueChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSearchValue(event.currentTarget.value);
    };

    return (
        <div className="Info">
            <div className="header">
                <p>Гречка для народу</p>
                <TextField
                    className="searchBar"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleSearchValueChange}
                    value={searchValue}
                    label="Search"
                    variant="outlined"
                />
            </div>

            <Filters />
        </div>
    );
};
