export default class HashMap {
  capacity;
  occupancy;
  #keys;
  #values;
  constructor() {
    this.loadFactor = 0.75;
    this.occupancy = 0;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
    this.#keys = new Array(this.capacity);
    this.#values = new Array(this.capacity);
  }
  hash(key) {
    if (!key || key.length < 0) return;
    if (typeof key != "string")
      throw new Error("TypeError: key must be of type string");
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    const c = 0.6180339887;
    return Math.floor(this.capacity * ((hashCode * c) % 1));
  }
  resize() {
    // trigger resize then rehash
    const oldKeys = this.#keys;
    const oldValues = this.#values;

    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.#keys = new Array(this.capacity);
    this.#values = new Array(this.capacity);
    this.occupancy = 0;

    for (let i = 0; i < oldKeys.length; i++) {
      const key = oldKeys[i];
      const value = oldValues[i];

      if (key !== undefined && key !== null) {
        this.set(key, value);
      }
    }
  }
  set(key, value) {
    if (!key || !value) throw new Error("ArgError: missing arguments");

    if (this.occupancy / this.capacity >= this.loadFactor) {
      console.log("resizing buckets");
      this.resize();
    }
    const hashedKey = this.hash(key);

    if (!this.#keys[hashedKey]) this.occupancy++;
    this.#keys[hashedKey] = key;
    this.#values[hashedKey] = value;
    this.buckets[hashedKey] = value;
  }
  get(key) {
    if (!key) throw new Error("ArgError: missing key argument");
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    return !this.buckets[index] ? null : this.buckets[index];
  }
  has(key) {
    if (!key) throw new Error("ArgError: missing key argument");
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const keyDefined = !!this.buckets[index];
    return keyDefined;
  }
  remove(key) {
    if (!key) throw new Error("ArgError: missing key argument");
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const keyDefined = !!this.buckets[index];
    if (keyDefined) {
      this.#keys[index] = undefined;
      this.#values[index] = undefined;
      this.buckets[index] = undefined;
      this.occupancy--;
      return true;
    } else {
      return false;
    }
  }
  length() {
    return this.occupancy;
  }
  keys() {
    return this.#keys;
  }
  values() {
    return this.#values;
  }
  entries() {
    return this.#keys
      .map((key) => [key, this.buckets[this.hash(key)]])
      .filter((entry) => !!entry);
  }
  actualOccupancy() {
    return this.buckets.filter((bucket) => !!bucket).length;
  }
}
