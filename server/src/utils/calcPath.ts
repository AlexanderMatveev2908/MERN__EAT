import path from "path";

export const get__filename = () => new URL(import.meta.url).pathname;
export const get__dirname = () => path.dirname(get__filename());
