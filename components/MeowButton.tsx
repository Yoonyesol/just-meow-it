'use client';

import { useState } from 'react';
import { Paragraph, Spacing } from '@toss/tds-mobile';
import CatScene from './CatModel';
import { TossButton } from './TossButton';
import { ADVICES } from '@/constant/advice';

/**
 * 해설 박스용 스켈레톤 UI
 */
const AdviceSkeleton = () => (
    <div className="w-full flex flex-col gap-3 animate-pulse">
        <div className="h-4 bg-white/10 rounded-full w-3/4 mx-auto"></div>
        <div className="h-4 bg-white/10 rounded-full w-full mx-auto"></div>
        <div className="h-4 bg-white/10 rounded-full w-1/2 mx-auto"></div>
    </div>
);

export default function MeowButton() {
    const [advice, setAdvice] = useState(ADVICES[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [showBubble, setShowBubble] = useState(false);

    const handleMeow = () => {
        setIsLoading(true);
        setShowBubble(false);
        
        setTimeout(() => {
            const randomAdvice = ADVICES[Math.floor(Math.random() * ADVICES.length)];
            setAdvice(randomAdvice);
            setIsLoading(false);
            setHasStarted(true);
            setShowBubble(true);
        }, 1500);
    };

    return (
        <div className="w-full h-full flex flex-col relative">
            {/* 고양이 + 조언 박스 + 버튼 통합 영역 (상향 조정 레이아웃 복구) */}
            <div className="flex-1 w-full max-w-md px-6 z-10 flex flex-col justify-center items-center pointer-events-auto mx-auto -mt-10">
                {/* 고양이 영역 (높이를 줄여서 하단 UI를 위로 밀착) */}
                <div className="w-full h-[25vh] min-h-[220px] relative">
                    <CatScene advice={advice} showBubble={showBubble} showOnlyCat={true} />
                </div>

                {/* 해설 제목 (위치 고정) */}
                <div className="w-full text-left px-1 mb-2 h-[20px] flex items-end">
                    {hasStarted && !isLoading && (
                        <Paragraph typography="t7" fontWeight="bold" className="text-[#8B95A1]">해설</Paragraph>
                    )}
                </div>
                
                {/* 조언 해설 박스 */}
                <div className="min-h-[110px] w-full bg-[#161B2C]/90 backdrop-blur-xl rounded-[24px] p-6 flex flex-col items-center justify-center transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10">
                    {isLoading ? (
                        <AdviceSkeleton />
                    ) : !hasStarted ? (
                        <Paragraph typography="t6" fontWeight="medium" className='text-[#CBD5E1] whitespace-pre-line leading-relaxed text-center'>
                            머릿속을 맴도는 고민이 있냥?{'\n'}마음속으로 질문을 떠올리고 버튼을 누르라옹!
                        </Paragraph>
                    ) : (
                        <Paragraph typography="t7" fontWeight="medium" className='text-[#E5E8EB] whitespace-pre-line leading-relaxed break-keep text-center'>
                            {advice.advice}
                        </Paragraph>
                    )}
                </div>

                <Spacing size={16} />

                {/* 메인 버튼 */}
                <TossButton 
                    title={isLoading ? "냥이가 생각 중..." : (!hasStarted ? "냥이에게 물어보기" : "다시 물어보기")} 
                    onPress={handleMeow}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
}
