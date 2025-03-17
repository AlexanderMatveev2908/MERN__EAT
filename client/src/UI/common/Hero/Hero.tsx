import { FC } from "react";
import { heroFieldsArr } from "../../../core/config/fieldsArr/fields";
import ImgSlider from "../../components/ImgSlider/ImgSlider";

const Hero: FC = () => {
  return <ImgSlider {...{ images: heroFieldsArr }} />;
};
export default Hero;
