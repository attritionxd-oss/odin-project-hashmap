import HashSet from "/src/hashset";

describe("hashset", () => {
  test("module exists", () => {
    expect(new HashSet()).toBeDefined();
  });

  test("is an object", () => {
    expect(typeof new HashSet()).toBe("object");
  });

  describe("has methods", () => {
    const set = new HashSet();
    const methods = [
      "hash",
      "set",
      "get",
      "has",
      "remove",
      "length",
      "clear",
      "keys",
    ];
    methods.forEach((method) => {
      test(`has method: ${method}`, () => {
        expect(typeof set[method]).toBe("function");
      });
    });
  });

  describe("hash()", () => {
    const set = new HashSet();

    test("erroneous arg handling", () => {
      expect(set.hash()).toBeUndefined();
      expect(() => set.hash(1)).toThrow();
    });

    describe("test anagram collision", () => {
      test.each([
        ["Abc", 9],
        ["cbA", 2],
        ["tea", 8],
        ["eat", 11],
      ])(".hash(%s) == %i", (input, exp) => {
        expect(set.hash(input)).toBe(exp);
      });
      test.each([
        ["apple", 3],
        ["banana", 8],
      ])(".hash(%s) == %i", (input, exp) => {
        expect(set.hash(input)).toBe(exp);
      });
    });
  });

  describe("set(), get(), has(), length(), remove()", () => {
    const set = new HashSet();

    test("erroneous arg handling", () => {
      expect(() => set.set()).toThrow();
      expect(() => set.get()).toThrow();
      expect(() => set.has()).toThrow();
      expect(() => set.remove()).toThrow();
    });

    test("set updates length and get returns key", () => {
      set.set("apple");
      expect(set.length()).toBe(1);
      expect(set.get("apple")).toBe("apple");
      expect(set.has("apple")).toBe(true);
    });

    test("remove(key) not found", () => {
      expect(set.remove("banana")).toBe(false);
    });
    test("remove(key) successful", () => {
      expect(set.remove("apple")).toBe(true);
    });
  });

  describe("keys()", () => {
    const set = new HashSet();

    test("no existing keys", () => {
      expect(set.keys()).toMatchObject(new Array(16));
    });

    test("returns 1 existing key", () => {
      set.set("apple");
      expect(set.keys()).toContain("apple");
    });
  });
  describe("clear()", () => {
    const set = new HashSet();

    test("invokes .info when keys are already empty", () => {
      const consoleSpy = jest
        .spyOn(console, "info")
        .mockImplementation(() => {});

      set.clear();
      expect(consoleSpy).toHaveBeenCalledWith("Keys are already empty.");
    });

    test("successfully clear keys", () => {
      set.set("apple");
      expect(set.length()).toBe(1);
      set.clear();
      expect(set.length()).toBe(0);
    });
  });
});
