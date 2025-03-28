import { PropTypes } from "prop-types";
import {
  fieldsLeftSide,
  fieldsLeftSideBottom,
  fieldsRightSide,
} from "../../config/fields";
import ButtonBasic from "../buttons/ButtonBasic";

const Content = ({ handleChainStr, handleClear, resRef, handleShowRes }) => {
  return (
    <div className="w-full grid grid-cols-[3fr_1fr] gap-[20px]">
      {/* LEFT SIDE */}
      <div className="w-full grid grid-cols-3 place-items-center gap-[20px]">
        {fieldsLeftSide.map((el) => (
          <ButtonBasic
            key={el.id}
            {...{
              styleProp: 2,
              label: el.field,
              handleClick: !isNaN(+el.field)
                ? () => handleChainStr(el.field)
                : el.field === "C"
                ? handleClear
                : null,
            }}
          />
        ))}

        {fieldsLeftSideBottom.map((el) => (
          <ButtonBasic
            key={el.id}
            {...{
              styleProp: isNaN(+el.field) ? 2 : 3,
              label: el.field,
              handleClick: () => handleChainStr(el.field),
            }}
          />
        ))}
      </div>
      {/* RIGHT SIDE */}
      <div className="w-full grid gap-[20px] place-items-center">
        {fieldsRightSide.map((el) => (
          <ButtonBasic
            key={el.id}
            {...{
              ref: el.field === "=" ? resRef : null,
              styleProp: 1,
              label: el.field,
              handleClick:
                el.field !== "="
                  ? () => handleChainStr(el.field)
                  : handleShowRes,
            }}
          />
        ))}
      </div>
    </div>
  );
};

Content.propTypes = {};
export default Content;
