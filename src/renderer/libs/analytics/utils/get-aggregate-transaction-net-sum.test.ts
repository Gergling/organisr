import { MonthlyAccountNet } from "../types";
import { MonthlyAccountNetChartable } from "../types/monthly-account-net-chartable";
import { getAggregateTransactionNetSum } from "./get-aggregate-transaction-net-sum";

const mockCurrentTransaction: MonthlyAccountNet = {
  account: 'current',
  month: '2024-01',
  net: -1.23,
};

const mockAggregation: MonthlyAccountNetChartable = {
  accounts: {
    current: 2.46,
    joint: 3.69,
    unknown: 4.81,
  },
  month: '2024-01',
};

describe('getAggregateTransactionNetSum', () => {
  // TODO: From scratch
  it('should add to the current account', () => {
    const aggregation = getAggregateTransactionNetSum(
      mockCurrentTransaction,
      ['current', 'joint', 'unknown'],
      mockAggregation
    );
    expect(aggregation).toStrictEqual({
      accounts: {
        current: 1.23,
        joint: 3.69,
        unknown: 4.81,
      },
      month: '2024-01',
    });
  });
});
