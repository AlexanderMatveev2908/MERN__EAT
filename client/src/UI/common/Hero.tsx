import { FC } from "react";
import ImgSlider from "../components/ImgSlider/ImgSlider";
import { heroFieldsArr } from "../../core/config/fieldsArr/fields";

const Hero: FC = () => {
  return <ImgSlider {...{ images: heroFieldsArr }} />;
};
export default Hero;
