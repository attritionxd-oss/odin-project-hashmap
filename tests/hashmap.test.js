import HashMap from "/src/hashmap";

describe("hashmap", () => {
  test("module exists", () => {
    expect(new HashMap()).toBeDefined();
  });

  test("is an object", () => {
    expect(typeof new HashMap()).toBe("object");
  });

  describe("has methods", () => {
    const map = new HashMap();
    const methods = [
      "hash",
      "set",
      "get",
      "has",
      "remove",
      "length",
      "keys",
      "values",
      "entries",
    ];
    methods.forEach((method) => {
      test(`has method: ${method}`, () => {
        expect(typeof map[method]).toBe("function");
      });
    });
  });

  describe("hash()", () => {
    const map = new HashMap();

    test("erroneous arg handling", () => {
      expect(map.hash()).toBeUndefined();
      expect(() => map.hash(1)).toThrow();
    });

    describe("test anagram collision", () => {
      const map = new HashMap();
      test.each([
        ["Abc", 4],
        ["cbA", 14],
        ["tea", 15],
        ["eat", 1],
      ])(".hash(%s) == %i", (input, exp) => {
        expect(map.hash(input)).toBe(exp);
      });
    });

    describe("project-required hash tests", () => {
      const map = new HashMap();
      test.each([
        ["apple", 11],
        ["banana", 11],
        ["carrot", 3],
        ["dog", 6],
        ["elephant", 2],
        ["frog", 2],
        ["grape", 4],
        ["hat", 14],
        ["ice cream", 11],
        ["jacket", 0],
        ["kite", 9],
        ["lion", 3],
      ])(".hash(%s) == %i", (input, exp) => {
        expect(map.hash(input)).toBe(exp);
      });
    });
  });

  describe("get()", () => {
    const map = new HashMap();

    test("erroneous arg handling", () => {
      expect(() => map.get()).toThrow();
    });

    test("get returns expected", () => {
      map.set("apple", "red");
      expect(map.get("apple")).toBe("red");
    });

    test("get returns null", () => {
      expect(map.get("whale")).toBe(null);
    });
  });

  describe("set()", () => {
    const map = new HashMap();

    test("erroneous arg handling", () => {
      expect(() => map.set()).toThrow();
    });

    test.each([
      ["Abc", "first", "first"],
      ["cbA", "second", "second"],
      ["tea", "third", "third"],
      ["eat", "fourth", "fourth"],
    ])(".set(%s, %s) == %i", (key, value) => {
      map.set(key, value);
      expect(map.get(key)).toBe(value);
    });

    describe("project-required tests", () => {
      const map = new HashMap();
      test.each([
        ["apple", "red"],
        ["banana", "yellow"],
        ["carrot", "orange"],
        ["dog", "brown"],
        ["elephant", "gray"],
        ["frog", "green"],
        ["grape", "purple"],
        ["hat", "black"],
        ["ice cream", "white"],
        ["jacket", "blue"],
        ["kite", "pink"],
        ["lion", "golden"],
      ])(".hash(%s, %s) == %s", (key, value) => {
        map.set(key, value);
        expect(map.get(key)).toBe(value);
      });
    });
  });

  describe("has()", () => {
    const map = new HashMap();

    test("erroneous arg handling", () => {
      expect(() => map.has()).toThrow();
    });

    test("has returns true", () => {
      map.set("apple", "red");
      expect(map.has("apple")).toBe(true);
    });

    test("has returns false", () => {
      expect(map.has("peach")).toBe(false);
    });
  });

  describe("keys()", () => {
    const map = new HashMap();

    test("no existing keys", () => {
      expect(map.keys()).toMatchObject(new Array(16));
    });

    test("returns 1 existing key", () => {
      map.set("apple", "red");
      expect(map.keys()[11]).toBe("apple");
    });
  });

  describe("length()", () => {
    const map = new HashMap();

    test("returns 0", () => {
      expect(map.length()).toBe(0);
    });

    test("returns 1 (collision occurred)", () => {
      map.set("apple", "red");
      map.set("banana", "yellow");
      expect(map.length()).toBe(1);
    });

    test("returns 2 (no collision)", () => {
      map.set("x-ray", "invisible");
      expect(map.length()).toBe(2);
    });
  });

  describe("values()", () => {
    const map = new HashMap();

    test("no existing values", () => {
      expect(map.values()).toMatchObject(new Array(16));
    });

    test("returns 1 existing value", () => {
      map.set("apple", "red");
      expect(map.values()[11]).toBe("red");
    });
  });

  describe("remove()", () => {
    const map = new HashMap();

    test("erroneous arg handling", () => {
      expect(() => map.remove()).toThrow();
    });

    test("remove successful", () => {
      map.set("apple", "red");
      expect(map.remove("apple")).toBe(true);
    });

    test("remove unsuccessful", () => {
      expect(map.remove("apple")).toBe(false);
    });
  });

  describe("entries()", () => {
    const map = new HashMap();

    test("no existing entries", () => {
      expect(map.entries()).toMatchObject(new Array(16));
    });

    test("returns existing entries", () => {
      map.set("apple", "red");
      map.set("carrot", "orange");
      expect(map.entries()).toMatchObject([
        ["carrot", "orange"],
        ["apple", "red"],
      ]);
    });
  });
});

describe("project-required test suite", () => {
  const test = new HashMap();
  test.set("apple", "red");
  test.set("banana", "yellow");
  test.set("carrot", "orange");
  test.set("dog", "brown");
  test.set("elephant", "gray");
  test.set("frog", "green");
  test.set("grape", "purple");
  test.set("hat", "black");
  test.set("ice cream", "white");
  test.set("jacket", "blue");
  test.set("kite", "pink");
  test.set("lion", "golden");

  expect(test.has("apple")).toBe(true);
  expect(test.has("banana")).toBe(true);
  expect(test.has("carrot")).toBe(true);
  expect(test.has("dog")).toBe(true);
  expect(test.has("elephant")).toBe(true);
  expect(test.has("frog")).toBe(true);
  expect(test.has("grape")).toBe(true);
  expect(test.has("hat")).toBe(true);
  expect(test.has("ice cream")).toBe(true);
  expect(test.has("jacket")).toBe(true);
  expect(test.has("kite")).toBe(true);
  expect(test.has("lion")).toBe(true);
  expect(test.occupancy).toBe(8);
  expect(test.capacity).toBe(16);

  const data = [
    // ["apple", "red"],
    // ["banana", "yellow"],
    // ["carrot", "orange"],
    ["dog", "brown"],
    // ["elephant", "gray"],
    ["frog", "green"],
    ["grape", "purple"],
    ["hat", "black"],
    ["ice cream", "white"],
    ["jacket", "blue"],
    ["kite", "pink"],
    ["lion", "golden"],
  ];

  expect(test.entries()).toEqual(expect.arrayContaining(data));
});
