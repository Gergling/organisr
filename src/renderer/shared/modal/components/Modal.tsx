import { Box, Modal as BaseModal } from "@mui/material"

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Modal = ({
  children,
  onClose,
  open,
}: ModalProps) => <BaseModal
  open={open}
  onClose={onClose}
>
  <Box sx={style} component="form">
    {children}
  </Box>
</BaseModal>;
