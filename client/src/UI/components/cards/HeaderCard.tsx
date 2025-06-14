import { FC } from "react";
import { ImageUploadedType } from "../../../types/types";
import HeaderImgs from "./HeaderImgs";
import HeaderName from "./HeaderName";

type PropsType = {
  images: ImageUploadedType[];
  name: string;
};

const HeaderCard: FC<PropsType> = ({ images, name }) => {
  return (
    <>
      <HeaderName {...{ name: name }} />
      <HeaderImgs {...{ images: images }} />
    </>
  );
};
export default HeaderCard;
