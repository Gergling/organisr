import { MonthlyAccountNet } from "../types";
import { getMonthlyAccountNet } from "./get-monthly-account-net"
import { mockTransactions } from "./mock-data"

const mockMonthlyAccountNet1: MonthlyAccountNet = {
  account: 'current',
  month: '2024-12',
  net: -0.01,
};
const mockMonthlyAccountNet2: MonthlyAccountNet = {
  account: 'joint',
  month: '2025-01',
  net: 36.98,
};

describe('getMonthlyAccountNets', () => {
  it('should get a monthly account net', () => {
    const monthlyAccountNets = mockTransactions.map(getMonthlyAccountNet);
    expect(monthlyAccountNets[0]).toStrictEqual(mockMonthlyAccountNet1);
    expect(monthlyAccountNets[7]).toStrictEqual(mockMonthlyAccountNet2);
  });
});
