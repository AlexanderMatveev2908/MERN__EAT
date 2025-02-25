import { FC } from "react";
import { Link } from "react-router-dom";
import { footerFieldsArr, socialFieldsArr } from "./footerFieldsArr";
import Button from "../Button/Button";

const Footer: FC = () => {
  return (
    <div className="pad_page py-5 border-t-2 border-orange-500 w-full flex flex-col items-center gap-y-5">
      <div className="grid w-full gap-y-5 ">
        <Link to="/" className="txt__05 text-orange-500">
          LOGO
        </Link>

        <div className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {footerFieldsArr.map((field) => (
            <div key={field.id} className="w-full flex flex-col items-start">
              <Link
                to={field.path}
                className="el_with_after txt__02 transition-all duration-300 hover:text-orange-500"
              >
                {field.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <ul className="w-full grid sm:grid-cols-2 justify-items-start gap-y-5">
        {socialFieldsArr.map((field) => (
          <li key={field.id}>
            <a
              href={field.url}
              className="grid max-w-fit grid-cols-[40px_1fr] items-end transition-all duration-300 el_with_after hover:text-orange-500"
            >
              <field.svg className="w-[30px] h-[30px] " />
              <span className="txt__01">{field.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="w-full flex justify-center pt-10">
        <Button />
      </div>

      <div className="w-full flex justify-center pt-5 sm:pt-10">
        <span className="txt__01">
          &copy;&nbsp;{new Date().getFullYear()}&nbsp;MERN__EAT. No rights
          reserved just making it for fun ✌🏼
        </span>
      </div>
    </div>
  );
};
export default Footer;
