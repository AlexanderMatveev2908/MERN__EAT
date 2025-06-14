import { FC } from "react";
import { ImageUploadedType } from "../../../types/allTypes/API";

type PropsType = {
  images: ImageUploadedType[];
};

const HeaderImgs: FC<PropsType> = ({ images }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full overflow-x-auto hide_scrollbar snap-x snap-mandatory flex gap-4 p-4">
        {images.map((el) => (
          <div
            key={el.public_id}
            className="min-w-[200px] h-[200px] flex justify-center items-center border-2 border-orange-500 overflow-hidden rounded-xl"
          >
            <img
              src={el.url}
              alt="🧐"
              className="w-full h-full object-cover snap-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default HeaderImgs;
