import AddTaskModal from '@/_components/modal/AddTaskModal';
import ChangePasswordModal from '@/_components/modal/ChangePasswordModal';
import DeleteUserModal from '@/_components/modal/DeleteUserModal';
import ResetPasswordModal from '@/_components/modal/ResetPasswordModal';

export default function ModalTestPage() {
  return (
    <div>
      <DeleteUserModal />
      <ChangePasswordModal />
      <ResetPasswordModal />
      <AddTaskModal />
    </div>
  );
}
