import mongoose from "mongoose";
export const makeLookUp = (mainCollection, collectionLooked) => ({
    $lookup: {
        from: collectionLooked,
        localField: `${mainCollection}.${collectionLooked}`,
        foreignField: "_id",
        as: `${mainCollection}.${collectionLooked}`,
    },
});
export const makeMongoId = (str) => new mongoose.Types.ObjectId(str);
