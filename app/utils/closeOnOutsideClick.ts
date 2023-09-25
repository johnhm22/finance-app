import { useEffect, MutableRefObject } from 'react';

type OnClickOutside = () => void;
type Ref = MutableRefObject<T>;

export const closeOnOutsideClick = (
  ref: Ref,
  onClickOutside: OnClickOutside
) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);
};
