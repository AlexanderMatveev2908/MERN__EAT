export const useCartVals = (cartState, dispatch) => {
  console.log(cartState);

  //sometimes i spread to not write all stuff inside state but to be onest i do it often also for habit
  return {
    ...cartState,
  };
};
