import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { EditAccountProps } from "../types";

export const EditAccount = ({
  accountId,
  initialName = '',
  onCancel,
  onSave,
}: EditAccountProps) => {
  const [name, setName] = useState(initialName);

  const handleNameChange = ({ target: { value }}: ChangeEvent<HTMLInputElement>) => {
    setName(value);
  };
  const handleRevert = () => {
    setName(initialName);
  };
  const handleSave = () => {
    onSave({ name }, accountId);
  };

  return (
    <>
      <TextField
        label="Category Name"
        value={name}
        onChange={handleNameChange}
      />
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={handleRevert}>Revert</Button>
      <Button onClick={handleSave}>Save</Button>
    </>
  );
};
