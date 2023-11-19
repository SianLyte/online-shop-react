import "./app.scss";
import { Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import DevicePage from "./pages/DevicePage";
import Layout from "./components/Layout";
import Basket from "./pages/Basket";
import RequireAuth from "./hoc/RequireAuth";
import Admin from "./pages/Admin";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "./hoc/ContextProvider";
import { getAll } from "./http/deviceAPI";
const App = observer(() => {
  const { user, basket } = useContext(Context);
  useEffect(() => {
    (async () => {
      await user.check();
      const a = await basket.getDevicesFromBasket();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isAuth]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Shop />} />
          <Route path="login/*" element={<Login />} />
          <Route path="register" element={<Login />} />
          <Route path="device/:id" element={<DevicePage />} />
          <Route path="basket" element={<RequireAuth element={<Basket />} />} />
          <Route path="admin" element={<RequireAuth element={<Admin />} />} />
        </Route>
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </>
  );
});

export default App;
