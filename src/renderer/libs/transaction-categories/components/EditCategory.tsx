import { Button, TextField } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import { FinancialTransactionCategoriesModelProps } from "../../../../database/financial";
import { Dropdown } from "../../../shared/dropdown";
import { Category } from "../types/category";

type EditCategoryProps = {
  categories: Category[];
  categoryId?: number;
  onCancel: () => void;
  onSave: (categoryData: FinancialTransactionCategoriesModelProps) => void;
};

export const EditCategory = ({
  categories,
  categoryId,
  onCancel,
  onSave,
}: EditCategoryProps) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryParent, setCategoryParent] = useState<number | undefined>(undefined);
  const parentOptions = useMemo(
    () => categories.map(({ data: { name } }) => name),
    [categories],
  );

  const handleCategorySelection = (
    idx: number
  ) => setCategoryParent(categories[idx].data.id);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };
  const handleSave = () => {
    console.log('saving', categoryName)
    onSave({ name: categoryName, parent_id: categoryParent, id: categoryId });
  };

  return (
    <>
      <TextField
        label="Outlined"
        variant="outlined"
        value={categoryName}
        onChange={handleChange}
      />
      <Dropdown
        options={parentOptions}
        onSelect={handleCategorySelection}
      />
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>
    </>
  );
};
