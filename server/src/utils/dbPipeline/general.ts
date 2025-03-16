export const makeLookUp = (
  mainCollection: string,
  collectionLooked: string
) => ({
  $lookup: {
    from: collectionLooked,
    localField: `${mainCollection}.${collectionLooked}`,
    foreignField: "_id",
    as: `${mainCollection}.${collectionLooked}`,
  },
});
