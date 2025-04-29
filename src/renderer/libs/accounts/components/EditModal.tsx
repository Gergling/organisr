import { Modal } from "../../../shared/modal";
import { EditAccountProps } from "../types";
import { EditAccount } from "./Edit";

type EditAccountModalProps = EditAccountProps & {
  open: boolean;
}

export const EditAccountModal = ({
  accountId,
  initialName = '',
  onCancel,
  onSave,
  open,
}: EditAccountModalProps) => <Modal
  open={open}
  onClose={onCancel}
>
  <EditAccount
    accountId={accountId}
    initialName={initialName}
    onCancel={onCancel}
    onSave={onSave}
  />
</Modal>;
