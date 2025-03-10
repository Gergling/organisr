import { TransactionManagerView } from "../../../libs/transaction-manager";

export const FinanceView = () => {
  return (
    <div>
      Things to go on the finance view:
      <ul>
        <li>Overview (the landing page)</li>
        <li>Transaction Manager (basically uploads)</li>
        <li>Analytics, e.g. month-on-month growth, financial category breakdown for biggest leaf categories, etc</li>
      </ul>
      <TransactionManagerView />
    </div>
  );
};
