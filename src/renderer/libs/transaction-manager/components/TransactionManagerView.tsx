import { useLocation } from "react-router";
import { TransactionManagerGDrive } from "../../transaction-manager-gdrive";
import { TransactionFileUpload } from "../../transaction-file-upload";
import { TabBody, TabConfigItemProps, TabList, useTabs } from "../../../shared/tabs";

const tabs: TabConfigItemProps[] = [
  {
    element: <TransactionFileUpload />,
    index: true,
    path: '/upload',
    tabText: 'Manuél Upload',
  },
  {
    element: <TransactionManagerGDrive />,
    path: '/google-drive-download',
    tabText: 'Google Drive Download',
  },
].map((tab, idx) => ({ ...tab, idx }));

export const TransactionManagerView = () => {
  const tabData = useTabs(tabs);
  const { pathname } = useLocation();

  return (
    <div>
      <div>
        This is the view for managing transaction files.
      </div>
      <div>
        ({pathname})
      </div>
      <TabList {...tabData} />
      <TabBody {...tabData} />
    </div>
  );
};
