import React, { FC } from "react";
import { observer } from "mobx-react";
import "./style.scss";

export const Table: FC = observer(() => {
    return (
        <div className="Table">
            <table>
                <thead>
                    <tr>
                        <td>1</td>
                    </tr>
                </thead>
            </table>
        </div>
    );
});
