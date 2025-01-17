import Button from '@/_components/Button';

export default function Home() {
  return (
    <div className="bg-black">
      Hello World
      <div>
        <Button size="large" style="solid" icon="check" round="full">
          생성하기
        </Button>
        <Button size="medium" style="outlined">
          생성하기
        </Button>
        <Button size="small" style="secondary">
          생성하기
        </Button>
        <Button size="large" style="danger">
          생성하기
        </Button>
        <Button size="large" style="outlined_secondary">
          생성하기
        </Button>
      </div>
    </div>
  );
}
