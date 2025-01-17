import plus from '../../public/icons/plus.svg';
import check from '../../public/icons/check-white.svg';
import { ReactNode } from 'react';
import Image from 'next/image';

interface ButtonProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  style?: 'solid' | 'outlined' | 'outlined_secondary' | 'secondary' | 'danger';
  icon?: 'plus' | 'check' | 'none';
  round?: 'full' | 'xl';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export default function Button({
  className = '',
  size = 'medium',
  style = 'solid',
  icon = 'none',
  round = 'xl',
  disabled = false,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const sizeClass = {
    small: 'w-[74px] h-[32px] py-[6px] text-[14px]',
    medium: 'h-[40px] px-[21px] py-[14px] text-[14px]',
    large: 'w-[332px] h-[48px] py-[14px]',
  };

  const styleClass = {
    solid: disabled
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
    xl: 'rounded-xl',
  };

  const renderIcon = () => {
    if (icon === 'plus')
      return <Image src={plus} width={16} height={16} alt="플러스 아이콘" />;
    if (icon === 'check')
      return <Image src={check} width={16} height={16} alt="체크 아이콘" />;
    return null;
  };

  const classNames = `flex justify-center items-center gap-[4px] ${sizeClass[size]} ${styleClass[style]} ${roundStyle[round]} ${className}`;

  return (
    <button className={`${classNames}`} onClick={onClick} {...props}>
      {renderIcon()}
      {children}
    </button>
  );
}
