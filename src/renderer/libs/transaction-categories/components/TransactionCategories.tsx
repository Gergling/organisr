import { Box, Button, Modal } from "@mui/material";
import { useMemo, useState } from "react";
import { useTransactionCategories } from "../hooks";
import {
  FinancialTransactionCategoriesModelInsertionProps,
  FinancialTransactionCategoriesModelProps
} from "../types";
import { EditCategory } from "./EditCategory";

type ModalState = {
  type: 'closed' | 'create',
} | {
  type: 'edit',
  categoryId: number;
};

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
  const [modalState, setModalState] = useState<ModalState>({ type: 'closed' });
  const {
    addFinancialTransactionCategories,
    update,
    categories,
    refetch,
  } = useTransactionCategories();
  const modalOpen = useMemo(() => modalState.type !== 'closed', [modalState]);
  const categoryId: number | undefined = useMemo(
    () => modalState.type === 'edit' ? modalState.categoryId : undefined,
    [modalState]
  );

  const handleModalClose = () => setModalState({ type: 'closed' });
  const handleModalCreate = () => setModalState({ type: 'create' });
  const handleModalEditFactory = (
    categoryId: number
  ) => () => setModalState({ type: 'edit', categoryId });

  const handleSave = async (
    categoryData: FinancialTransactionCategoriesModelInsertionProps | FinancialTransactionCategoriesModelProps
  ) => {
    try {
      if (!categoryData.forInsertion) {
        await update(categoryData);
      } else {
        await addFinancialTransactionCategories([categoryData]);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    handleModalClose();
    refetch();
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
      >
        <Box sx={style} component="form">
          <EditCategory
            categoryId={categoryId}
            categories={categories}
            onCancel={handleModalClose}
            onSave={handleSave}
          />
        </Box>
      </Modal>
      <Button onClick={handleModalCreate}>Create</Button>
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
                  <Button onClick={handleModalEditFactory(id)}>Edit</Button>
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </>
  );
};
