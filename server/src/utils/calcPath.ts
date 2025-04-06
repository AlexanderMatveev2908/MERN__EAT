import path from "path";

export const __filename = new URL(import.meta.url).pathname;
export const get__dirname = () => path.join(path.dirname(__filename), "..");
