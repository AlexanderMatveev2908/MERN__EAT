const statusVars = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
];
export const makeOrdersStatusFields = () => {
    const objPipeline = {};
    for (const status of statusVars) {
        objPipeline[`restaurants.${status}Orders`] = {
            $size: {
                $filter: {
                    input: "$restaurants.orders",
                    as: "order",
                    cond: { $eq: ["$$order.status", status] },
                },
            },
        };
    }
    return objPipeline;
};
