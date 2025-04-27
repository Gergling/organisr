import { AnalyticsView } from "../libs/analytics";
import { TransactionBreakdown } from "../libs/transaction-breakdown";
import { TransactionCategories } from "../libs/transaction-categories";
import { TransactionFileUpload } from "../libs/transaction-file-upload";
import { TransactionManagerView } from "../libs/transaction-manager";
import { TransactionManagerGDrive } from "../libs/transaction-manager-gdrive";
import { getRouting } from "../shared/tab-views";
import { FinanceView } from "../views/finance";

export const routing = getRouting({
  tabs: [
    {
      element: <>The root landing page is a bit dull, isn't it...</>,
      path: '',
      tabText: 'Home',
    },
    {
      element: <FinanceView />,
      path: 'finance',
      tabText: 'Finance',
      children: {
        tabs: [
          {
            element: <>Oh! Ver view.</>,
            path: 'overview',
            tabText: 'Overview',
          },
          {
            element: <TransactionManagerView />,
            path: 'transactions',
            tabText: 'Transactions',
            children: {
              tabs: [
                {
                  element: <TransactionFileUpload />,
                  path: 'upload',
                  tabText: 'Manuél Upload',
                },
                {
                  element: <>Manuél Entry</>,
                  path: 'entry',
                  tabText: 'Manual Entry',
                },
                {
                  element: <TransactionBreakdown />,
                  path: 'breakdown',
                  tabText: 'List',
                },
                {
                  element: <TransactionManagerGDrive />,
                  path: 'google-drive-download',
                  tabText: 'Google Drive Download',
                },
              ],
            },
          },
          {
            element: <TransactionCategories />,
            path: 'categories',
            tabText: 'Categories',
          },
          {
            element: <AnalyticsView />,
            path: 'analytics',
            tabText: 'Analytics',
          },
        ]
      }
    },
  ]
});
