import { getTransactionMonthGroupFromTransaction } from "./get-transaction-month-group-from-transaction";
import { mockTransaction } from "./mock-data";

describe('getTransactionMonthGroupFromTransaction', () => {
  test('should do the things', () => {
    const transaction = {
      ...mockTransaction,
      credit: 1,
      net: 1,
    };
    const group = getTransactionMonthGroupFromTransaction(transaction);

    expect(group.month).toBe(2);
    expect(group.transactions).toBe([transaction]);
  });
});