export const sortOrders = (orders, sortObj) => {
    const sortArr = Object.entries(sortObj);
    const sortRecursive = (a, b, i) => {
        if (i >= sortArr.length)
            return 0;
        const [label, val] = sortArr[i];
        const valA = label === "price"
            ? a.totPrice + a.delivery - a.discount
            : ["createdAt", "updatedAt"].includes(label)
                ? new Date(a[label] + "").getTime()
                : label === "quantity"
                    ? a.items.reduce((acc, curr) => acc + curr.quantity, 0)
                    : a[label];
        const valB = label === "price"
            ? b.totPrice + b.delivery - b.discount
            : ["createdAt", "updatedAt"].includes(label)
                ? new Date(b[label] + "").getTime()
                : label === "quantity"
                    ? b.items.reduce((acc, curr) => acc + curr.quantity, 0)
                    : b[label];
        if (valA === valB)
            return sortRecursive(a, b, i + 1);
        // if a is less by default go after b or before if bigger, so all start in asc mode BUT, * val invert order if is about DESC
        return ((valA > valB ? 1 : -1) *
            val);
    };
    return orders.sort((a, b) => sortRecursive(a, b, 0));
};
export const recursiveClone = (obj) => {
    if (obj === null || typeof obj !== "object")
        return obj;
    if (Array.isArray(obj))
        return obj.map((el) => recursiveClone(el));
    const newObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
            newObj[key] = recursiveClone(obj[key]);
    }
    return newObj;
};
