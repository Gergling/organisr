import { getMonthlyAccountNetsAggregation } from "./get-monthly-account-nets-aggregation";
import { mockTransactions } from "./mock-data";

describe('getMonthlyAccountNets', () => {
  it('returns transactions nets aggregated by month and account', () => {
    const aggregations = getMonthlyAccountNetsAggregation(mockTransactions);
    expect(aggregations).toStrictEqual([
      {
        accounts: {
          current: 62.42,
          joint: -37.58,
        },
        month: '2024-12',
      },
      {
        accounts: {
          current: 62.42,
          joint: -37.57,
        },
        month: '2025-01',
      },
    ]);
  });
});
