import { InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { FC, useState } from "react";
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
            </div>
            <div className="content">
                <div>
                    <p>Вся гречка</p>
                    <div className="inputsContainer"></div>
                </div>
            </div>
        </div>
    );
};
