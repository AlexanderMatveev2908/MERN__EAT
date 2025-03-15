export const createURLParams = (formData) => {
  const params = new URLSearchParams();

  for (const pair of Object.entries(formData ?? {})) {
    if (pair[1]) {
      if (Array.isArray(pair[1])) params.append(pair[0], pair[1].join(","));
      else params.append(pair[0], pair[1] as string);
    }
  }
  return params + "";
};
