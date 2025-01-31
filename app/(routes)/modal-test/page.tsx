import AddTaskListModal from '@/_components/modal/AddTaskListModal';
import AddTaskModal from '@/_components/modal/AddTaskModal';
import ChangePasswordModal from '@/_components/modal/ChangePasswordModal';
import DeleteTaskModal from '@/_components/modal/DeleteTaskModal';
import DeleteUserModal from '@/_components/modal/DeleteUserModal';
import MemberInviteModal from '@/_components/modal/MemberInviteModal';
import ProfileModal from '@/_components/modal/ProfileModal';
import ResetPasswordModal from '@/_components/modal/ResetPasswordModal';

export default function ModalTestPage() {
  return (
    <div>
      <ProfileModal />
      <MemberInviteModal />
      <DeleteUserModal />
      <AddTaskListModal />
      <ChangePasswordModal />
      <ResetPasswordModal />
      <AddTaskModal />
      <DeleteTaskModal />
    </div>
  );
}
