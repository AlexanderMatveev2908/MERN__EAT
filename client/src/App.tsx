import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile";
import MainLayoutRoute from "./layouts/mainLayout/MainLayoutRoute";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayoutRoute />}>
        <Route index element={<Home />} />

        <Route path="user-profile" element={<UserProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
