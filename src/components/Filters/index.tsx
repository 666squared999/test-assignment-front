import {
    Button,
    ButtonProps,
    TextField,
    TextFieldProps,
} from "@material-ui/core";
import React, { FC, useCallback, useState } from "react";
import "./style.scss";

type InputProps = Pick<
    TextFieldProps,
    "value" | "onChange" | "error" | "helperText" | "placeholder"
>;

const InputComponent: FC<InputProps> = ({
    value,
    onChange,
    error,
    helperText,
    placeholder,
}) => (
    <TextField
        className="input"
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        variant="outlined"
        size="small"
        InputProps={{
            inputProps: { min: 0, max: 1000 },
        }}
    />
);

type FiltersProps = {
    priceBottom: number | undefined;
    priceTop: number | undefined;
    weightBottom: number | undefined;
    weightTop: number | undefined;

    setPriceBottom: (value: number) => void;
    setPriceTop: (value: number) => void;
    setWeightBottom: (value: number) => void;
    setWeightTop: (value: number) => void;

    onClick: NonNullable<ButtonProps["onClick"]>;
};

export const Filters: FC<FiltersProps> = ({
    priceBottom,
    priceTop,
    weightBottom,
    weightTop,
    setPriceBottom,
    setPriceTop,
    setWeightBottom,
    setWeightTop,
    onClick,
}) => {
    const [priceBottomError, setPriceBottomError] = useState(false);
    const [priceBottomText, setPriceBottomText] = useState("");

    const [priceTopError, setPriceTopError] = useState(false);
    const [priceTopText, setPriceTopText] = useState("");

    const [weightBottomError, setWeightBottomError] = useState(false);
    const [weightBottomText, setWeightBottomText] = useState("");

    const [weightTopError, setWeightTopError] = useState(false);
    const [weightTopText, setWeightTopText] = useState("");

    const setBottomError = useCallback<
        (type: "weight" | "price", errorText: string) => void
    >((type, errorText) => {
        const isWeight = type === "weight";
        isWeight ? setWeightBottomError(true) : setPriceBottomError(true);
        isWeight
            ? setWeightBottomText(errorText)
            : setPriceBottomText(errorText);
    }, []);

    const setTopError = useCallback<
        (type: "weight" | "price", errorText: string) => void
    >((type, errorText) => {
        const isWeight = type === "weight";
        isWeight ? setWeightTopError(true) : setPriceTopError(true);
        isWeight ? setWeightTopText(errorText) : setPriceTopText(errorText);
    }, []);

    const handleBottomChange = (type: "weight" | "price") => ({
        currentTarget,
    }: React.ChangeEvent<HTMLInputElement>) => {
        const value =
            Number(currentTarget.value) !== NaN
                ? Number(currentTarget.value)
                : 0;

        const isWeight = type === "weight";
        isWeight ? setWeightBottom(value) : setPriceBottom(value);

        if (isWeight && weightBottomError) {
            setWeightBottomError(false);
            setWeightBottomText("");
        }
        if (!isWeight && priceBottomError) {
            setPriceBottomError(false);
            setPriceBottomText("");
        }

        if (
            (!isWeight && value && priceTop && value > priceTop) ||
            (isWeight && value && weightTop && value > weightTop)
        ) {
            setBottomError(
                type,
                "Значення повинне бути менше, ніж верхній поріг",
            );
        }
        if (value > 1000) {
            setBottomError(type, "Значення повинне бути менше, ніж 1000");
        }
        if (value < 0) {
            setBottomError(type, "Значення повинне бути більше 0");
        }
    };

    const handleTopChange = (type: "weight" | "price") => ({
        currentTarget,
    }: React.ChangeEvent<HTMLInputElement>) => {
        const value =
            Number(currentTarget.value) !== NaN
                ? Number(currentTarget.value)
                : 0;

        const isWeight = type === "weight";
        isWeight ? setWeightTop(value) : setPriceTop(value);

        if (isWeight && weightTopError) {
            setWeightTopError(false);
            setWeightTopText("");
        }
        if (!isWeight && priceTopError) {
            setPriceTopError(false);
            setPriceTopText("");
        }

        if (
            (!isWeight && value && priceBottom && value < priceBottom) ||
            (isWeight && value && weightBottom && value < weightBottom)
        ) {
            setTopError(type, "Значення повинне бути менше, ніж верхній поріг");
        }
        if (value > 1000) {
            setTopError(type, "Значення повинне бути менше, ніж 1000");
        }
        if (value < 0) {
            setTopError(type, "Значення повинне бути більше 0");
        }
    };

    return (
        <div className="Filters">
            <div className="filterWrapper">
                <div className="container">
                    <div className="titleWrapper">
                        <p className="title">Ціна за 1 кг, грн</p>
                    </div>

                    <div className="range">
                        <InputComponent
                            value={priceBottom}
                            onChange={handleBottomChange("price")}
                            placeholder="0"
                            error={priceBottomError}
                            helperText={priceBottomText}
                        />

                        <p className="dash">&mdash;</p>

                        <InputComponent
                            value={priceTop}
                            onChange={handleTopChange("price")}
                            placeholder="1000"
                            error={priceTopError}
                            helperText={priceTopText}
                        />
                    </div>
                </div>

                <div className="container weight">
                    <div className="titleWrapper">
                        <p className="title">Вага, кг</p>
                    </div>
                    <div className="range">
                        <InputComponent
                            value={weightBottom}
                            onChange={handleBottomChange("weight")}
                            placeholder="0"
                            error={weightBottomError}
                            helperText={weightBottomText}
                        />

                        <p className="dash">&mdash;</p>

                        <InputComponent
                            value={weightTop}
                            onChange={handleTopChange("weight")}
                            placeholder="1000"
                            error={weightTopError}
                            helperText={weightTopText}
                        />
                    </div>
                </div>
            </div>

            <div className="buttonWrapper">
                <Button
                    className="button"
                    component="span"
                    variant="contained"
                    color="secondary"
                    onClick={onClick}>
                    Застосувати
                </Button>
            </div>
        </div>
    );
};
