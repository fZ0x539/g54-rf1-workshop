import { useEffect, useRef } from "react";

// components/ConfirmationModal.tsx
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete this?",
  description = "This can't be undone.",
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.body.style.overflow = "auto";
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        e.target instanceof Node &&
        !modalRef.current.contains(e.target)
      ) {
        document.body.style.overflow = "auto";
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    if (isOpen) document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);


  return (
    <div className="fixed inset-0  bg-black/30 flex items-center justify-center z-1">
      <div
        ref={modalRef}
        className="bg-white  p-4 rounded-lg max-w-sm w-full z-60"
      >
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="mb-4">{description}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              document.body.style.overflow = 'auto'
              onClose()
            }}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
