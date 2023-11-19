import { makeAutoObservable } from "mobx";

export class BrandStore {
  constructor() {
    this.brands = null;
    this.isLoading = false;
    this.isError = false;
    this.activeBrand = {};
    makeAutoObservable(this);
  }

  setBrands(brands) {
    this.brands = [...brands];
  }

  setLoading(bool) {
    this.isLoading(bool);
    this.isError(false);
  }

  setError(bool) {
    this.isError(bool);
  }

  setActiveBrand(activeBrand) {
    this.activeBrand = activeBrand;
  }
}
