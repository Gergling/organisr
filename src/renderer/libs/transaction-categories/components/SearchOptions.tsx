import { Autocomplete, TextField } from "@mui/material";
import { useTransactionCategories } from "../hooks";
import { useMemo, useState } from "react";
import { FinancialTransactionCategory } from "../types";

type SearchOptionsProps = {
  handleCategoryChange: (category: FinancialTransactionCategory | undefined) => void;
  selectedCategoryId: number | null;
};

export const TransactionCategoriesSearchOptions = ({
  handleCategoryChange,
  selectedCategoryId
}: SearchOptionsProps) => {
  const { categories, isLoading } = useTransactionCategories();
  const [selectedCategory, setSelectedCategory] = useState<FinancialTransactionCategory | undefined>();
  const options = useMemo(() => categories.map(({ path }) => path), [categories]);
  const handleChange = (_: React.SyntheticEvent, value: string | undefined) => {
    const category = categories.find(({ path }) => path === value);
    setSelectedCategory(category);
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
