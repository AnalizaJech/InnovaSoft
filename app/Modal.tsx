import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
export default function Modal({
  open,
  onClose,
  title,
  children,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog?.open) dialog?.showModal();
    else if (!open && dialog?.open) dialog.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={title}
      onCancel={onClose}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="modal-inner">
        <div className="modal-heading">
          <h2>{title}</h2>
          <button
            className="icon-button"
            aria-label={`Cerrar ${title}`}
            onClick={onClose}
          >
            <X aria-hidden="true" size={22} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
