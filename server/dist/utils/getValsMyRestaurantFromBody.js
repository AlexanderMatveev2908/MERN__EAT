var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
export const formatMyRestaurantsBody = (req, userEmail, userPhone) => {
    const { userId } = req;
    const _a = req.body, { estTimeDelivery, price, freeDeliveryPrice, openTime, closeTime, name, categories, phone, email, website } = _a, address = __rest(_a, ["estTimeDelivery", "price", "freeDeliveryPrice", "openTime", "closeTime", "name", "categories", "phone", "email", "website"]);
    //   mongoose automatically if we set a type for a val in schema it treats that value as type given
    return {
        owner: userId,
        name,
        address,
        contact: {
            email: email !== null && email !== void 0 ? email : userEmail,
            phone: phone !== null && phone !== void 0 ? phone : userPhone,
            website: website !== null && website !== void 0 ? website : null,
        },
        openHours: {
            openTime,
            closeTime,
        },
        categories,
        delivery: {
            estTimeDelivery,
            price: price !== null && price !== void 0 ? price : 0,
            freeDeliveryPrice: freeDeliveryPrice !== null && freeDeliveryPrice !== void 0 ? freeDeliveryPrice : 0,
        },
    };
};
