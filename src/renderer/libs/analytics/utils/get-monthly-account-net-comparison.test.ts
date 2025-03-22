import { getMonthlyAccountNetComparison } from "./get-monthly-account-net-comparison";

const month1 = '2024-12';
const month2 = '2025-01';

const account1 = 'account1';
const account2 = 'account2';

describe('getMonthlyAccountNetComparison', () => {
  it('should return -1 number for ascending months', () => {
    const comparison = getMonthlyAccountNetComparison({
      account: account2,
      month: month1,
      net: 1,
    }, {
      account: account1,
      month: month2,
      net: -1,
    });
    expect(comparison).toBe(-1);
  });
  it('should return 1 for descending months', () => {
    const comparison = getMonthlyAccountNetComparison({
      account: account2,
      month: month2,
      net: 1,
    }, {
      account: account1,
      month: month1,
      net: -1,
    });
    expect(comparison).toBe(1);
  });
  it('should return -1 for equal months and ascending accounts', () => {
    const comparison = getMonthlyAccountNetComparison({
      account: account1,
      month: month1,
      net: 1,
    }, {
      account: account2,
      month: month1,
      net: -1,
    });
    expect(comparison).toBe(-1);
  });
  it('should return 1 for equal months and descending accounts', () => {
    const comparison = getMonthlyAccountNetComparison({
      account: account2,
      month: month1,
      net: 1,
    }, {
      account: account1,
      month: month1,
      net: -1,
    });
    expect(comparison).toBe(1);
  });
  it('should return 0 for equal months and equal accounts', () => {
    const comparison = getMonthlyAccountNetComparison({
      account: account2,
      month: month1,
      net: 1,
    }, {
      account: account2,
      month: month1,
      net: -1,
    });
    expect(comparison).toBe(0);
  });
});
