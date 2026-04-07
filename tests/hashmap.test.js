import HashMap from "/src/hashmap";

describe("project-required test suite", () => {
  const map = new HashMap();
  test("set()", () => {
    map.set("apple", "red");
    map.set("banana", "yellow");
    map.set("carrot", "orange");
    map.set("dog", "brown");
    map.set("elephant", "gray");
    map.set("frog", "green");
    map.set("grape", "purple");
    map.set("hat", "black");
    map.set("ice cream", "white");
    map.set("jacket", "blue");
    map.set("kite", "pink");
    map.set("lion", "golden");
    expect(map.length()).toBe(9);

    map.set("moon", "silver");
    expect(map.length()).toBe(10);
    expect(map.capacity()).toBe(16);

    map.set("kite", "cyan");
    expect(map.get("kite")).toBe("cyan");

    map.set("jacket", "black");
    expect(map.length()).toBe(10);
  });

  test("has()", () => {
    expect(map.has("lion")).toBe(true);
  });

  test("entries()", () => {
    const data = [
      ["kite", "cyan"],
      ["jacket", "black"],
      ["frog", "green"],
      ["banana", "yellow"],
      ["grape", "purple"],
      ["elephant", "gray"],
      ["moon", "silver"],
      ["ice cream", "white"],
      ["carrot", "orange"],
      ["lion", "golden"],
    ];

    expect(map.entries()).toMatchObject(data);
  });

  test("other methods", () => {
    expect(map.get("grape")).toBe("purple");
    expect(map.has("grape")).toBe(true);

    expect(map.remove("moon")).toBe(true);
    expect(map.has("moon")).toBe(false);
    expect(map.length()).toBe(9);

    expect(map.keys().filter((i) => !!i).length).toBe(9);
    expect(map.values().filter((i) => !!i).length).toBe(9);
    expect(map.entries().filter((i) => !!i).length).toBe(9);
  });
});

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
      "clear",
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
        ["Abc", 9],
        ["cbA", 2],
        ["tea", 8],
        ["eat", 11],
      ])(".hash(%s) == %i", (input, exp) => {
        expect(map.hash(input)).toBe(exp);
      });
    });

    describe("project-required hash tests", () => {
      const map = new HashMap();
      test.each([
        ["apple", 3],
        ["banana", 8],
        ["carrot", 14],
        ["dog", 15],
        ["elephant", 11],
        ["frog", 6],
        ["grape", 9],
        ["hat", 3],
        ["ice cream", 13],
        ["jacket", 5],
        ["kite", 3],
        ["lion", 15],
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
      expect(map.keys()[3]).toBe("apple");
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
      expect(map.length()).toBe(2);
    });

    test("returns 2 (no collision)", () => {
      map.set("x-ray", "invisible");
      expect(map.length()).toBe(3);
    });
  });

  describe("clear()", () => {
    const map = new HashMap();
    test("invokes info when buckets are already clear", () => {
      const consoleSpy = jest
        .spyOn(console, "info")
        .mockImplementation(() => {});

      map.clear();
      expect(consoleSpy).toHaveBeenCalledWith("Buckets are already empty.");
    });

    test("successfully clear buckets", () => {
      map.set("apple", "red");
      expect(map.length()).toBe(1);
      map.clear();
      expect(map.length()).toBe(0);
    });
  });

  describe("values()", () => {
    const map = new HashMap();

    test("no existing values", () => {
      expect(map.values()).toMatchObject(new Array(16));
    });

    test("returns 1 existing value", () => {
      map.set("apple", "red");
      expect(map.values()[3]).toBe("red");
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
      map.set("banana", "yellow");
      expect(map.entries()).toMatchObject([
        ["apple", "red"],
        ["banana", "yellow"],
      ]);
    });
  });
});
