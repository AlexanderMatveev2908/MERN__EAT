import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

import MainLayoutRoute from "./layouts/mainLayout/MainLayoutRoute";
import Authentication from "./pages/Authentication/Authentication";
// import CallbackAuth from "./pages/CallbackAuth/CallbackAuth";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayoutRoute />}>
        <Route index element={<Home />} />

        {/* <Route path="callback" element={<CallbackAuth />} /> */}

        <Route path="authentication" element={<Authentication />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
