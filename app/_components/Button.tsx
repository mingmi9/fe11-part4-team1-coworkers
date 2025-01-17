import { ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  style?: 'solid' | 'outlined' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export default function Button({
  className = '',
  size = 'large',
  style = 'solid',
  disabled = false,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const sizeClass = {
    small:
      'w-[74px] h-[32px] py-[6px] flex justify-center items-center rounded-xl text-[14px]',
    medium:
      'h-[40px] px-[21px] py-[14px] flex justify-center items-center rounded-xl text-[14px]',
    large:
      'w-[332px] h-[48px] py-[14px] flex justify-center items-center rounded-xl',
  };

  const styleClass = {
    solid: disabled
      ? 'bg-interaction-inactive cursor-default pointer-events-none text-text-inverse'
      : 'bg-brand-primary text-text-inverse hover:bg-interaction-hover active:bg-interaction-pressed',
    outlined: disabled
      ? 'border border-interaction-inactive text-interaction-inactive cursor-default pointer-events-none'
      : 'border border-brand-primary text-brand-primary hover:border-interaction-hover hover:text-interaction-hover active:border-interaction-pressed active:border-interaction-pressed',
    secondary: 'border border-text-secondary text-text-secondary',
    danger:
      'bg-status-danger text-text-inverse hover:brightness-90 active:brightness-75',
  };

  const classNames = `${sizeClass[size]} ${styleClass[style]} ${className}`;

  return (
    <button className={`${classNames}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
