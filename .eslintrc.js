module.exports = {
    root: true,
    extends: [
        "plugin:prettier/recommended",
        "prettier/react",
        "prettier",
        "prettier/@typescript-eslint",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["react", "@typescript-eslint", "react-hooks"],
    rules: {
        "react-hooks/rules-of-hooks": "warn",
        "react-hooks/exhaustive-deps": "error",
        "react/jsx-boolean-value": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "react/prop-types": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "react/self-closing-comp": "warn",
        "react/jsx-no-bind": "off",
    },
};
