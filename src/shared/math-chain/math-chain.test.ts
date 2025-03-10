import { mathChain } from "./math-chain";

describe('mathChain', () => {
  test('#get returns the number assigned to the instantiation', () => {
    const expected = 2;
    const actual = mathChain(expected).get();
    expect(actual).toBe(expected);
  });
});
