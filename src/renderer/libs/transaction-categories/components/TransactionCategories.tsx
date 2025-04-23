import { Button } from "@mui/material";
import { useMemo, useState } from "react";
import { useTransactionCategories } from "../hooks";
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
    create,
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
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </>
  );
};
