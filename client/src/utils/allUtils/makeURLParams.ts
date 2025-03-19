export const createURLParams = (formData) => {
  const params = new URLSearchParams();

  for (const pair of Object.entries(formData ?? {})) {
    if (!pair[1]) continue;

    if (pair[0] === "search" && !formData.searchVals?.length) continue;
    if (pair[0] === "searchVals" && !formData.search) continue;

    if (Array.isArray(pair[1])) {
      if (pair[1]?.length) params.append(pair[0], pair[1].join(","));
    } else {
      if (+formData.minPrice && +formData.maxPrice) {
        if (pair[0] === "minPrice" && +pair[1] > formData.maxPrice) continue;
        if (pair[0] === "maxPrice" && +pair[1] < formData.minPrice) continue;
      } else if (+formData.minQuantity && +formData.maxQuantity) {
        if (pair[0] === "minQuantity" && +pair[1] > formData.maxQuantity)
          continue;
        if (pair[0] === "maxQuantity" && +pair[1] < formData.minQuantity)
          continue;
      } else {
        params.append(pair[0], pair[1] as string);
      }
    }
  }
  return params;
};
