import React, { FC } from "react";
import { observer } from "mobx-react";
import { Header } from "../../components/Header";
import "./style.scss";
import { Wallpaper } from "../../components/Wallpaper";
import { Info } from "../../components/Info";
import { TableWrapper } from "../../components/TableWrapper";

export const Home: FC = observer(() => {
    return (
        <div className="Home">
            <Header />
            <Wallpaper />
            <Info />
            <TableWrapper />
        </div>
    );
});
