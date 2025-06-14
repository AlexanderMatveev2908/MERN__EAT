import helmet from "helmet";
import { isDev } from "../../config/currMode.js";

export const helmetMid = helmet({
  contentSecurityPolicy: {
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "blob:", "https://res.cloudinary.com/"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: [
        "'self'",
        isDev ? process.env.FRONT_URL_DEV! : process.env.FRONT_URL!,
      ],
    },
  },
});
