import { createContext } from "react";
import UserStore from "../store/UserStore";
import DeviceStore from "../store/DeviceStore";
import TypeStore from "../store/TypeStore";
import { BrandStore } from "../store/BrandStore";
import { BasketStore } from "../store/BasketStore";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const user = new UserStore();
  const devices = new DeviceStore();
  const type = new TypeStore();
  const brand = new BrandStore();
  const basket = new BasketStore();
  const value = { user, devices, type, brand, basket };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
