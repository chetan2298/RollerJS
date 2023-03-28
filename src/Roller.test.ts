import { Roller } from './Roller';

describe("Smoke test", () => {
  test("The test scaffold runs successfully.", () => {
    expect(true).toBe(true);
  });
})

describe("Roller tests with 6 faces", () => {
  let roller: Roller;

  beforeEach(() => {
    roller = new Roller(6);
  });

  test("Rolling an invalid number should return 0 and not update the distribution", () => {
    const result = roller.roll(7);
    expect(result).toBe(0);
    expect(roller.last()).toBe(0);
    expect(roller.distribution().get(7)).toBeUndefined();
  });

  test("Rolling a valid number multiple times should update the last roll value", () => {
    roller.roll(4);
    roller.roll(2);
    roller.roll(6);
    expect(roller.last()).toBe(6);
    roller.roll(3);
    roller.roll(5);
    expect(roller.last()).toBe(5);
  });

  test("Rolling a valid number should not update the distribution for invalid faces", () => {
    roller.roll(0);
    roller.roll(7);
    expect(roller.distribution().get(0)).toBeUndefined();
    expect(roller.distribution().get(7)).toBeUndefined();
  });

  test("Rolling an invalid number should not update the last roll value", () => {
    roller.roll(0);
    expect(roller.last()).toBe(0);
    roller.roll(7);
    expect(roller.last()).toBe(0);
  });
})

describe("Roller tests with 3 faces", () => {
  let roller: Roller;

  beforeEach(() => {
    roller = new Roller(3);
  });

  test("distribution() returns a Map", () => {
    const distribution = roller.distribution();
    expect(distribution).toBeInstanceOf(Map);
  });

  test("distribution() returns a Map with the correct keys", () => {
    const distribution = roller.distribution();
    expect(distribution.has(1)).toBe(true);
    expect(distribution.has(2)).toBe(true);
    expect(distribution.has(3)).toBe(true);
  });

  test("distribution() returns a Map with initial values of 0", () => {
    const distribution = roller.distribution();
    expect(distribution.get(1)).toBe(0);
    expect(distribution.get(2)).toBe(0);
    expect(distribution.get(3)).toBe(0);
  });

  test("distribution() returns a Map with updated values after rolls", () => {
    roller.roll(1);
    roller.roll(3);
    roller.roll(1);
    roller.roll(3);
    roller.roll(3);
    roller.roll(3);
    const distribution = roller.distribution();
    expect(distribution.get(1)).toBe(2);
    expect(distribution.get(2)).toBe(0);
    expect(distribution.get(3)).toBe(4);
  });
});