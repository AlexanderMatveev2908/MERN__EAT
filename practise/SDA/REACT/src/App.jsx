import { useState } from "react";
import ButtonBasic from "./components/buttons/ButtonBasic";
import { fieldsLeftSide, fieldsRightSide } from "./config/fields";

const App = () => {
  const [textUser, setTextUser] = useState("0");

  const handleChainStr = (val) =>
    setTextUser((prev) => (+prev ? prev + val : val));
  const handleClear = () => setTextUser("0");

  return (
    <div className="w-full flex justify-center h-screen items-center">
      {/* CALCULATOR */}
      <div className="min-w-[500px] max-w-[500px] h-[831px] border border-[#222] rounded-[60px]">
        {/* HEADER */}
        <div className="w-full flex justify-start items-center h-[122px] p-[40px] text-white text-[35px] leading-[54px] border-b border-[#222] font-[400]">
          Calculator
        </div>
        {/* CONTENT LAYER*/}
        <div className="w-full h-[630px] pt-[30px] pb-[40px] items-center">
          {/* CONTENT */}
          <div className="w-full h-[630px] px-[40px]">
            {/* TEXT BOARD */}
            <div className="w-full pb-[30px] flex justify-end">
              <span className="text-[35px] font-[400] text-white break-all">
                {textUser}
              </span>
            </div>

            {/* BUTTONS */}
            <div className="w-full grid grid-cols-[3fr_1fr] gap-[20px]">
              {/* LEFT SIDE */}
              <div className="w-full grid grid-cols-3 place-items-center gap-[20px]">
                {fieldsLeftSide.map((el) => (
                  <ButtonBasic
                    key={el.id}
                    {...{
                      styleProp: 2,
                      label: el.field,
                      cbTextUser: !isNaN(+el.field)
                        ? () => handleChainStr(el.field)
                        : el.field === "C"
                        ? handleClear
                        : null,
                    }}
                  />
                ))}

                <ButtonBasic {...{ styleProp: 3, label: "0" }} />

                <ButtonBasic {...{ styleProp: 2, label: "." }} />
              </div>
              {/* RIGHT SIDE */}
              <div className="w-full grid gap-[20px] place-items-center">
                {fieldsRightSide.map((el) => (
                  <ButtonBasic
                    key={el.id}
                    {...{ styleProp: 1, label: el.field }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
