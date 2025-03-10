// import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export const keyToLabel: { [key: string]: string } = {
  coal: 'Electricity from coal (TWh)',
  gas: 'Electricity from gas (TWh)',
  oil: 'Electricity from oil (TWh)',
  nuclear: 'Electricity from nuclear (TWh)',
  hydro: 'Electricity from hydro (TWh)',
  wind: 'Electricity from wind (TWh)',
  solar: 'Electricity from solar (TWh)',
  bio: 'Electricity from bioenergy (TWh)',
  other: 'Other renewables excluding bioenergy (TWh)',
};

export const colors: { [key: string]: string } = {
  other: 'lightgray',
  bio: 'lightgreen',
  solar: 'yellow',
  wind: 'lightblue',
  hydro: 'blue',
  nuclear: 'orange',
  oil: 'darkgrey',
  gas: 'gray',
  coal: 'black',
};

export const worldElectricityProduction = [
  {
    country: 'World',
    year: 1985,
    other: 0,
    bio: 0,
    solar: 0.011747475,
    wind: 0.064220205,
    hydro: 1979.2446,
    nuclear: 1488.9216,
    oil: 1110.7847,
    gas: 1426.3086,
    coal: 3748.3848,
  },
];

const stackStrategy = {
  stack: 'total',
  area: true,
  stackOffset: 'none', // To stack 0 on top of others
} as const;

const customize = {
  height: 300,
  legend: { hidden: true },
  margin: { top: 5 },
};

export const MonthlyGrowthChart = () => {
  return (
    <LineChart
      xAxis={[
        {
          dataKey: 'year',
          valueFormatter: (value) => value.toString(),
          min: 1985,
          max: 2022,
        },
      ]}
      series={Object.keys(keyToLabel).map((key) => ({
        dataKey: key,
        label: keyToLabel[key],
        color: colors[key],
        showMark: false,
        ...stackStrategy,
      }))}
      dataset={worldElectricityProduction}
      {...customize}
    />
  );

}
