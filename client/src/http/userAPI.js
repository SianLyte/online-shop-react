import { $authHost, $host } from ".";

export const register = async (email, password) => {
  try {
    const res = await $host.post("/user/register", { email, password });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const login = async (email, password) => {
  try {
    const res = await $authHost.post("/user/login", {
      email,
      password,
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const check = async () => {
  try {
    const res = await $authHost.get("/user/auth");
    return res;
  } catch (e) {
    return e.response;
  }
};
