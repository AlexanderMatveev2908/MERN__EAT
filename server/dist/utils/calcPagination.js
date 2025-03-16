export const calcPagination = (req, totEls) => {
    const { currPage = 1, currLimit = 6 } = req.query;
    const limit = currLimit ? +currLimit : 6;
    const page = currPage ? +currPage : 1;
    // in my middleware i already converted vals to number and i am sure they will be sent or i return 400, i converted and give them fallback again just for tsc complain
    const skip = Math.max((totEls !== null && totEls !== void 0 ? totEls : 0) - limit, (+page - 1) * limit);
    const totPages = Math.ceil((totEls !== null && totEls !== void 0 ? totEls : 0) / limit);
    return { limit: limit, skip, totPages };
};
