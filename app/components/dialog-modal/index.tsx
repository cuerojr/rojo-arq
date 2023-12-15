import { ReactNode, useLayoutEffect, useRef } from 'react';
import s from './style.module.scss'
import { Props } from '@/app/types/types';

export default function Modal({ children, open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const closeListenerFnc = () => {
      onClose && onClose();
    };

    const dialogRef = ref.current;
    dialogRef?.addEventListener('close', closeListenerFnc);

    return () => {
      dialogRef?.removeEventListener('close', closeListenerFnc);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    if (open && !ref.current?.open) {
      ref.current?.showModal();
    } else if (!open && ref.current?.open) {
      ref.current?.close();
    }
  }, [open]);

  return (
    <dialog
      className={ `${s.modal_container} ${open? 'show': 'hide'}` }
      ref={ref}
      onClick={(e) => {
        const dialogDimensions = e.currentTarget.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          e.currentTarget.close();
        }
      }}
    >
      <div className={ s.modal_description }>{ children }</div>
    </dialog>
  );
};