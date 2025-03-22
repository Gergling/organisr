import { getAccountNetBreakdownSum } from "./get-account-net-breakdown-sum";

describe('getAccountNetBreakdownSum', () => {
  it('sums', () => {
    expect(getAccountNetBreakdownSum({
      month: 'a',
      accounts: {
        current: 0.1,
        joint: -1.2,
        unknown: 2.3,
      },
    }, {
      month: 'b',
      accounts: {
        current: -3.4,
        joint: 4.5,
        unknown: -5.6,
      },
    }, ['current', 'joint', 'unknown'])).toStrictEqual({
      month: '',
      accounts: {
        current: -3.3,
        joint: 3.3,
        unknown: -3.3,
      },
    });
  });
});
