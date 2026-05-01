'use client';

import { useState } from 'react';
import { getRandomAdvice } from '@/utils/getRandomAdvice';
import Loader from './Loader';
import { Button, Paragraph, Spacing } from '@toss/tds-mobile';
import CatScene from './CatModel';

const MeowButton = () => {
    const [advice, setAdvice] = useState({ title: '', advice: '' });
    const [showBubble, setShowBubble] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const handleClick = () => {
        setHasStarted(true);
        setIsLoading(true);
        setShowBubble(false);

        setTimeout(() => {
            setAdvice(getRandomAdvice());
            setShowBubble(true);
            setIsLoading(false);
        }, 300);
    };

    return (
        <div className="w-full flex flex-col items-center">
            {isLoading && <Loader />}
            
            {/* 3D 씬 (고양이 + 떠있는 말풍선 통합) */}
            <div className="w-full relative mt-4">
                <CatScene advice={advice} showBubble={showBubble} />
            </div>
            
            {/* 조언 및 버튼 영역 (토스 스타일) */}
            <div className="w-full px-6 text-center mt-2 z-10">
                {/* 해설 박스 */}
                <div className="min-h-[110px] w-full bg-[#F2F4F6] rounded-[24px] p-6 flex flex-col items-center justify-center transition-all duration-300">
                    {!hasStarted ? (
                        <Paragraph typography="t6" fontWeight="medium" color="grey600" className='whitespace-pre-line leading-relaxed text-center'>
                            머릿속을 맴도는 고민이 있냥?{'\n'}마음속으로 질문을 떠올리고 버튼을 누르라옹!
                        </Paragraph>
                    ) : (
                        <Paragraph typography="t7" fontWeight="medium" color="grey800" className='whitespace-pre-line leading-relaxed break-keep text-center'>
                            {!isLoading ? advice.advice : "고양이가 열심히 생각하는 중..."}
                        </Paragraph>
                    )}
                </div>

                <Spacing size={16} />

                {/* 토스 스타일 기본 버튼 */}
                <Button color="primary" variant="fill" size="large" onClick={handleClick} className="w-full" disabled={isLoading}>
                    {!hasStarted ? "고양이에게 물어보기" : (isLoading ? "생각하는 중..." : "다른 조언 듣기")}
                </Button>
            </div>
        </div>
    );
};

export default MeowButton;
