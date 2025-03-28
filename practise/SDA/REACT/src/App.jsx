import Content from "./components/Content/Content";
import { useApp } from "./hooks/useApp";

const App = () => {
  const { resMath, textUser, ...rest } = useApp();

  return (
    <div className="w-full flex justify-center h-screen items-center">
      {/* CALCULATOR */}
      <div className="min-w-[500px] max-w-[500px] h-[831px] border border-[#222] rounded-[60px]">
        {/* HEADER */}
        <div className="grid grid-cols-1">
          <div className="w-full flex justify-start items-center h-[122px] p-[40px] text-white text-[35px] leading-[54px] border-b border-[#222] font-[400]">
            Calculator
          </div>
        </div>
        {/* CONTENT LAYER*/}
        <div className="w-full h-[630px] pt-[30px] pb-[40px] items-center">
          {/* CONTENT */}
          <div className="w-full h-[630px] px-[40px]">
            {/* TEXT BOARD */}
            <div className="w-full pb-[30px] flex justify-end">
              <span className="text-[35px] font-[400] text-white break-all">
                {resMath ?? textUser}
              </span>
            </div>

            {/* BUTTONS */}
            <Content {...rest} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
