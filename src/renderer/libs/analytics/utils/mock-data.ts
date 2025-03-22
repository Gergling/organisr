// TODO: This could probably be its own library.

import { FinancialTransactionModelProps } from "../../../../database/financial/transactions";

const LARGEST_POSSIBLE_PRIME = 9007199254740881; // Apparently
const ROOT_PRIME = Math.sqrt(LARGEST_POSSIBLE_PRIME);

const mockAccounts = [
  'current',
  'joint',
];
const mockDates = [
  '2024-12-31',
  '2025-01-01',
];
const mockNetMultipliers = [-1, 1];

type NumberGenProps = {
  minimum?: number;
  maximum?: number;
};

const mockData = mockAccounts.reduce((acc, mockAccount) => {
  mockDates.forEach((mockDate) => {
    mockNetMultipliers.forEach((mockNetMultiplier) => {
      acc.push([mockAccount, mockDate, mockNetMultiplier]);
    });
  });
  return acc;
}, [] as (string | number)[][]);

const numberGen = ({
  minimum = 0,
  maximum = 1,
}: NumberGenProps, x: number): number => {
  // We calculate a range so that we can generate
  // our number on a scale from 0.
  const range = maximum - minimum;

  // This will generate non-linear numbers
  const powerUpPrime = Math.pow(x, 2) % LARGEST_POSSIBLE_PRIME;
  const multiplyPrime = x * ROOT_PRIME % LARGEST_POSSIBLE_PRIME;
  const nonLinear = ((powerUpPrime + multiplyPrime + x) * range) % LARGEST_POSSIBLE_PRIME;

  return (nonLinear % range) + minimum;
};

const currencyGen = (n: number) => Math.round(n * 100) / 100;

export const mockTransactions: FinancialTransactionModelProps[] = mockData.map(([
  account_temporary,
  date,
  mockNetMultiplier,
], idx) => ({
  account_temporary: account_temporary as string,
  date: date as string,
  description: `Description ${idx}`,
  meta: `meta:${idx},meta2:${idx * 2}`,
  net: currencyGen(numberGen({
    maximum: 100,
    minimum: 0.01, // default
  }, idx) * (mockNetMultiplier as number)),
}));
