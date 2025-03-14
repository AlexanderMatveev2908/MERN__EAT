import { FC, useRef, useState } from "react";
import { useRangeInput } from "./useRangeInput";
import { Ham } from "lucide-react";

type PropsType = {
  minVal?: number;
  maxVal?: number;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RangeInput: FC<PropsType> = () => {
  const rangeRef = useRef<HTMLDivElement | null>(null);
  const [val, setVal] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVal(+e.target.value);

  useRangeInput({ rangeRef });

  return (
    <div
      ref={rangeRef}
      tabIndex={0}
      className="w-full el__flow input_range_container focus__base flex border-2 border-orange-500 rounded-xl"
    >
      <div className="input_range_container__field relative w-full p-5 grid-cols-3 grid md:grid-cols-[75px_1fr_75px] items-center">
        <span className="justify-self-start">0</span>

        <div className="field__range items-end row-start-2 col-span-3 md:row-start-auto md:col-span-1 w-full relative">
          <div
            className="range__tooltip absolute h-[50px] w-[50px] p-7 flex justify-center items-center z-10 -top-20"
            style={{ left: `calc(${(val / 200) * 100}% - 25px)` }}
          >
            {val}
          </div>

          <div className="range__track w-full h-[10px] bg-[whitesmoke] top-1/2 absolute -translate-y-1/2 rounded-2xl">
            <div
              className="track__progress w-full h-[10px] bg-orange-500 top-1/2 absolute -translate-y-1/2 rounded-2xl"
              style={{ width: `${(val / 200) * 100}%` }}
            ></div>
          </div>

          <input
            onChange={handleChange}
            type="range"
            min={0}
            max={200}
            value={val}
          />

          <span
            className="range__thumb absolute top-1/2 -translate-y-1/2"
            style={{ left: `calc(${(val / 200) * 100}% - 17.5px)` }}
          >
            <Ham className="text-black bg-orange-500 rounded-xl w-[35px] h-[35px] border-2 border-neutral-950" />
          </span>
        </div>

        <span className="col-start-3 md:col-start-auto justify-self-end">
          200
        </span>
      </div>
    </div>
  );
};
export default RangeInput;
