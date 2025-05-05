import { useState } from "react";
import { FinancialAccountsFetchProps, FinancialAccountsModelProps } from "../../../../database/financial";
import { useAccountsIPC } from "../hooks";
import { EditAccountModal } from "./EditModal";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { FinancialAccountsModelValueProps } from "../types";

type RowProps = {
  account: FinancialAccountsFetchProps;
  handleOpenEditModal: (account: FinancialAccountsModelProps) => void;
}

const Row = ({
  account,
  handleOpenEditModal,
}: RowProps) => {
  const { count_transactions, id, name } = account;
  const { remove } = useAccountsIPC();
  const handleDelete = () => remove(id);
  const handleEdit = () => handleOpenEditModal(account);

  return <TableRow>
    <TableCell>{name}</TableCell>
    <TableCell>({count_transactions} transaction(s))</TableCell>
    <TableCell><Button onClick={handleEdit}>Edit</Button></TableCell>
    <TableCell><Button onClick={handleDelete}>Delete</Button></TableCell>
  </TableRow>
}

const List = ({ accounts }: { accounts: FinancialAccountsFetchProps[] }) => {
  const [editModalAccount, setEditModalAccount] = useState<FinancialAccountsModelProps | undefined>();
  const isEditModalOpen = !!editModalAccount;
  const { update } = useAccountsIPC();
  const handleCloseEditModal = () => setEditModalAccount(undefined);
  const handleOpenEditModal = (account: FinancialAccountsModelProps) => setEditModalAccount(account);
  const handleSaveEditModal = (
    data: FinancialAccountsModelValueProps,
    id: number
  ) => {
    update({ id, ...data });
    handleCloseEditModal();
  };

  return (
    <>
      <EditAccountModal
        accountId={editModalAccount?.id}
        initialName={editModalAccount?.name}
        onCancel={handleCloseEditModal}
        onSave={handleSaveEditModal}
        open={isEditModalOpen}
      />
      <Table>
        <TableBody>
          {accounts.map((account, i) => <Row
            account={account}
            handleOpenEditModal={handleOpenEditModal}
            key={i}
          />)}
        </TableBody>
      </Table>
    </>
  )
};

export const AccountsView = () => {
  const { allAccounts, create, isPending } = useAccountsIPC();
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
        {isPending && <>Loading accounts...</>}
        {allAccounts && allAccounts.length > 0 ? <List accounts={allAccounts} /> : <>No accounts!</>}
      </div>
    </>
  );
};
