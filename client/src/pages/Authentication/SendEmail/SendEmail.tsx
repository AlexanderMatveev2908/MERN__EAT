import { FC, useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { emailField } from "../AuthenticateFields/BasicAuthField/basicAuthFieldsArr";
import { useSendEmail } from "./useSendEmail";
import BasicAuthField from "../AuthenticateFields/BasicAuthField/BasicAuthField";
import ButtonAnimated from "../../../components/ButtonAnimated/ButtonAnimated";
import {
  sendEmailAllowedPaths,
  sendEmailAllowedTypes,
} from "./sendEmailFieldsArr";

const SendEmail: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from;
  const type = searchParams.get("type");

  const { register, errors } = useSendEmail();

  return !sendEmailAllowedPaths?.includes(from) ||
    !sendEmailAllowedTypes?.includes(type ?? "") ? (
    <Navigate to="/" replace />
  ) : (
    <div className="w-full grid grid-cols-1 gap-y-10 items-center">
      <div className="w-full flex justify-center">
        <span className="txt__04">
          {type === "recover-pwd" ? "Recover Password" : "Verify Account"}
        </span>
      </div>

      <div className="w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10">
        <div className="w-full grid grid-cols-1">
          <form className="grid grid-cols-1 w-full gap-y-8">
            {/* <EmailField {...{ register, errors }} /> */}
            <BasicAuthField {...{ register, errors, field: emailField }} />

            <div className="w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center">
              <ButtonAnimated
                {...{ styleTxt: "txt__02 z-40 relative", label: "Send Email" }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SendEmail;
