import React, { useContext } from "react";
import CustomLink from "../CustomLink";
import "./navbar.scss";
import { observer } from "mobx-react-lite";
import { ShoppingBasket } from "lucide-react";
import { Context } from "../../hoc/ContextProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
const NavBar = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    user.logout();
    navigate("/login", { state: { from: location } });
  };

  return (
    <header>
      <nav className="navigation">
        <Link to="/" className="navigation__logo">
          spring
        </Link>
        <ul className="navigation__list">
          <li className="navigation__item">
            {user.user.id ? (
              <CustomLink className="navigation__link" to="/basket">
                <ShoppingBasket />
              </CustomLink>
            ) : null}
          </li>
          <li className="navigation__item">
            {user.user.id ? (
              <button className="navigation__link" onClick={logout}>
                Выйти
              </button>
            ) : (
              <CustomLink className="navigation__link" to="/login">
                Войти
              </CustomLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default NavBar;
