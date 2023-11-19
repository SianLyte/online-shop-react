import { makeAutoObservable } from "mobx";
export default class TypeStore {
  constructor() {
    this.types = null;
    this.isLoading = false;
    this.isError = false;
    this.activeType = {};
    makeAutoObservable(this);
  }

  setTypes(types) {
    this.types = [...types];
  }

  setIsLoading(bool) {
    this.isLoading = bool;
  }

  setIsError(bool) {
    this.isError = bool;
  }

  setActiveType(activeType) {
    this.activeType = activeType;
  }
}
