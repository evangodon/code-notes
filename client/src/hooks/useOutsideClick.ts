import React, { useEffect } from 'react';

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement | undefined>,
  handler: () => void
) => {
  function handleClickOutside(event: any) {
    if (ref && ref.current && !ref.current.contains(event.target)) {
      handler();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
};
