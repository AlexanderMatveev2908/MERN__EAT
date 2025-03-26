export const errMiddleware = (err, _, res, __) => {
    console.log(err);
    return res.status(err.status || 500).json({
        success: false,
        msg: "Oops! Our server decided to take a coffee break ☕. Try again later!",
        stack: err.stack,
    });
};
// if (err instanceof UnauthorizedError) {
//   if (err?.message?.includes("exp"))
//     return res.status(401).json({
//       success: false,
//       message: "Token Expired",
//     });
//   return res.status(401).json({
//     success: false,
//     message: "Unauthorized",
//   });
// }
