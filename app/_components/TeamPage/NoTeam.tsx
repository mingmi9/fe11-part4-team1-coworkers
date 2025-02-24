import noteamimage from '@images/noteam.png';
import Image from 'next/image';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';

export default function NoTeam() {
  const router = useRouter();
  return (
    <>
      <div className="mt-[16rem] flex w-[60rem] flex-col items-center justify-center gap-[2rem]">
        <Image src={noteamimage} alt="No Team" />
        <div className="mt-[2.4rem] flex justify-center text-center text-[1.6rem] text-text-default">
          아직 소속된 팀이 없습니다. <br />
          팀을 생성하거나 팀에 참여해보세요.
        </div>
        <div className="flex h-[11.2rem] w-[18.6rem] flex-col justify-center gap-[0.5rem]">
          <Button
            size="medium"
            onClick={() => {
              router.push('/addteam');
            }}
          >
            팀 생성하기
          </Button>
          <Button
            size="medium"
            variant="secondary"
            onClick={() => {
              router.push('/team/join');
            }}
          >
            팀 참여하기
          </Button>
        </div>
      </div>
    </>
  );
}
