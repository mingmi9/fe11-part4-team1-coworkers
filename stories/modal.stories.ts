import { Modal } from '@/_components/common/Modal';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Modal> = {
  title: '_components/common/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림 상태',
    },
    onClose: {
      action: 'closed',
      description: '모달 닫힐 때 호출되는 함수',
    },
    children: {
      control: 'text',
      description: '모달 내부에 렌더링될 내용',
    },
    type: {
      control: 'select',
      options: ['normal', 'profile', 'date'],
      description: '모달의 크기 및 스타일 설정',
    },
    className: {
      control: 'text',
      description: '추가적인 css 작성',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    type: 'normal',
    children: '모달',
  },
};
