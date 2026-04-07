export default class HashMap {
  #capacity;
  #occupancy;
  #keys;
  #values;

  constructor() {
    this.loadFactor = 0.75;
    this.#occupancy = 0;
    this.#capacity = 16;
    this.buckets = new Array(this.#capacity);
    this.#keys = new Array(this.#capacity);
    this.#values = new Array(this.#capacity);
  }

  hash(key) {
    if (!key || key.length < 0) return;
    if (typeof key != "string")
      throw new Error("TypeError: key must be of type string");

    let h = 2166136261; // FNV offset basis
    for (let i = 0; i < key.length; i++) {
      h ^= key.charCodeAt(i);
      h = Math.imul(h, 16777619); // FNV prime
    }

    h ^= h >>> 16; // Mix high bits into low bits

    return Math.abs(h) & (this.#capacity - 1);
  }

  #resize() {
    // trigger resize then rehash
    const oldKeys = this.#keys;
    const oldValues = this.#values;

    this.#capacity *= 2;
    this.buckets = new Array(this.#capacity);
    this.#keys = new Array(this.#capacity);
    this.#values = new Array(this.#capacity);
    this.#occupancy = 0;

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

    if (this.#occupancy / this.#capacity >= this.loadFactor) {
      console.log("resizing buckets");
      this.#resize();
    }
    const hashedKey = this.hash(key);

    if (!this.#keys[hashedKey]) this.#occupancy++;
    this.#keys[hashedKey] = key;
    this.#values[hashedKey] = value;
    this.buckets[hashedKey] = value;
  }

  #index(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    return index;
  }

  get(key) {
    if (!key) throw new Error("ArgError: missing key argument");
    const index = this.#index(key);
    return !this.buckets[index] ? null : this.buckets[index];
  }

  has(key) {
    if (!key) throw new Error("ArgError: missing key argument");
    const index = this.#index(key);
    const keyDefined = !!this.buckets[index];
    return keyDefined;
  }

  remove(key) {
    if (!key) throw new Error("ArgError: missing key argument");
    const index = this.#index(key);

    const keyDefined = !!this.buckets[index];
    if (keyDefined) {
      this.#keys[index] = undefined;
      this.#values[index] = undefined;
      this.buckets[index] = undefined;
      this.#occupancy--;
      return true;
    } else {
      return false;
    }
  }

  length() {
    return this.#occupancy;
  }

  clear() {
    if (this.#occupancy === 0) console.info("Buckets are already empty.");
    this.#occupancy = 0;
    this.buckets = new Array(this.#capacity);
    this.#keys = new Array(this.#capacity);
    this.#values = new Array(this.#capacity);
  }

  keys() {
    return this.#keys;
  }

  values() {
    return this.#values;
  }

  entries() {
    return this.#keys
      .filter((entry) => !!entry)
      .map((key) => [key, this.buckets[this.hash(key)]]);
  }

  actualOccupancy() {
    return this.buckets.filter((bucket) => !!bucket).length;
  }

  capacity() {
    return this.#capacity;
  }
}
