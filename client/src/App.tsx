import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainLayoutRoute from "./layouts/mainLayout/MainLayoutRoute";
import Login from "./pages/Authentication/Login/Login";
import Register from "./pages/Authentication/Register/Register";
import SendEmail from "./pages/Authentication/SendEmail/SendEmail";
import Verify from "./pages/Authentication/Verify/Verify";
import RecoverPwd from "./pages/Authentication/RecoverPwd/RecoverPwd";
import LayoutNonLoggedUserRoute from "./layouts/layoutNonLoggedUser/LayoutNonLoggedUserRoute";
import NoticeEmail from "./pages/NoticeEmail/NoticeEmail";
import { useApp } from "./hooks/useApp";
// import CallbackAuth from "./pages/CallbackAuth/CallbackAuth";

const App: FC = () => {
  useApp();

  return (
    <Routes>
      <Route path="/" element={<MainLayoutRoute />}>
        <Route index element={<Home />} />

        {/* <Route path="callback" element={<CallbackAuth />} /> */}

        <Route path="auth" element={<LayoutNonLoggedUserRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="send-email" element={<SendEmail />} />
          <Route path="verify" element={<Verify />} />

          <Route path="recover-pwd" element={<RecoverPwd />} />
        </Route>

        <Route path="notice-email" element={<NoticeEmail />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
