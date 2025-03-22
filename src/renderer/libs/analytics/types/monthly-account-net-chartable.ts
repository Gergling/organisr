export type MonthlyAccountNetChartable = {
  accounts: {
    [accountName: string]: number;
  };
  month: string;
};
