interface ProfileFormProps {
  nickname: string;
  email: string;
  password?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: () => void;
  onPasswordChange: () => void;
}

export default function ProfileForm({
  nickname,
  email,
  onChange,
  onUpdate,
  onPasswordChange,
}: ProfileFormProps) {
  return (
    <div className="flex flex-col gap-[2.4rem]">
      <div className="flex flex-col gap-[1.2rem]">
        <span className="text-[1.6rem] font-medium">이름</span>
        <div className="relative">
          <input
            value={nickname}
            name="nickname"
            onChange={onChange}
            placeholder={nickname}
            className="relative h-[4.8rem] w-full rounded-[1.2rem] border-[0.1rem] border-solid border-border-primary bg-background-secondary px-[1.6rem] text-[1.6rem] font-normal text-text-primary placeholder:text-text-primary focus:border-brand-primary focus:outline-none"
          />
          <button
            onClick={onUpdate}
            className="absolute right-[1.6rem] top-[0.8rem] h-[3.2rem] w-[7.4rem] rounded-[1.2rem] bg-brand-primary text-[1.4rem] font-semibold"
          >
            변경하기
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-[1.2rem]">
        <span className="text-[1.6rem] font-medium">이메일</span>
        <div className="relative">
          <input
            disabled
            value={email}
            className="relative h-[4.8rem] w-full rounded-[1.2rem] border-[0.1rem] border-solid border-border-primary bg-background-tertiary px-[1.6rem] text-[1.6rem] font-normal text-text-disabled"
          />
        </div>
      </div>
      <div className="flex flex-col gap-[1.2rem]">
        <span className="text-[1.6rem] font-medium">비밀번호</span>
        <div className="relative">
          <input
            name="password"
            disabled
            type="password"
            value={'•••••••••••'}
            className="relative h-[4.8rem] w-full rounded-[1.2rem] border-[0.1rem] border-solid border-border-primary bg-background-tertiary px-[1.6rem] text-[1.6rem] font-normal text-text-disabled"
          />
          <button
            onClick={onPasswordChange}
            className="absolute right-[1.6rem] top-[0.8rem] h-[3.2rem] w-[7.4rem] rounded-[1.2rem] bg-brand-primary text-[1.4rem] font-semibold"
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
}
