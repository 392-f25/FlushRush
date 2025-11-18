import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const BottomSheet = ({ isOpen, onClose, children, title }: BottomSheetProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 rounded-t-3xl">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
          {title && (
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          )}
        </div>
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default BottomSheet;
