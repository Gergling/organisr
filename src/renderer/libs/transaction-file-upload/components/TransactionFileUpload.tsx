import { FileUpload } from "@mui/icons-material";
import { Button, styled, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useTransactionFileUpload } from "../hooks";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const TransactionFileUpload = () => {
  const { allAccountTransactions, getHandlePickFiles } = useTransactionFileUpload();

  return (
    <>
      <Table>
        <TableBody>
          {allAccountTransactions.map(({ account: { id, name }, aggregation, transactions }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>
                {aggregation ? (`${transactions.length} transactions from ${aggregation.earliest} to ${aggregation.latest}`) : 'No transactions'}
              </TableCell>
              <TableCell>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                >
                  <FileUpload />
                  <VisuallyHiddenInput
                    type="file"
                    onChange={getHandlePickFiles(id)}
                    multiple
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
