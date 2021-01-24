import React, { FC } from "react";
import "./style.scss";
import img from "../../assets/images/buckwheat.png";

export const Wallpaper: FC = () => {
    return (
        <div className="Wallpaper">
            <div>
                <p className="crossed"> 2019 </p>
                <p className="crossed"> 2020 </p>
                <p>2021</p>
            </div>
            <p>
                Немає виборів -<br /> немає безкоштовної
                <br /> гречки...
            </p>
        </div>
    );
};
