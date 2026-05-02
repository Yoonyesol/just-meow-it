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

      {/* 프리미엄 투명 헤더 (글래스모피즘) */}
      <div className="flex items-center px-5 h-[56px] border-b border-white/5 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="flex items-baseline gap-2 leading-none">
          <Paragraph typography="t4" fontWeight="bold" className="text-white leading-none">별 헤는 냥</Paragraph>
          <span className="text-[13px] font-medium text-white/50 tracking-tight leading-none">묘(猫)한 고민해결책</span>
        </div>
      </div>

      {/* 메인 뷰 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto pointer-events-none z-10 relative">
        <MeowButton />
      </div>
    </div>
  );
}
