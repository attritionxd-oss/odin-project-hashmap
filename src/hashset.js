export default class HashSet {
  #capacity;
  #occupancy;
  #keys;

  constructor() {
    this.loadFactor = 0.75;
    this.#occupancy = 0;
    this.#capacity = 16;
    this.#keys = new Array(this.#capacity);
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

  #index(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.#keys.length) {
      throw new Error("Trying to access index out of bounds");
    }
    return index;
  }

  set(key) {
    if (!key) throw new Error("ArgError: missing arguments");

    if (this.#occupancy / this.#capacity >= this.loadFactor) {
      console.log("resizing buckets");
      this.resize();
    }
    const hashedKey = this.hash(key);

    if (!this.#keys[hashedKey]) this.#occupancy++;
    this.#keys[hashedKey] = key;
  }

  get(key) {
    if (!key) throw new Error("ArgError: missing arguments");
    const index = this.#index(key);

    return !this.#keys[index] ? null : this.#keys[index];
  }

  has(key) {
    if (!key) throw new Error("ArgError: missing arguments");
    const index = this.#index(key);

    return !!this.#keys[index];
  }

  remove(key) {
    if (!key) throw new Error("ArgError: missing arguments");
    const index = this.#index(key);

    if (!!this.#keys[index]) {
      this.#keys[index] = undefined;
      this.#occupancy--;
      return true;
    } else return false;
  }

  length() {
    return this.#occupancy;
  }

  clear() {
    if (this.#occupancy === 0) console.info("Keys are already empty.");
    this.#occupancy = 0;
    this.#keys = new Array(this.#capacity);
  }

  keys() {
    return this.#keys;
  }

  capacity() {
    return this.#capacity;
  }
}
