import { DatasetType } from '@mui/x-charts/internals';
import { LineChart, LineChartProps } from '@mui/x-charts/LineChart';
import { FinancialTransactionsModelProps } from '../../../../database/financial/transactions';
import { getMonthlyAccountNetsAggregation } from '../utils';
import { useQueryTransactions } from '../../transaction-data';

const colors = [
  'blue',
  'yellow',
  'purple',
  'grey',
];

const stackStrategy = {
  stack: 'total',
  area: true,
  stackOffset: 'none',
} as const;

const customize = {
  height: 300,
  margin: { top: 5 },
};

const useMonthlyGrowthChart = (
  transactions: FinancialTransactionsModelProps[]
): LineChartProps => {
  const accounts: string[] = [...new Set(transactions.map(({ account_temporary }) => account_temporary))];
  const monthlyData = getMonthlyAccountNetsAggregation(transactions);
  const months: string[] = [];

  const dataset: DatasetType = [];
  const xAxis: LineChartProps['xAxis'] = [
    {
      dataKey: 'idx',
      valueFormatter: (value) => months[value] || '',
    },
  ];
  const series: LineChartProps['series'] = accounts.map((accountName, idx) => ({
    dataKey: accountName,
    label: accountName,
    color: colors[idx],
    showMark: false,
    ...stackStrategy,
  }));

  monthlyData.forEach(({ accounts, month }, idx) => {
    dataset.push({
      ...accounts,
      idx
    });
    months.push(month);
  });

  return {
    dataset,
    series,
    xAxis,
  };
};

export const MonthlyGrowthChart = () => {
  const { transactions } = useQueryTransactions();
  const chartProps = useMonthlyGrowthChart(transactions);

  return (
    <LineChart
      {...chartProps}
      {...customize}
    />
  );
};
