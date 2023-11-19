import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, Outlet, Link } from "react-router-dom";
import { Button, Card, Form, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../hoc/ContextProvider";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  useEffect(() => {
    if (user.user.id) {
      navigate(location.state?.from?.pathname || "/");
    }
  }, [user.user.id]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (pathname === "/login") {
      user.login(email, password);
    }
    if (pathname === "/register") {
      user.register(email, password);
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">
          {pathname === "/login" ? "Авторизация" : "Регистрация"}
        </h2>
        <Form className="d-flex flex-column" onSubmit={onSubmit}>
          <Form.Control className="mt-4" placeholder="Почта"></Form.Control>
          <Form.Control className="mt-2" placeholder="Пароль"></Form.Control>
          <Row>
            <div style={{ marginTop: 10 }}>
              {pathname === "/login" ? "Нет аккаунта? " : "Есть аккаунт? "}
              <Link
                to={pathname === "/login" ? "/register" : "/login"}
                style={{ color: "blue" }}
              >
                {pathname === "/login" ? "Зарегистрироваться" : "Войти"}
              </Link>
            </div>
            <Button className="mt-4" type="submit">
              {pathname === "/login" ? "Войти" : "Зарегистрироваться"}
            </Button>
          </Row>
        </Form>
      </Card>
      <Outlet></Outlet>
    </div>
  );
});

export default Auth;
