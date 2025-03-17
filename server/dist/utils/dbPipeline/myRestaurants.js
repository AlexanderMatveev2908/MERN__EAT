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
const countRatingVars = Array.from({ length: 5 }, (_, i) => i + 1);
export const makeReviewsCountFields = () => {
    const objPipeline = {};
    for (const rating of countRatingVars) {
        objPipeline[`restaurants.rating_${rating}`] = {
            $size: {
                $filter: {
                    input: "$restaurants.reviews",
                    as: "review",
                    cond: { $eq: ["$$review.rating", rating] },
                },
            },
        };
    }
    return objPipeline;
};
