generate(({
  numberGen,
  multiMap,
}) => {
  const mockAccounts = [
    'current',
    'joint',
  ];
  const mockDates = [
    '2024-12-31',
    '2025-01-01',
  ];
  const mockNetMultipliers = [-1, 1];
  const mockTransactions: FinancialTransactionModelProps[] = multiMap<[
    string,
    number,
    string
  ]>([
    mockDates,
    mockNetMultipliers,
    mockAccounts,
  ], ([
    date,
    mockNetMultiplier,
    account_temporary,
  ], idx) => {
    return {
      account_temporary,
      date,
      description: `Description ${idx}`,
      meta: `meta:${idx},meta2:${idx * 2}`,
      net: numberGen({
        maximum: 100,
        // minimum: 0, // default
      }) * mockNetMultiplier,
    };
  });

  return mockTransactions;
});
