export const REG_NAME = /^[A-Z][a-zA-Z`'-\s]*$/;
export const REG_PWD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
export const REG_EMAIL =
  /^(?![.-])(?!.*[.-]$)(?!.*\.\.)(?!.*@.*@)[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
