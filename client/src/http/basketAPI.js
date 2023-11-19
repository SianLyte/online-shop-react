import { $authHost, $host } from ".";

export const getAll = async () => {
  try {
    const res = await $authHost.get("/basket");
    return res;
  } catch (e) {
    return e.response;
  }
};

export const decrementDevice = async (id) => {
  try {
    const res = await $authHost.delete(`/basket/${id}`);
    return res;
  } catch (e) {
    return e.response;
  }
};

export const incrementDevice = async (id) => {
  try {
    const res = await $authHost.post(`/basket/${id}`);
    return res;
  } catch (e) {
    return e.response;
  }
};
