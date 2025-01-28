import plus from '@icons/plus.svg';
import check from '@icons/check-white.svg';
import { ReactNode } from 'react';
import Image from 'next/image';

interface ButtonProps {
  className?: string;
  size?:
    | 'small'
    | 'medium'
    | 'large'
    | 'modal-small'
    | 'modal-medium'
    | 'modal-large';
  variant?:
    | 'default'
    | 'outlined'
    | 'outlined_secondary'
    | 'secondary'
    | 'danger';
  icon?: 'plus' | 'check' | 'none';
  round?: 'full' | 'xl';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export default function Button({
  className = '',
  size = 'medium',
  variant = 'default',
  icon = 'none',
  round = 'xl',
  disabled = false,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const sizeClass = {
    small: 'w-[7.4rem] h-[3.2rem] py-[0.6rem] text-[1.4rem]',
    medium: 'h-[4rem] px-[2.1rem] py-[1.4rem] text-[1.4rem]',
    large: 'w-[33.2rem] h-[4.8rem] py-[1.4rem] text-[1.6rem]',
    'modal-small': 'w-[13.6rem] h-[4.8rem] py-[1.4rem] text-[1.6rem]',
    'modal-medium': 'w-[28rem] h-[4.8rem] py-[1.4rem] text-[1.6rem]',
    'modal-large': 'w-[33.6rem] h-[4.8rem] py-[1.4rem] text-[1.6rem]',
  };

  const variantClass = {
    default: disabled
      ? 'bg-interaction-inactive cursor-default pointer-events-none text-text-inverse'
      : 'bg-brand-primary text-text-inverse hover:bg-interaction-hover active:bg-interaction-pressed',
    outlined: disabled
      ? 'bg-background-inverse border border-interaction-inactive text-interaction-inactive cursor-default pointer-events-none'
      : 'bg-background-inverse border border-brand-primary text-brand-primary hover:border-interaction-hover hover:text-interaction-hover active:border-interaction-pressed active:border-interaction-pressed',
    outlined_secondary:
      'bg-background-inverse border border-text-secondary text-text-default hover:brightness-95 active:brightness-90',
    secondary: disabled
      ? 'border border-interaction-inactive text-interaction-inactive cursor-default pointer-events-none'
      : 'border border-brand-primary text-brand-primary hover:border-interaction-hover hover:text-interaction-hover active:border-interaction-pressed active:border-interaction-pressed',
    danger:
      'bg-status-danger text-text-inverse hover:brightness-90 active:brightness-75',
  };

  const roundStyle = {
    full: 'rounded-full',
    xl: 'rounded-[1.2rem]',
  };

  const renderIcon = () => {
    if (icon === 'plus')
      return <Image src={plus} width={16} height={16} alt="플러스 아이콘" />;
    if (icon === 'check')
      return <Image src={check} width={16} height={16} alt="체크 아이콘" />;
    return null;
  };

  const classNames = `flex justify-center items-center gap-[0.4rem] ${sizeClass[size]} ${variantClass[variant]} ${roundStyle[round]} ${className}`;

  return (
    <button className={`${classNames}`} onClick={onClick} {...props}>
      {renderIcon()}
      {children}
    </button>
  );
}
