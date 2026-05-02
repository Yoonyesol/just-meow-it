'use client';

import { Paragraph } from '@toss/tds-mobile';

interface TossButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
}

/**
 * 토스 스타일의 프리미엄 버튼 컴포넌트
 * - 클릭 시 미세한 스케일 다운 효과 (Active scale)
 * - 토스 고유의 블루 컬러 (#3182F6) 적용
 * - 둥근 모서리와 넉넉한 높이감
 */
export const TossButton = ({ title, onPress, disabled, variant = 'primary' }: TossButtonProps) => {
    return (
        <button
            onClick={onPress}
            disabled={disabled}
            className={`
                w-full h-[56px] rounded-full transition-all duration-200 
                flex items-center justify-center shadow-[0_4px_12px_rgba(49,130,246,0.2)] select-none
                ${disabled ? 'bg-[#333D4B] opacity-50 cursor-not-allowed' : 
                  variant === 'primary' 
                    ? 'bg-[#3182F6] hover:bg-[#1B64DA] active:scale-[0.95]' 
                    : 'bg-[#E8F3FF] hover:bg-[#D0E8FF] active:scale-[0.95]'}
            `}
        >
            <Paragraph 
                typography="t5" 
                fontWeight="bold" 
                className={variant === 'primary' ? 'text-white' : 'text-[#3182F6]'}
            >
                {title}
            </Paragraph>
        </button>
    );
};
