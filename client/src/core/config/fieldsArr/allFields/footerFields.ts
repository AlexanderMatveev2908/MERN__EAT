import { genID } from "../../../../utils/allUtils/genID";
import { Github, Hotel } from "lucide-react";

export const footerFieldsArr = [
  {
    id: genID(),
    label: "About",
    path: "/",
  },
  {
    id: genID(),
    label: "Privacy Policy",
    path: "/",
  },
  {
    id: genID(),
    label: "Terms & Conditions",
    path: "/",
  },
  {
    id: genID(),
    label: "Contact",
    path: "/",
  },
];

export const socialFieldsArr = [
  {
    id: genID(),
    label: "Source Code",
    svg: Github,
    url: "https://github.com/AlexanderMatveev2908/FOOD_APP",
  },
  {
    id: genID(),
    label: "Hotels App",
    svg: Hotel,
    url: "https://mern-booking-app-0w8v.onrender.com/",
  },
];
