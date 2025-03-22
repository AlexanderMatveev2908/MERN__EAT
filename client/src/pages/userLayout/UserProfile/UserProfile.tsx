import { FC } from "react";
import { useUserProfile } from "./hooks/useUserProfile";
import ButtonsForm from "./components/ButtonsForm";
import FormUserProfile from "./components/FormUserProfile";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import { useScrollTop } from "../../../core/hooks/useScrollTop";

const UserProfile: FC = () => {
  useScrollTop();

  const {
    propsBtns,
    curr,
    state,
    handleChange,
    isPending,
    isPendingUpdate,
    handleSubmit,
    refs,
  } = useUserProfile();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-5">
      <span className="txt__04">Your Profile Details</span>

      {isPending ? (
        <LoaderPageReact />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-5 border-orange-500 rounded-xl h-fit p-5 sm:px-10"
        >
          <div className="w-full overflow-hidden">
            <div
              className="w-[300%] grid grid-cols-3 transition-all duration-500 min-h-[250px]"
              style={{ transform: `translateX(-${(curr * 100) / 3}%)` }}
            >
              <FormUserProfile
                {...{
                  state,
                  handleChange,
                  ...refs,
                }}
              />
            </div>
          </div>

          <ButtonsForm
            {...{
              ...propsBtns,
              curr,
              isPendingUpdate,
            }}
          />
        </form>
      )}
    </div>
  );
};
export default UserProfile;
