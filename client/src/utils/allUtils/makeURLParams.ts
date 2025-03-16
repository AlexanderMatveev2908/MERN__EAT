export const createURLParams = (formData) => {
  const params = new URLSearchParams();

  for (const pair of Object.entries(formData ?? {})) {
    if (!pair[1]) continue;

    if (pair[0] === "search" && !formData.searchVals?.length) continue;
    if (pair[0] === "searchVals" && !formData.search) continue;

    if (Array.isArray(pair[1])) {
      if (pair[1]?.length) params.append(pair[0], pair[1].join(","));
    } else params.append(pair[0], pair[1] as string);
  }
  return params;
};
