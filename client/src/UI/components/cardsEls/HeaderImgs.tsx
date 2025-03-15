import { FC, ReactNode } from "react";
import { ImageUploadedType } from "../../../types/allTypes/API";

type PropsType = {
  images: ImageUploadedType[];
  children?: ReactNode;
};

const HeaderImgs: FC<PropsType> = ({ images, children }) => {
  return (
    <div className="w-full flex justify-center relative mb-1">
      {children ?? null}
      <div className="w-full overflow-x-auto hide_scrollbar snap-x snap-mandatory flex gap-4 px-5 mt-16">
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
