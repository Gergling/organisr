import { getTransactionListAggregate } from "./get-transaction-list-aggregate";
import { mockTransaction } from "./mock-data";

describe('getTransactionListAggregate', () => {
  test('should sum the content of the aggregate and transaction', () => {
    const aggregate = getTransactionListAggregate({
      count: 2,
      credit: 3,
      debit: 4,
      net: -1,
    }, {
      ...mockTransaction,
      credit: 5,
      debit: 6,
      net: -1,
    });

    expect(aggregate.count).toBe(3);
    expect(aggregate.credit).toBe(8);
    expect(aggregate.debit).toBe(10);
    expect(aggregate.net).toBe(-2);
  });

  test('should handle undefined credits', () => {
    const aggregate = getTransactionListAggregate({
      count: 2,
      credit: 3,
      debit: 4,
      net: -1,
    }, {
      ...mockTransaction,
      debit: 6,
      net: -6,
    });

    expect(aggregate.count).toBe(3);
    expect(aggregate.credit).toBe(3);
    expect(aggregate.debit).toBe(10);
    expect(aggregate.net).toBe(-7);
  });

  test('should handle undefined debits', () => {
    const aggregate = getTransactionListAggregate({
      count: 2,
      credit: 3,
      debit: 4,
      net: -1,
    }, {
      ...mockTransaction,
      credit: 6,
      net: 6,
    });

    expect(aggregate.count).toBe(3);
    expect(aggregate.credit).toBe(9);
    expect(aggregate.debit).toBe(4);
    expect(aggregate.net).toBe(5);
  });
});
