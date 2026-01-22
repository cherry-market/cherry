import React, { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';
import { usePick } from '@/features/wish/hooks/usePick';

type PickButtonVariant = 'icon' | 'counter' | 'stacked';

interface PickButtonProps {
    productId: number;
    initialIsLiked: boolean;
    variant?: PickButtonVariant;
    size?: number;
    count?: number;
    label?: string;
    className?: string;
}

export const PickButton: React.FC<PickButtonProps> = ({
    productId,
    initialIsLiked,
    variant = 'icon',
    size = 20,
    count,
    label = '픽',
    className = '',
}) => {
    const {
        isLiked,
        isLoading,
        togglePick,
        loginAlertOpen,
        closeLoginAlert,
        confirmLogin,
    } = usePick({ productId, initialIsLiked });
    const [isPopping, setIsPopping] = useState(false);
    const previousLikedRef = useRef(isLiked);

    useEffect(() => {
        if (!previousLikedRef.current && isLiked) {
            setIsPopping(true);
        }
        previousLikedRef.current = isLiked;
    }, [isLiked]);

    useEffect(() => {
        if (!isPopping) {
            return;
        }
        const timer = window.setTimeout(() => setIsPopping(false), 180);
        return () => window.clearTimeout(timer);
    }, [isPopping]);

    const isCounter = variant === 'counter';
    const isStacked = variant === 'stacked';
    const isDisabled = isLoading;

    const iconColorClass = isLiked ? 'text-[#FF2E88]' : 'text-silver-metal group-hover:text-[#FF2E88]';
    const layoutClassName = isStacked ? 'flex flex-col items-center gap-1' : 'flex items-center gap-1';
    const buttonBaseClassName = `group transition-transform duration-150 active:scale-[0.95] ${layoutClassName}`;
    const buttonClassName = `${buttonBaseClassName} ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`;
    const iconWrapperClassName = `transition-transform ${isPopping ? 'animate-pick-pop' : ''}`;
    const countClassName = isLiked ? 'text-[#FF2E88] font-bold' : 'text-silver-metal group-hover:text-[#FF2E88]';
    const labelClassName = isLiked
        ? 'text-[#FF2E88] text-[9px] font-bold'
        : 'text-silver-metal group-hover:text-[#FF2E88] text-[9px] font-bold';

    const countDelta = isLiked === initialIsLiked ? 0 : isLiked ? 1 : -1;
    const displayCount = typeof count === 'number' ? Math.max(0, count + countDelta) : undefined;
    const countNode = isCounter && typeof displayCount === 'number'
        ? <span className={`text-[10px] ${countClassName}`}>{displayCount}</span>
        : null;
    const labelNode = isStacked ? <span className={labelClassName}>{label}</span> : null;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        togglePick();
    };

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                className={buttonClassName}
                aria-pressed={isLiked}
                disabled={isDisabled}
            >
                <span className={iconWrapperClassName}>
                    <Heart
                        size={size}
                        strokeWidth={2.2}
                        className={iconColorClass}
                        fill={isLiked ? '#FF2E88' : 'none'}
                    />
                </span>
                {countNode}
                {labelNode}
            </button>

            <ConfirmDialog
                isOpen={loginAlertOpen}
                title="로그인이 필요해요"
                description="관심 상품으로 등록하려면 로그인이 필요합니다."
                confirmLabel="로그인하기"
                onConfirm={confirmLogin}
                onCancel={closeLoginAlert}
            />

        </>
    );
};
