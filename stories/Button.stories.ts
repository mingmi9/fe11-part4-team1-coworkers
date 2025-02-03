import Button from '@/_components/common/Button';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: '_components/common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [
        'small',
        'medium',
        'large',
        'modal-small',
        'modal-medium',
        'modal-large',
      ],
      description: '버튼의 크기',
    },
    variant: {
      control: 'select',
      options: [
        'default',
        'outlined',
        'outlined_secondary',
        'secondary',
        'danger',
      ],
      description: '버튼의 스타일',
    },
    icon: {
      control: 'select',
      options: ['none', 'plus', 'check'],
      description: '버튼 옆 아이콘',
    },
    round: {
      control: 'select',
      options: ['full', 'xl'],
      description: '버튼의 테두리',
    },
    disabled: {
      control: 'boolean',
      description: '버튼의 비활성화 여부',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 이벤트 핸들러',
    },
    children: {
      control: 'text',
      description: '버튼 안에 들어갈 내용',
    },
    className: {
      control: 'text',
      description: '추가적인 css 작성',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    children: '기본 버튼',
    size: 'medium',
    variant: 'default',
    round: 'xl',
    icon: 'none',
    disabled: false,
  },
};
