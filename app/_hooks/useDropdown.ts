import { useState, useEffect, useRef } from 'react';

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 바깥 영역 클릭 시 닫기
  const closeDropdown = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // 바깥 클릭 감지
  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return { isOpen, toggleDropdown, dropdownRef };
};

export default useDropdown;
