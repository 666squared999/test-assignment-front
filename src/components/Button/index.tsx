import React, { FC } from "react";
import { observer } from "mobx-react";
import "./style.scss";

export const Button: FC = observer(() => {
    return <button className="Button">Hiiii</button>;
});
