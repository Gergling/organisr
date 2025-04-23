import { Box, Modal } from "@mui/material"
import { EditCategory } from "./EditCategory";
import { FinancialTransactionCategory } from "../types";
import {
  FinancialTransactionCategoriesModelInsertionProps,
  FinancialTransactionCategoriesModelProps
} from "../../../../database/financial";

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
  <Box sx={style} component="form">
    <EditCategory
      categoryId={categoryId}
      categories={categories}
      initialCategoryName={initialCategoryName}
      onCancel={onCancel}
      onSave={onSave}
    />
  </Box>
</Modal>;
