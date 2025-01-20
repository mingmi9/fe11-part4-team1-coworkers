'use client';

import Button from '@/_components/Button';

export default function ButtonTest() {
  const handleButton = () => alert('test입니다');
  return (
    <div>
      <Button size="large" icon="check" round="full" onClick={handleButton}>
        생성하기
      </Button>
      <Button size="medium" style="outlined">
        생성하기
      </Button>
      <Button size="small" style="outlined_secondary">
        생성하기
      </Button>
      <Button size="large" style="secondary">
        생성하기
      </Button>
      <Button size="large" style="danger">
        생성하기
      </Button>
      <Button
        size="large"
        icon="check"
        round="full"
        onClick={handleButton}
        disabled
      >
        생성하기
      </Button>
    </div>
  );
}
