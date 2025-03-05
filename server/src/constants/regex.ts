export const REG_NAME = /^[A-Z][a-zA-Z`'-\s]*$/;
export const REG_PWD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
export const REG_EMAIL =
  /^(?![.-])(?!.*[.-]$)(?!.*\.\.)(?!.*@.*@)[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;

export const REG_MONGO = /^[a-f0-9]{24}$/;
export const REG_TOKEN = /^[a-f0-9]{128}$/;

export const REG_COUNTRY = /^[A-Za-z\s]{2,50}$/;
export const REG_STATE = /^[A-Za-z\s-]{2,50}$/;
export const REG_CITY = /^[A-Za-z\s-]{2,50}$/;
export const REG_STREET = /^[A-Za-z0-9\s,.#-]{5,100}$/;
export const REG_ZIP = /^\d{5}(-\d{4})?$/;
export const REG_PHONE =
  /^\+?\d{1,4}[\s-]?\(?\d{2,3}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}$/;
