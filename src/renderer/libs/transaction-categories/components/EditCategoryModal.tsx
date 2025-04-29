import {
  FinancialTransactionCategoriesModelInsertionProps,
  FinancialTransactionCategoriesModelProps
} from "../../../../database/financial";
import { Modal } from "../../../shared/modal";
import { FinancialTransactionCategory } from "../types";
import { EditCategory } from "./EditCategory";

type Model = FinancialTransactionCategoriesModelProps |
  FinancialTransactionCategoriesModelInsertionProps;

type EditCategoryModalProps = {
  categories: FinancialTransactionCategory[];
  categoryId?: number;
  initialCategoryName?: string;
  onCancel: () => void;
  onSave: (categoryData: Model) => void;
  open: boolean;
}

export const EditCategoryModal = ({
  categories,
  categoryId,
  initialCategoryName = '',
  onCancel,
  onSave,
  open,
}: EditCategoryModalProps) => <Modal
  open={open}
  onClose={onCancel}
>
  <EditCategory
    categoryId={categoryId}
    categories={categories}
    initialCategoryName={initialCategoryName}
    onCancel={onCancel}
    onSave={onSave}
  />
</Modal>;
