import { useState } from "react";
import { FinancialAccountsModelProps } from "../../../../database/financial";
import { useAccountsIPC } from "../hooks";
import { EditAccountModal } from "./EditModal";
import { Button } from "@mui/material";
import { FinancialAccountsModelValueProps } from "../types";

const List = ({ accounts }: { accounts: FinancialAccountsModelProps[] }) => {
  return (
    <ul>
      {accounts.map(({ name }, i) => <li key={i}>{name}</li>)}
    </ul>
  )
};

export const AccountsView = () => {
  const { allAccounts, create } = useAccountsIPC();
  const [ isCreateModalOpen, setIsCreateModalOpen ] = useState<boolean>(false);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleSaveCreateModal = (data: FinancialAccountsModelValueProps) => {
    create(data);
    handleCloseCreateModal();
  }
  return (
    <>
      <Button onClick={handleOpenCreateModal}>Create</Button>
      <EditAccountModal
        onCancel={handleCloseCreateModal}
        onSave={handleSaveCreateModal}
        open={isCreateModalOpen}
      />
      <div>
        { allAccounts && allAccounts.length > 0 ? <List accounts={allAccounts} /> : <>No accounts!</>}
      </div>
    </>
  );
};
