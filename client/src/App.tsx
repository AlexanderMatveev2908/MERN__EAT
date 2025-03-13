import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainLayoutRoute from "./layouts/mainLayout/MainLayoutRoute";
import NoticeEmail from "./pages/NoticeEmail/NoticeEmail";
import { useApp } from "./hooks/useApp/useApp";
import LayoutNewsLetterRoute from "./layouts/LayoutNewsLetterRoute";
import Login from "./pages/authLayout/Login/Login";
import Register from "./pages/authLayout/Register/Register";
import SendEmail from "./pages/authLayout/SendEmail/SendEmail";
import Verify from "./pages/authLayout/Verify/Verify";
import RecoverPwd from "./pages/authLayout/RecoverPwd/RecoverPwd";
import UserProfile from "./pages/userLayout/UserProfile/UserProfile";
import VerifyUnsubScribeNewsLetter from "./pages/newsLetterLayout/VerifyUnsubScribeNewsLetter/VerifyUnsubScribeNewsLetter";
import NoticeUnSubscribe from "./pages/newsLetterLayout/NoticeUnSubscribe/NoticeUnSubscribe";
import ManageAccount from "./pages/userLayout/ManageAccount/ManageAccount";
import VerifyUser from "./pages/userLayout/VerifyUser/VerifyUser";
import AddRestaurant from "./pages/myRestaurantsLayout/AddRestaurant/AddRestaurant";
import LayoutUserRoute from "./layouts/LayoutUserRoute";
import LayoutMyRestaurantsRoute from "./layouts/LayoutMyRestaurantsRoute";
import LayoutNonLoggedUserRoute from "./layouts/LayoutNonLoggedUserRoute";
import MyRestaurants from "./pages/myRestaurantsLayout/MyRestaurants/MyRestaurants";
import UpdateRestaurant from "./pages/myRestaurantsLayout/UpdateRestaurant/UpdateRestaurant";

const App: FC = () => {
  useApp();

  return (
    <Routes>
      <Route path="/" element={<MainLayoutRoute />}>
        <Route index element={<Home />} />

        <Route path="auth" element={<LayoutNonLoggedUserRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="send-email" element={<SendEmail />} />
          <Route path="verify" element={<Verify />} />
          <Route path="recover-pwd" element={<RecoverPwd />} />
        </Route>

        <Route path="user" element={<LayoutUserRoute />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="manage-account" element={<ManageAccount />} />
        </Route>

        <Route path="verify-new-email" element={<VerifyUser />} />

        <Route path="notice-email" element={<NoticeEmail />} />

        <Route path="newsletter" element={<LayoutNewsLetterRoute />}>
          <Route
            path="verify-unsubscribe"
            element={<VerifyUnsubScribeNewsLetter />}
          />
          <Route
            path="notice-unsubscribe-with-retry"
            element={<NoticeUnSubscribe />}
          />
        </Route>

        <Route path="my-restaurants" element={<LayoutMyRestaurantsRoute />}>
          <Route index element={<MyRestaurants />} />

          <Route path="add-restaurant" element={<AddRestaurant />} />
          <Route path="update/:restId" element={<UpdateRestaurant />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
