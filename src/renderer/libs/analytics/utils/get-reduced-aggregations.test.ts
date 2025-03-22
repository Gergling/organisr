import { getReducedAggregations } from "./get-reduced-aggregations";

describe('getReducedAggregations', () => {
  it('should add to the aggregated list if the month does not match the last aggregation', () => {
    const aggregations = getReducedAggregations([
      {
        month: 'January',
        accounts: {
          current: 1.23,
          joint: 2.34,
        },
      },
      {
        month: 'February',
        accounts: {
          current: 3.45,
          joint: 4.56,
        },
      },
    ], {
      account: 'current',
      month: 'March',
      net: 5.67,
    }, ['current', 'joint']);

    expect(aggregations).toStrictEqual([
      {
        accounts: {
          current: 1.23,
          joint: 2.34,
        },
        month: 'January',
      },
      {
        accounts: {
          current: 3.45,
          joint: 4.56,
        },
        month: 'February',
      },
      {
        accounts: {
          current: 5.67,
          joint: 0,
        },
        month: 'March',
      },
    ]);
  });
  it('should not add to the aggregated list if the month matches the last aggregation', () => {
    const aggregations = getReducedAggregations([
      {
        month: 'January',
        accounts: {
          current: 1.23,
          joint: 2.34,
        },
      },
      {
        month: 'February',
        accounts: {
          current: 3.45,
          joint: 4.56,
        },
      },
    ], {
      account: 'current',
      month: 'February',
      net: 5.67,
    }, ['current', 'joint']);

    expect(aggregations).toStrictEqual([
      {
        accounts: {
          current: 1.23,
          joint: 2.34,
        },
        month: 'January',
      },
      {
        accounts: {
          current: 9.120000000000001,
          joint: 4.56,
        },
        month: 'February',
      },
    ]);
  });
});
