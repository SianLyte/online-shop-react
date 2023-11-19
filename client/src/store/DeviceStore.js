import { makeAutoObservable } from "mobx";
import { getAll, getOne } from "../http/deviceAPI";
export default class DeviceStore {
  constructor() {
    this.devices = null;
    this.isLoading = false;
    this.isError = false;
    makeAutoObservable(this);
  }

  async getAll(limit, page, brandId, typeId) {
    this.isError = false;
    this.isLoading = true;
    const res = await getAll(limit, page, brandId, typeId);
    if (res.status === 200) {
      this.devices = res.data.rows;
    } else {
      this.isError = true;
      this.devices = [];
    }
    this.isLoading = false;
  }

  async getOne(id) {
    const res = await getOne(id);
    return res.data;
  }

  setIsLoading(bool) {
    this.isLoading = bool;
    this.isError = false;
  }

  setIsError(bool) {
    this.isError = bool;
  }
}
