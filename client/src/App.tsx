import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainLayoutRoute from "./layouts/mainLayout/MainLayoutRoute";
import Login from "./pages/Authentication/Login/Login";
import Register from "./pages/Authentication/Register/Register";
import SendEmail from "./pages/Authentication/SendEmail/SendEmail";
import ChangePwd from "./pages/Authentication/ChangePwd/ChangePwd";
import Verify from "./pages/Authentication/Verify/Verify";
import LayoutNoticeEmailUI from "./layouts/LayoutNoticeEmail/LayoutNoticeEmailUi";
// import CallbackAuth from "./pages/CallbackAuth/CallbackAuth";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayoutRoute />}>
        <Route index element={<Home />} />

        {/* <Route path="callback" element={<CallbackAuth />} /> */}

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="send-email" element={<SendEmail />} />
        <Route path="verify" element={<Verify />} />

        <Route path="change-pwd" element={<ChangePwd />} />
      </Route>

      <Route path="/notice-email-sent" element={<LayoutNoticeEmailUI />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
