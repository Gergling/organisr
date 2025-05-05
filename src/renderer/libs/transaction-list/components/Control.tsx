import { Button } from "@mui/material";
import { useMemo } from "react";
import { FinancialTransactionModelFetchMappingProps } from "../../../../database/financial";

type ControlProps = {
  children: React.ReactNode;
  getButtonText: (transaction: FinancialTransactionModelFetchMappingProps | undefined) => string;
  handleEditState: (state: boolean) => void;
  isEditing: boolean;
  onDone: () => void;
  transaction: FinancialTransactionModelFetchMappingProps;
};

export const Control = ({
  children,
  getButtonText,
  handleEditState,
  isEditing,
  onDone,
  transaction,
}: ControlProps) => {
  const handleClose = () => handleEditState(false);
  const handleOpen = () => handleEditState(true);
  const handleDone = () => {
    onDone();
    handleClose();
  };
  const buttonText = useMemo(() => getButtonText(transaction), [getButtonText, transaction]);

  return (
    <>
      {(
        isEditing
          ? <>
              {children}
              <Button onClick={handleDone}>Done</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </>
          : <Button onClick={handleOpen}>{buttonText}</Button>
      )}
    </>
  );
};
