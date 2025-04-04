import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { FinancialTransactionCategoriesModelProps } from "../../../../database/financial";
import { useTransactionCategories } from "../hooks";
import { EditCategory } from "./EditCategory";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const TransactionCategories = () => {
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const {
    addFinancialTransactionCategories,
    categories,
    refetch,
  } = useTransactionCategories();

  const handleCreateModalOpen = () => setCreateModalIsOpen(true);
  const handleCreateModalClose = () => setCreateModalIsOpen(false);
  const handleSave = (
    categoryData: FinancialTransactionCategoriesModelProps
  ) => addFinancialTransactionCategories([categoryData]).then(() => {
    handleCreateModalClose();
    refetch();
  });

  return (
    <>
      <Modal
        open={createModalIsOpen}
        onClose={handleCreateModalClose}
      >
        <Box sx={style} component="form">
          <EditCategory
            categories={categories}
            onCancel={handleCreateModalClose}
            onSave={handleSave}
          />
        </Box>
      </Modal>
      <Button onClick={handleCreateModalOpen}>Create</Button>
      <div>
        {categories.length === 0
          ? <>No categories</>
          : (
            <ul>
              {categories.map(({
                data: {
                  id,
                  parent_id
                },
                path
              }) => (
                <li key={id}>
                  ({id})
                  {parent_id}:
                  {path}
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </>
  );
};
