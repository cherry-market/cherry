import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    title,
    description,
    confirmLabel = "확인",
    cancelLabel = "취소",
    onConfirm,
    onCancel
}) => {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 animate-[fadeIn_0.2s_ease-out]"
            onClick={(e) => {
                // Critical: Stop click propagation to parent components (like ProductCard)
                // because React Events bubble through Portals.
                e.stopPropagation();
            }}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onCancel}
            />

            {/* Dialog Content */}
            <div className="relative w-full max-w-[320px] bg-white rounded-[24px] p-6 shadow-xl transform transition-all animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)] text-center">
                <h3 className="text-lg font-bold text-ink mb-2">
                    {title}
                </h3>

                {description && (
                    <p className="text-sm text-gray-500 mb-6 whitespace-pre-line leading-relaxed">
                        {description}
                    </p>
                )}

                <div className="flex gap-3 mt-2">
                    <Button
                        variant="secondary"
                        fullWidth
                        onClick={onCancel}
                        size="md"
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={onConfirm}
                        size="md"
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(10px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>,
        document.body
    );
};
