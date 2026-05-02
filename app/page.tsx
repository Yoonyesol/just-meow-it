'use client';

import MeowButton from '@/components/MeowButton';
import CatScene from '@/components/CatModel';
import { Spacing, Paragraph } from '@toss/tds-mobile';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#0E1117] relative overflow-hidden">
      {/* 화면 전체를 뒤덮는 우주 배경 (헤더 뒤까지 포함) */}
      <div className="absolute inset-0 z-0">
        <CatScene showOnlyBackground={true} />
      </div>

      {/* 메인 뷰 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto pointer-events-none z-10 relative">
        <MeowButton />
      </div>
    </div>
  );
}
