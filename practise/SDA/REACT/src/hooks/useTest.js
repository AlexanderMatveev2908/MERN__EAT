import { useReducer } from "react";

const initState = {
  prev: null,
  curr: null,
  tot: 0,
  act: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NUM_CLICK": {
      const { val } = action.payload;

      let updatedCurr = state.curr;

      if (!isNaN(val)) {
        if (!updatedCurr) updatedCurr = val + "";
        else updatedCurr += val + "";
      }
      if (updatedCurr && isNaN(+val))
        updatedCurr += updatedCurr?.includes(".") ? "" : ".";

      return {
        ...state,
        curr: updatedCurr,
      };
    }
    case "ACT_CLICK": {
      const { act } = action.payload;

      let canCalc = true;
      for (const key in state) {
        if (key === "tot") continue;
        if (!state[key]) {
          canCalc = false;
          break;
        }
      }
      if (!canCalc)
        return {
          ...state,
          act,
          prev: state.curr,
          curr: null,
        };

      const prev = +state.prev;
      const curr = +state.curr;
      let updated = state.tot;

      switch (state.act) {
        case "+":
          updated += prev + curr;
          break;
        case "-":
          updated += prev - curr;
          break;
        case "×":
          updated += prev * curr;
          break;
        case "÷":
          updated += curr !== 0 ? prev / curr : "Error";
          break;
        default:
          throw new Error("Invalid");
      }

      return {
        act,
        prev: null,
        curr: null,
        tot: updated,
      };
    }
    case "CLEAR":
      return initState;
    default:
      return state;
  }
};

export const useTest = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleTestClick = (val) => {
    dispatch({ type: "NUM_CLICK", payload: { val } });
  };
  const handleClearTest = () => {
    dispatch({ type: "CLEAR" });
  };
  const handleChangeAction = (val) => {
    dispatch({ type: "ACT_CLICK", payload: { act: val } });
  };

  console.log(state);
  return {
    handleTestClick,
    handleClearTest,
    handleChangeAction,
  };
};
