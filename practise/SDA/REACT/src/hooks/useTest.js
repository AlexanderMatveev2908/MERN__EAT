import { useReducer } from "react";

const initState = {
  curr: null,
  tot: 0,
  act: null,
};

const isInvalidNum = (val) => val?.startsWith("0") && !val?.includes(".");

const handleMath = (state) => {
  const curr = +state.curr;
  let updated = state.tot;

  switch (state.act) {
    case "+":
      updated += curr;
      break;
    case "-":
      updated -= curr;
      break;
    case "×":
      updated *= curr;
      break;
    case "÷":
      updated =
        state.curr !== null ? (curr !== 0 ? updated / curr : "Error") : updated;
      break;
    default:
      throw new Error("Invalid");
  }

  return { updated };
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

      if (!state.act) state.act = "+";

      const { updated } = handleMath(state);

      return {
        act,
        curr: null,
        tot: updated,
      };
    }

    case "GET_RES": {
      if (![state.curr, state.act].every((el) => !!el)) return state;

      const { updated } = handleMath(state);

      return {
        act: null,
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
  const handleClearTest = () => dispatch({ type: "CLEAR" });

  const handleChangeAction = (val) => {
    dispatch({ type: "ACT_CLICK", payload: { act: val } });
  };
  const getRes = () => dispatch({ type: "GET_RES" });

  console.log(state);

  return {
    handleTestClick,
    handleClearTest,
    handleChangeAction,
    getRes,
  };
};
