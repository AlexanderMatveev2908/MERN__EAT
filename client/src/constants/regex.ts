export const REG_NAME = /^[A-Z][a-zA-ZÀ-ÿ`'-\s]*$/;
export const REG_PWD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{8,}$/;
export const REG_EMAIL =
  /^(?![.-])(?!.*[.-]$)(?!.*\.\.)(?!.*@.*@)[A-Za-zÀ-ÿ0-9._%+-]+@[A-Za-zÀ-ÿ0-9]+\.[A-Za-z]{2,}$/;

export const REG_MONGO = /^[a-f0-9]{24}$/;
export const REG_TOKEN = /^[a-f0-9]{128}$/;

export const REG_COUNTRY = /^[A-Za-zÀ-ÿ\s]{2,50}$/;
export const REG_STATE = /^[A-Za-zÀ-ÿ\s-]{2,50}$/;
export const REG_CITY = /^[A-Za-zÀ-ÿ\s-]{2,50}$/;
export const REG_STREET = /^[A-Za-zÀ-ÿ0-9\s,.#-]{5,100}$/;
export const REG_ZIP = /^\d{5}(-\d{4})?$/;
export const REG_PHONE =
  /^\+?\d{1,4}[\s-]?\(?\d{2,3}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}$/;

export const REG_RESTAURANT_NAME = /^[A-Za-zÀ-ÿ0-9\s,&`'-]{3,50}$/;
