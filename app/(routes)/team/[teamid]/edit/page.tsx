'use client';

import EditTeam from '@/_components/TeamPage/EditTeam';

const teamname = '경영관리팀';
const teamImg = 'https://picsum.photos/200/300';

export default function EditPage() {
  return (
    <div className="flex items-center justify-center">
      <EditTeam teamImg={teamImg} teamName={teamname} />
    </div>
  );
}
