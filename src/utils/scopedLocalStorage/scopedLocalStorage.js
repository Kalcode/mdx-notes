export class ScopedLocalStorage {
  static storage =  {};

  static getItem(key) {
    return ScopedLocalStorage.storage[key];
  }

  static setItem(key, value) {
    ScopedLocalStorage.storage[key] = value;
  }

  static clear() {
    ScopedLocalStorage.storage = {}
  }
}