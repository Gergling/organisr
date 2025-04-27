import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { FinancialTransactionCategoriesModelInsertionProps } from "../../../../database/financial";
import { FinancialTransactionCategory } from "../types";
import { useTransactionCategories, useTransactionCategoryCreation } from "../hooks";
import { EditCategoryModal } from "./EditCategoryModal";

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
  const {
    categories,
    refetch,
  } = useTransactionCategories();
  const {
    create,
    newCategories,
  } = useTransactionCategoryCreation();

  const options = useMemo(() => getOptions(categories, selectedCategoryId), [categories, selectedCategoryId]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const handleChange = (_: React.SyntheticEvent, value: string | undefined) => {
    const category = categories.find(({ path }) => path === value);
    handleCategoryChange(category);
    console.log(value);
  };
  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleSave = async (newCategory: FinancialTransactionCategoriesModelInsertionProps) => {
    handleModalClose();
    create([newCategory]);
  };
  const handleSearchTextChange = (_: React.SyntheticEvent, value: string) => {
    setSearchText(value);
  };

  useEffect(() => {
    console.log('new categories', newCategories)
    if (newCategories && newCategories.length > 0) {
      const [newCategory] = newCategories;
      handleCategoryChange(newCategory);
      setSearchText(newCategory.data.name);
      refetch();
    }
  }, [newCategories]);

  return (
    <>
      <EditCategoryModal
        categories={categories}
        initialCategoryName={searchText}
        open={modalOpen}
        onCancel={handleModalClose}
        onSave={handleSave}
      />
      <Autocomplete
        inputValue={searchText}
        noOptionsText={(
          <Box display="flex" justifyContent="space-between" alignItems="center">
            Not found
            <Button
              variant="outlined"
              color="primary"
              onMouseDown={handleModalOpen}
            >
              Add
            </Button>
          </Box>
        )}
        onChange={handleChange}
        onInputChange={handleSearchTextChange}
        options={options}
        renderInput={(params) => <TextField {...params} />}
      />
    </>
  );
};
