import { Autocomplete, TextField } from "@mui/material";
import { useTransactionCategories } from "../hooks";
import { useMemo } from "react";
import { FinancialTransactionCategory } from "../types";

type SearchOptionsProps = {
  handleCategoryChange: (category: FinancialTransactionCategory | undefined) => void;
  selectedCategoryId: number | null;
};

export const TransactionCategoriesSearchOptions = ({
  handleCategoryChange,
  // selectedCategoryId
}: SearchOptionsProps) => {
  // TODO: Highlight already selected option somehow?
  // TODO: Clearly indicate loading of categories.
  // TODO: Clearly indicate when an error occurs.
  const { categories } = useTransactionCategories();
  const options = useMemo(() => categories.map(({ path }) => path), [categories]);
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
