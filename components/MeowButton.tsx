'use client';

import { useState } from 'react';
import { getRandomAdvice } from '@/utils/getRandomAdvice';

const MeowButton = () => {
    const [advice, setAdvice] = useState({ title: '', advice: '고양이가 조언을 준비 중...' });
    const [showBubble, setShowBubble] = useState(false);

    const handleClick = () => {
        setShowBubble(!showBubble);
        setAdvice(getRandomAdvice());
        setShowBubble(true);
    };

    return (
        <div className="text-center">
            {showBubble && (
                <div className="animate-fadeInOut absolute top-[250px] mx-0 rounded-lg border border-gray-300 bg-white px-4 py-2 text-black shadow-lg">
                    <p className="text-lg">{advice.title}</p>
                </div>
            )}
            <div>{advice.advice}</div>
            <button onClick={handleClick} className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 cursor-pointer">
                고양이의 조언 듣기
            </button>
        </div>
    );
};

export default MeowButton;
