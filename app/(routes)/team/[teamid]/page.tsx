'use client';

import MemberSection from '@/_components/TeamPage/MemberSection';
import NoTeam from '@/_components/TeamPage/NoTeam';
import ReportSection from '@/_components/TeamPage/ReportSection';
import TeamHeader from '@/_components/TeamPage/TeamHeader';
import TodoListSection from '@/_components/TeamPage/TodoListSection';
import { getGroupInfo } from '@/_lib/api/group-api';
import { getUserInfo, getUserMemberships } from '@/_lib/api/user-api';
import NotFound from '@/not-found';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface GroupData {
  name: string;
  members: [];
  taskLists: {
    id: number;
    name: string;
    tasks: {
      id: number;
      name: string;
      doneAt: string;
    }[];
  }[];
}

interface Membership {
  groupId: number;
  role: string;
}

export default function TeamPage() {
  const { teamid } = useParams();
  const [isUser, setIsUser] = useState(true);
  const [isTeam, setIsTeam] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [groupData, setGroupData] = useState<GroupData | null>(null);

  useEffect(() => {
    const fetchUserGroups = async () => {
      if (!teamid) return;

      const authStorage = localStorage.getItem('auth-storage');
      if (!authStorage) return;

      const parsedData = JSON.parse(authStorage);
      const accessToken = parsedData?.state?.accessToken;

      try {
        const data = await getUserInfo({
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!data.memberships || data.memberships.length === 0) {
          setIsUser(false);
        } else {
          setIsUser(true);
        }
      } catch {
        console.error('유저 정보 조회 실패');
      }

      try {
        const data = await getGroupInfo(Number(teamid), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const membership = await getUserMemberships();
        const matchedMembership = membership.find(
          (m: Membership) => m.groupId === Number(teamid),
        );

        if (matchedMembership.role === 'ADMIN') setIsAdmin(true);
        else setIsAdmin(false);
        console.log(data);
        setGroupData(data);
      } catch {
        setIsTeam(false);
      }
    };

    fetchUserGroups();
  }, [teamid]);

  const alltasksTodo =
    groupData?.taskLists?.reduce((acc, task) => acc + task.tasks.length, 0) ??
    0;

  const alltasksCompleted =
    groupData?.taskLists?.reduce(
      (acc, task) => acc + task.tasks.filter((t) => t.doneAt !== null).length,
      0,
    ) ?? 0;

  return (
    <div className="mx-auto mt-[3rem] flex h-full flex-col items-center gap-[3rem] mobile:w-[34.3rem] tablet:w-[69.6rem] pc:w-[120rem]">
      {!isUser && <NoTeam />}
      {isUser && isTeam && (
        <>
          <TeamHeader
            teamName={groupData?.name ?? '로딩 중...'}
            teamId={teamid as string}
            isAdmin={isAdmin}
          />
          <TodoListSection
            tasks={groupData?.taskLists ?? []}
            teamId={teamid as string}
          />
          {isAdmin && (
            <ReportSection
              alltasks={alltasksTodo}
              completedtasks={alltasksCompleted}
            />
          )}
          <MemberSection
            members={groupData?.members ?? []}
            isAdmin={isAdmin}
            teamId={teamid as string}
          />
        </>
      )}
      {isUser && !isTeam && <NotFound />}
    </div>
  );
}
