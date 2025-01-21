'use client';

import Button from '@/_components/common/Button';

export default function ButtonTest() {
  const handleButton = () => alert('test입니다');
  return (
    <div>
      <Button size="large" icon="check" round="xl" onClick={handleButton}>
        생성하기
      </Button>
      <Button size="medium" variant="outlined">
        생성하기
      </Button>
      <Button size="small" variant="outlined_secondary">
        생성하기
      </Button>
      <Button size="large" variant="secondary">
        생성하기
      </Button>
      <Button size="large" variant="danger">
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
