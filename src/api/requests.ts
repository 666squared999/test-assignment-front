type dataUnit = {};

export const getBuckWeat = (): Promise<Response> => {
    return fetch("https://api-grechka.ml/buckwheat?allres=True", {
        mode: "cors",
    });
};
