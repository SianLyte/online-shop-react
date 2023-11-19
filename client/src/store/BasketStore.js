import { makeAutoObservable } from "mobx";
import { decrementDevice, getAll, incrementDevice } from "../http/basketAPI";

export class BasketStore {
  constructor() {
    this.basket = [];
    this.isLoadingBasket = false;
    this.isErrorBasket = false;
    makeAutoObservable(this);
  }
  async getDevicesFromBasket() {
    const res = await getAll();
    if (res.status === 200) {
      this.basket = res.data;
    } else {
      this.basket = [];
    }
    return res.status;
  }

  async incrementDevice(id) {
    const res = await incrementDevice(id);
    if (res.data.device) {
      await this.getDevicesFromBasket();
    }
    return res;
  }

  async decrementDevice(id) {
    const res = await decrementDevice(id);
    if (res.data.device) {
      await this.getDevicesFromBasket();
    }
    return res;
  }
  setLoadingDeviceId(deviceId) {
    this.LoadingDeviceId = deviceId;
  }
  setErrorAddition(bool) {
    this.isErrorAddition = bool;
  }
  setBasket(basket) {
    this.basket = [...basket];
  }
}
