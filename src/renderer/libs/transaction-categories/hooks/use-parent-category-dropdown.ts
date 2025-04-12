import { useCallback, useMemo, useState } from "react";
import { Category } from "../types";
import { getCategoryDescendants, getCategoryFindFactory } from "../utils";

type DropdownParentCategory = {
  category?: Category;
  label: string;
  root: boolean;
}

const useParentCategoryDropdownEdit = (
  categories: Category[],
  category: Category | undefined,
) => {
  const initialParentCategory = useMemo(
    () => category && category.data.parent_id !== undefined
      ? categories.find(getCategoryFindFactory(category.data.parent_id))
      : undefined,
    [categories, category, getCategoryFindFactory],
  );
  const descendants: Category[] = useMemo(
    () => category ? getCategoryDescendants(category, categories) : [],
    [categories, category, getCategoryDescendants],
  );

  const getIsValidCategory = useCallback(
    (categoryId: number) => category && [
      // Filter the current category from the options. It cannot be a parent of itself.
      category.data.id === categoryId,

      // Filter all descendants. We can't assign the category as a descendant of itself.
      descendants.find(getCategoryFindFactory(categoryId)),

      // Filter the parent. That *should* already appear at the top of the list.
      initialParentCategory?.data.id === categoryId,
    ].filter(Boolean).length > 0,
    [category, descendants, getCategoryFindFactory, initialParentCategory],
  );

  const initialParentCategories = useMemo(() => {
    const initialParentCategories: DropdownParentCategory[] = [];
    if (initialParentCategory) {
      initialParentCategories.push({
        category: initialParentCategory,
        label: initialParentCategory.path,
        root: !initialParentCategory.data.parent_id
      });
    }
    return [
      ...initialParentCategories,
      { label: '(Root)', root: true },
    ];
  }, [initialParentCategory]);

  return {
    getIsValidCategory,
    initialParentCategories,
    initialParentCategory,
  }
};

export const useParentCategoryDropdown = (
  categories: Category[],
  category: Category | undefined, // Undefined if we're adding a new one.
) => {
  const {
    getIsValidCategory,
    initialParentCategories,
    initialParentCategory,
  } = useParentCategoryDropdownEdit(categories, category);
  const [selectedParentCategory, setSelectedParentCategory] = useState<Category | undefined>(initialParentCategory);
  const dropdownCategories = useMemo(
    () => categories
      .sort((a, b) => a.path.localeCompare(b.path))
      .reduce((options, currentCategory) => {
        const { data: { id } } = currentCategory;

        if (getIsValidCategory(id)) {
          return options;
        }

        return [
          ...options,
          { category: currentCategory, label: currentCategory.path, root: false },
        ];
      }, initialParentCategories),
    [categories, category, initialParentCategory],
  );

  const parentCategoryOptions = useMemo(
    () => dropdownCategories.map(({ label }) => label),
    [dropdownCategories],
  );

  const handleParentCategorySelection = (
    idx: number
  ) => {
    const { category } = dropdownCategories[idx];
    console.log('selected category', category)
    setSelectedParentCategory(category);
  };

  return {
    handleParentCategorySelection,
    parentCategoryOptions,
    selectedParentCategory,
  };
};
