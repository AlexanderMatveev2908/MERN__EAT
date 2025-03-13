import { FC } from "react";

type PropsType = {
  url: string;
  name: string;
};

const HeaderNameImgItem: FC<PropsType> = ({ url, name }) => {
  return (
    <div className="w-full flex justify-center relative mb-1">
      <div className="w-full absolute top-0 left-0 flex justify-start h-[50px] bg-black/90 items-center ">
        <span className="txt__03 ml-2 overflow-x-auto hide_scrollbar">
          {name}
        </span>
      </div>

      <div className="w-full min-w-[200px] max-w-[700px] h-full min-h-[40vw] max-h-[40vw] md:min-h-[250px] md:max-h-[250px] rounded-xl overflow-hidden aspect-[16/9]">
        <img
          src={url}
          alt="Your main img uploaded"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
export default HeaderNameImgItem;
