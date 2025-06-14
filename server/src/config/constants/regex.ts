export const REG_NAME = /^[A-Z][a-zA-ZÀ-ÿ`'-_\d\s]*$/;
export const REG_PWD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{8,}$/;
export const REG_EMAIL =
  /^(?![.-])(?!.*[.-]$)(?!.*\.\.)(?!.*@.*@)[A-Za-zÀ-ÿ0-9._%+-]+@[A-Za-zÀ-ÿ0-9]+\.[A-Za-z]{2,}$/;

export const REG_MONGO = /^[a-f0-9]{24}$/;
export const REG_TOKEN = /^[a-f0-9]{128}$/;
export const REG_COUPON = /^[a-f0-9]{16}$/;

export const REG_COUNTRY = /^[A-Za-zÀ-ÿ\d\s_]{2,50}$/;
export const REG_STATE = /^[A-Za-zÀ-ÿ\d\s-_]{2,50}$/;
export const REG_CITY = /^[A-Za-zÀ-ÿ\d\s-_]{2,50}$/;
export const REG_STREET = /^[A-Za-zÀ-ÿ0-9\s,._#-]{5,100}$/;
export const REG_ZIP = /^\d{5}(-\d{4})?$/;
export const REG_PHONE =
  /^\+?\d{1,4}[\s-]?\(?\d{2,3}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}$/;

export const REG_RESTAURANT_NAME =
  /^[A-Za-zÀ-ÿ0-9\s_\-!@#$%^&*()+=.,'"_]{2,50}$/;
export const REG_WEB_URL =
  /^(https?:\/\/)?(www\.)?[A-Za-z0-9-]+(\.[A-Za-z]{2,})(\/[A-Za-z0-9-/]*)?(\?[A-Za-z0-9=&]*)?(#[A-Za-z0-9-_]*)?$/;
export const REG_OPEN_CLOSE_TIME = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
export const REG_PRICE = /^\d+(\.\d{1,2})?$/;
export const REG_EST_TIME = /^\d+$/;

export const REG_SEARCH = /^[A-Za-zÀ-ÿ0-9\s,&!`'_-]*$/;
export const REG_QTY_SEARCH = /^\d*$/;

export const REG_QTY = /^\d+$/;
export const REG_DISH_NAME = /^[A-Za-zÀ-ÿ0-9\s_\-!@#$%^&*()+=.,'"_]{2,30}$/;

// p=path
export const REG_P_SEARCH = /^\/search\/?$/;
export const REG_P_DISHES_USER = /^\/search\/[a-f0-9]{24}$/;
export const REG_P_DISHES = /^\/my-dishes\/?$/;
export const REG_P_MY_REST = /^\/my-restaurants\/?$/;
export const REG_P_MY_ORD = /^\/my-orders\/?$/;
export const REG_P_MANAGE_ORD = /^\/manage-orders\/?$/;
export const REG_P_MY_REV = /^\/my-reviews\/add\/[a-f0-9]{24}?$/;

export const REG_TITLE_REV = /^[\w\d\s.,'!?()"-]{4,100}$/;
export const REG_TXT_REV = /^[\w\d\s.,'"\n\-!?()]{11,1000}$/;
