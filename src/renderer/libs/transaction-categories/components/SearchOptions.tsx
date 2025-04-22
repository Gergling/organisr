import { Autocomplete, TextField } from "@mui/material";
import { useTransactionCategories } from "../hooks";
import { useMemo } from "react";
import { FinancialTransactionCategory } from "../types";

type SearchOptionsProps = {
  handleCategoryChange: (category: FinancialTransactionCategory | undefined) => void;
  selectedCategoryId: number | null;
};

const getOptions = (
  categories: FinancialTransactionCategory[],
  selectedCategoryId: number | null
) => {
  if (selectedCategoryId !== null) {
    const selectedOptions: string[] = [];
    const options: string[] = [];

    categories.forEach(({ data: { id }, path }) => {
      if (id === selectedCategoryId) {
        selectedOptions.push(path);
      } else {
        options.push(path);
      }
    });

    return [
      ...selectedOptions,
      '(Decategorise)',
      ...options,
    ];
  }
  
  return ['(Uncategorised)', ...categories.map(({ path }) => path)];
};

export const TransactionCategoriesSearchOptions = ({
  handleCategoryChange,
  selectedCategoryId
}: SearchOptionsProps) => {
  // TODO: Clearly indicate loading of categories.
  // TODO: Clearly indicate when an error occurs.
  const { categories } = useTransactionCategories();
  const options = useMemo(() => getOptions(categories, selectedCategoryId), [categories, selectedCategoryId]);
  const handleChange = (_: React.SyntheticEvent, value: string | undefined) => {
    const category = categories.find(({ path }) => path === value);
    handleCategoryChange(category);
    console.log(value);
  };
  return (
    <Autocomplete
      onChange={handleChange}
      options={options}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};
