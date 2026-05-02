'use client';

import { useState, useEffect } from 'react';
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

    // 데이터 유지 (Toss 가이드 준수)
    useEffect(() => {
        const saved = localStorage.getItem('last_meow_advice');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setAdvice(parsed);
                setHasStarted(true);
                setShowBubble(true);
            } catch (e) { console.error(e); }
        }
    }, []);

    const handleMeow = () => {
        setIsLoading(true);
        setShowBubble(false);

        setTimeout(() => {
            const randomAdvice = ADVICES[Math.floor(Math.random() * ADVICES.length)];
            setAdvice(randomAdvice);
            setIsLoading(false);
            setHasStarted(true);
            setShowBubble(true);
            
            // 데이터 저장
            localStorage.setItem('last_meow_advice', JSON.stringify(randomAdvice));
        }, 1500);
    };

    return (
        <div className="fixed inset-0 w-full h-screen flex flex-col items-center overflow-hidden">
            {/* 고양이 영역: 전체 화면 캔버스 */}
            <div className="absolute inset-0 z-0">
                <CatScene
                    advice={advice}
                    showBubble={showBubble}
                    showOnlyCat={true}
                    isLoading={isLoading}
                />
            </div>

            {/* UI 레이어: 텍스트 중앙 정렬 적용 */}
            <div className="flex-1 w-full max-w-md px-6 z-10 flex flex-col justify-center items-center pointer-events-none mx-auto">
                {/* 상단 고양이 위치 가이드 */}
                <div className="w-full h-[30vh] min-h-[250px]"></div>

                <Spacing size={12} />

                {/* 조언 해설 박스 (무조건 중앙 정렬 강제) */}
                <div className="min-h-[110px] w-full bg-[#161B2C]/90 backdrop-blur-xl rounded-[24px] p-6 flex flex-col items-center justify-center transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-auto">
                    {isLoading ? (
                        <AdviceSkeleton />
                    ) : !hasStarted ? (
                        <Paragraph typography="t6" fontWeight="medium" className='text-[#F9FAFB] whitespace-pre-line leading-relaxed text-center w-full' style={{ textAlign: 'center' }}>
                            머릿속을 맴도는 고민이 있냥?{'\n'}마음속으로 질문을 떠올리고 버튼을 누르라옹!
                        </Paragraph>
                    ) : (
                        <Paragraph typography="t7" fontWeight="medium" className='text-[#F9FAFB] whitespace-pre-line leading-relaxed break-keep text-center w-full' style={{ textAlign: 'center' }}>
                            {advice.advice}
                        </Paragraph>
                    )}
                </div>

                <Spacing size={24} />

                {/* 메인 버튼 */}
                <div className="w-full pointer-events-auto">
                    <TossButton
                        title={isLoading ? "냥이가 생각 중..." : (!hasStarted ? "냥이에게 물어보기" : "다시 물어보기")}
                        onPress={handleMeow}
                        disabled={isLoading}
                    />
                </div>
            </div>

            {/* 푸터 영역 */}
            <div className="absolute bottom-10 w-full flex justify-center z-50 pointer-events-none">
                <span className="text-white/40 text-[10px] text-center leading-none">
                    Cat model by Adrian.Alexis.Liberato (CC-BY-4.0)
                </span>
            </div>
        </div>
    );
}
