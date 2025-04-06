export const handleNoHits = (res, totDocuments) => res.status(200).json({
    success: true,
    message: "Not found",
    totDocuments,
    nHits: 0,
    totPages: 0,
});
