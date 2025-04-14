import { Button, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { FinancialTransactionCategoriesModelInsertionProps, FinancialTransactionCategoriesModelProps } from "../../../../database/financial";
import { Dropdown } from "../../../shared/dropdown";
import { useParentCategoryDropdown } from "../hooks";
import { getCategoryFindFactory } from "../utils";
import { FinancialTransactionCategory } from "../types";

type Model = FinancialTransactionCategoriesModelProps |
  FinancialTransactionCategoriesModelInsertionProps;

type EditCategoryProps = {
  categories: FinancialTransactionCategory[];
  categoryId?: number;
  onCancel: () => void;
  onSave: (categoryData: Model) => void;
};

export const EditCategory = ({
  categories,
  categoryId,
  onCancel,
  onSave,
}: EditCategoryProps) => {
  const [categoryName, setCategoryName] = useState('');
  const category = useMemo(
    () => categoryId ? categories.find(getCategoryFindFactory(categoryId)) : undefined,
    [categories, categoryId]
  );
  const {
    handleParentCategorySelection,
    parentCategoryOptions,
    selectedParentCategory,
  } = useParentCategoryDropdown(categories, category);

  const handleCategoryNameChange = ({ target: { value }}: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(value);
  };
  const handleRevert = () => {
    // Reset everything to props, I guess.
  };
  const handleSave = () => {
    console.log('saving', categoryName)
    const forInsertion = typeof categoryId === 'undefined';
    const parent_id = selectedParentCategory?.data.id;
    const baseCategoryData = { name: categoryName, parent_id };
    const extendedCategoryData = forInsertion
      ? { forInsertion }
      : { forInsertion, id: categoryId };
    onSave({ ...baseCategoryData, ...extendedCategoryData });
  };

  useEffect(() => {
    if (category) {
      setCategoryName(category.data.name);
    }
  }, [category])

  return (
    <>
      <TextField
        label="Category Name"
        // variant="outlined"
        value={categoryName}
        onChange={handleCategoryNameChange}
      />
      <Dropdown
        options={parentCategoryOptions}
        onSelect={handleParentCategorySelection}
      />
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={handleRevert}>Revert</Button>
      <Button onClick={handleSave}>Save</Button>
    </>
  );
};
