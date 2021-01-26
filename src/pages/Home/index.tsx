import React, { FC } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Info } from "../../components/Info";
import { Wallpaper } from "../../components/Wallpaper";
import "./style.scss";

export const Home: FC = () => (
    <div className="Home">
        <Header />
        <Wallpaper />
        <Info />
        <Footer />
    </div>
);
