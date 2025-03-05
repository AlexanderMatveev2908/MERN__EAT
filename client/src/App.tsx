import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainLayoutRoute from "./layouts/mainLayout/MainLayoutRoute";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import LayoutNonLoggedUserRoute from "./layouts/layoutNonLoggedUser/LayoutNonLoggedUserRoute";
import NoticeEmail from "./pages/NoticeEmail/NoticeEmail";
import { useApp } from "./hooks/useApp";
import LayoutUserRoute from "./layouts/LayoutUserRoute/LayoutUserRoute";
import UserProfile from "./pages/User/UserProfile/UserProfile";
import Verify from "./pages/Auth/Verify/Verify";
import RecoverPwd from "./pages/Auth/RecoverPwd/RecoverPwd";
import SendEmail from "./pages/Auth/SendEmail/SendEmail";
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

        <Route path="user" element={<LayoutUserRoute />}>
          <Route path="profile" element={<UserProfile />} />
        </Route>

        <Route path="notice-email" element={<NoticeEmail />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
