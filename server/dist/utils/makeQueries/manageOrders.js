export const filterManageOrders = (req, orders) => {
    const { userId } = req;
    const { search, searchVals, ordersStatus, categories, minPrice, maxPrice, minQuantity, maxQuantity, } = req.query;
    const filtered = orders.filter((el) => {
        var _a, _b, _c, _d;
        let matchTxt = true;
        if (search && searchVals) {
            if (!["id", "restaurantId"].includes(searchVals)) {
                if (searchVals === "restaurantName")
                    matchTxt = new RegExp(`.*${search}.*`, "i").test(el["restaurantName"] + "");
                else {
                    matchTxt = new RegExp(`.*${search}.*`, "i").test((_b = ((_a = el.restaurantId) !== null && _a !== void 0 ? _a : {})) === null || _b === void 0 ? void 0 : _b[searchVals]);
                }
            }
            else {
                if (searchVals === "id")
                    matchTxt = el._id + "" === search;
                else
                    matchTxt = ((_d = ((_c = el.restaurantId) !== null && _c !== void 0 ? _c : {})) === null || _d === void 0 ? void 0 : _d._id) + "" === search;
            }
        }
        let matchCat = true;
        if (categories)
            matchCat = categories
                .split(",")
                .some((val) => { var _a, _b; return (_b = (_a = el.restaurantId) === null || _a === void 0 ? void 0 : _a.categories) === null || _b === void 0 ? void 0 : _b.includes(val); });
        let matchStatus = true;
        if (ordersStatus)
            matchStatus = ordersStatus
                .split(",")
                .some((val) => el.status === val);
        const totPrice = el.totPrice + el.delivery - el.discount;
        let matchMinPrice = true;
        if (minPrice)
            matchMinPrice = totPrice >= +minPrice;
        let matchMaxPrice = true;
        if (maxPrice)
            matchMaxPrice = totPrice <= +maxPrice;
        const totQty = el.items.reduce((acc, curr) => acc + curr.quantity, 0);
        let matchMinQTy = true;
        if (minQuantity)
            matchMinQTy = totQty >= +minQuantity;
        let matchMaxQTy = true;
        if (maxQuantity)
            matchMaxQTy = totQty <= +maxQuantity;
        el.isAdmin = el.userId + "" === userId;
        return (matchTxt &&
            matchCat &&
            matchStatus &&
            matchMinPrice &&
            matchMaxPrice &&
            matchMinQTy &&
            matchMaxQTy);
    });
    return { filtered };
};
