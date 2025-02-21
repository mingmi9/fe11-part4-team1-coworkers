'use client';

import EditTeam from '@/_components/TeamPage/EditTeam';
import { getGroupInfo } from '@/_lib/api/group-api';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const teamImg = 'https://picsum.photos/200/300';

interface GroupData {
  name: string;
  image: string;
}

export default function EditPage() {
  const { teamid } = useParams();
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchUserGroups = async () => {
      if (!teamid) return;

      const authStorage = localStorage.getItem('auth-storage');
      if (!authStorage) return;

      const parsedData = JSON.parse(authStorage);
      const accessToken = parsedData?.state?.accessToken;

      try {
        const data = await getGroupInfo(Number(teamid), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log('받아온 그룹 데이터:', data);
        setGroupData(data);
        setLoading(false); // 데이터 로딩 완료 후 false로 설정
      } catch (error) {
        console.error('그룹 정보 불러오기 실패:', error);
        setLoading(false); // 데이터 로딩 완료 후 false로 설정
      }
    };

    fetchUserGroups();
  }, [teamid]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 텍스트나 다른 로딩 UI 표시
  }

  return (
    <div className="flex items-center justify-center">
      <EditTeam
        teamImg={groupData?.image ?? teamImg}
        teamName={groupData?.name ?? '로딩 중'}
        teamId={Number(teamid)}
      />
    </div>
  );
}
