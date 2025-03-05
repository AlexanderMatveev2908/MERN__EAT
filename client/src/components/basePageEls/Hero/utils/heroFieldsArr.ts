import hero from "../../../../assets/hero.avif";
import hero_2 from "../../../../assets/hero_2.avif";
// import hero_3 from "../../assets/hero_3.avif";
// import hero_4 from "../../assets/hero_4.avif";
import hero_5 from "../../../../assets/hero_5.avif";
import hero_6 from "../../../../assets/hero_6.avif";
import { genID } from "../../../../utils/genID";

export const heroFieldsArr = [
  { id: genID(), img: hero },
  { id: genID(), img: hero_2 },
  //   { id: genID(), img: hero_3 },
  //   { id: genID(), img: hero_4 },
  { id: genID(), img: hero_5 },
  { id: genID(), img: hero_6 },
];

export const heroLorem = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
