import React, { useContext, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Context } from "./ContextProvider";
import { observer } from "mobx-react-lite";
// import useAuth from "../hooks/useAuth";

const RequireAuth = observer(({ element }) => {
  const { user } = useContext(Context);
  const location = useLocation();
  //ИЗБАВИТЬСЯ ОТ ЮЗ ЭФФЕКТА
  useEffect(() => {
    (async () => await user.check())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user.isAuth === null) {
    return <div></div>;
  }
  if (!user.isAuth) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
        }}
      />
    );
  }
  return element;
});

export default RequireAuth;
