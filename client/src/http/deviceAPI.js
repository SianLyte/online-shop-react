import { $authHost, $host } from ".";

export const getAll = async (limit, page, brandId, typeId) => {
  try {
    const filter = {};
    if (limit) {
      filter.limit = limit;
    }
    if (page) {
      filter.page = page;
    }
    if (brandId) {
      filter.brandId = brandId;
    }
    if (typeId) {
      filter.typeId = typeId;
    }
    const res = await $host.get("/device", { params: filter });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const getOne = async (id) => {
  try {
    const res = await $host.get(`/device/${id}`);
    return res;
  } catch (e) {
    return e.response;
  }
};

export const create = async () => {};

export const ratingCount = async (deviceId) => {
  try {
    const res = await $host.get(`/rating/count`, { params: { deviceId } });
    return res;
  } catch (e) {
    return e.response;
  }
};
