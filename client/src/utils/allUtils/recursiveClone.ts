export const recursiveClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) return obj.map((el) => recursiveClone(el));

  const newObj = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      newObj[key] = recursiveClone(obj[key]);
  }

  return newObj;
};
