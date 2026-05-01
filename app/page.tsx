'use client';

import MeowButton from '@/components/MeowButton';
import { Spacing, Paragraph } from '@toss/tds-mobile';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-[#F2F4F6]/60 to-white">
      {/* 프리미엄 블러 효과(Glassmorphism)가 적용된 상단 헤더 */}
      <div className="flex items-center px-5 h-[56px] border-b border-gray-100/50 bg-white/70 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <Paragraph typography="t4" fontWeight="bold" color="grey900">그냥 해 고양이</Paragraph>
      </div>

      {/* 메인 뷰 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto pb-8 w-full max-w-md mx-auto relative">
        <MeowButton />
      </div>
    </div>
  );
}
