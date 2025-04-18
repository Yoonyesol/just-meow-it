'use client';

import { useState } from 'react';
import { getRandomAdvice } from '@/utils/getRandomAdvice';
import Loader from './Loader';

const MeowButton = () => {
    const [advice, setAdvice] = useState({ title: '', advice: '' });
    const [showBubble, setShowBubble] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true)
        setShowBubble(!showBubble);

        setTimeout(() => {
            setAdvice(getRandomAdvice());

            setShowBubble(true);
            setIsLoading(false)
        }, 1000);
    };

    return (
        <div className="text-center px-3">
            {isLoading && <Loader />}
            {showBubble && (
                <div className="animate-fadeInOut absolute top-[23vh] left-1/2 transform -translate-x-1/2 mx-0 rounded-lg border border-gray-300 bg-white px-4 py-2 text-black shadow-lg">
                    <p className="text-md">{advice.title}</p>
                </div>
            )}
            <div className='whitespace-pre-line'>{!isLoading ? advice.advice : "고양이가 조언을 준비 중..."}</div>
            <button onClick={handleClick} className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 cursor-pointer">
                고양이의 조언 듣기
            </button>
        </div>
    );
};

export default MeowButton;
