export const makeLookUp = (mainCollection, collectionLooked) => ({
    $lookup: {
        from: collectionLooked,
        localField: `${mainCollection}.${collectionLooked}`,
        foreignField: "_id",
        as: `${mainCollection}.${collectionLooked}`,
    },
});
