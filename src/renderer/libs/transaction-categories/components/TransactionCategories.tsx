import { Button } from "@mui/material";
import { useMemo, useState } from "react";
import { useTransactionCategories, useTransactionCategoryDelete } from "../hooks";
import {
  FinancialTransactionCategoriesModelInsertionProps,
  FinancialTransactionCategoriesModelProps
} from "../types";
import { EditCategoryModal } from "./EditCategoryModal";

type ModalState = {
  type: 'closed' | 'create',
} | {
  type: 'edit',
  categoryId: number;
};

export const TransactionCategories = () => {
  const [modalState, setModalState] = useState<ModalState>({ type: 'closed' });

  const {
    categories,
    create,
    refetch,
    update,
    // TODO: This should probably be multiple separate hooks, clearly labelled with CRUD operations
    // and that way we can have a hook which manages the state of this component.
  } = useTransactionCategories();
  const { remove } = useTransactionCategoryDelete();
  const modalOpen = useMemo(() => modalState.type !== 'closed', [modalState]);
  const categoryId: number | undefined = useMemo(
    () => modalState.type === 'edit' ? modalState.categoryId : undefined,
    [modalState]
  );

  const handleDeleteFactory = (categoryId: number) => async () => {
    console.log('handleDeleteFactory', categoryId)
    try {
      await remove(categoryId);
    } catch (error) {
      console.error(error);
      throw error;
    }
    refetch();
  };

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
        await create([categoryData]);
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
      <EditCategoryModal
        categories={categories}
        categoryId={categoryId}
        open={modalOpen}
        onCancel={handleModalClose}
        onSave={handleSave}
      />
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
                  <Button onClick={handleDeleteFactory(id)}>Delete</Button>
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </>
  );
};
