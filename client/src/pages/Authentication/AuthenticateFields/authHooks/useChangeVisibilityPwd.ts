export const useChangeVisibilityPwd = ({
  isConfirmPwdVisible,
  setIsConfirmPwdVisible,
  isPwdVisible,
  setIsPwdVisible,
}: {
  isConfirmPwdVisible: boolean;
  setIsConfirmPwdVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isPwdVisible: boolean;
  setIsPwdVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleChangePwdVisibility = () => {
    if (isConfirmPwdVisible) {
      setIsConfirmPwdVisible(false);
      setIsPwdVisible(true);
    } else {
      setIsPwdVisible(!isPwdVisible);
    }
  };

  const handleChangeConfirmPwdVisibility = () => {
    if (isPwdVisible) {
      setIsPwdVisible(false);
      setIsConfirmPwdVisible(true);
    } else {
      setIsConfirmPwdVisible(!isConfirmPwdVisible);
    }
  };

  return {
    handleChangePwdVisibility,
    handleChangeConfirmPwdVisibility,
  };
};
