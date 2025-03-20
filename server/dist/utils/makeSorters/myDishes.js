export const makeSortersMyDishes = (req) => {
    var _a;
    const sorters = Object.entries((_a = req.query) !== null && _a !== void 0 ? _a : {})
        .filter(([key, _]) => key.includes("Sort"))
        .map(([key, val]) => ({
        key: key.replace("Sort", ""),
        val,
    }));
    if (!(sorters === null || sorters === void 0 ? void 0 : sorters.length))
        return null;
    const sorter = {};
    for (const sort of sorters) {
        sorter[`dishes.${sort.key}`] = sort.val === "asc" ? 1 : -1;
    }
    return Object.keys(sorter !== null && sorter !== void 0 ? sorter : {}).length ? sorter : null;
};
