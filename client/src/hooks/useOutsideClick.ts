import React, { useEffect } from 'react';

/**
 * @param ref - The ref created using React.useRef
 * @param handler - A function that will get called on an outside click of ref
 */
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
