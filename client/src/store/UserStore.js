import { makeAutoObservable } from "mobx";
import { login, register, check } from "../http/userAPI";
export default class UserStore {
  constructor() {
    //null для requireAuth, чтобы ничего не рисовал до useEffect
    this.isAuth = null;
    this.user = {};
    makeAutoObservable(this);
  }
  *check() {
    const res = yield check();
    if (res.data.token) {
      localStorage.setItem("accessToken", res.data.token);
      this.user = { id: res.data.id };
      this.setAuth(true);
    } else {
      this.user = {};
      this.setAuth(false);
    }
  }

  login = async (email, password) => {
    const res = await login(email, password);
    if (res.data.token) {
      localStorage.setItem("accessToken", res.data.token);
      this.user.id = res.data.id;
      this.isAuth = true;
    }
    return res;
  };

  logout = () => {
    this.user = {};
    this.isAuth = null;
    localStorage.setItem("accessToken", "");
  };

  register = async (email, password) => {
    const res = await register(email, password);
    if (res.data.token) {
      await this.login(email, password);
    }
    return res;
  };

  setAuth(bool) {
    this.isAuth = bool;
  }
  setUser(user) {
    this.user = user;
  }
}
