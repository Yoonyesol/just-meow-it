'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, ComponentProps } from 'react';
import { TDSMobileProvider as BasicTDSProvider } from '@toss/tds-mobile';

// TDSMobileProvider의 Props에서 userAgent 타입을 추출합니다.
type UserAgentVariables = ComponentProps<typeof BasicTDSProvider>['userAgent'];

const TDSMobileAITProvider = dynamic(
  () => import('@toss/tds-mobile-ait').then((mod) => mod.TDSMobileAITProvider),
  { ssr: false }
);

export default function TDSProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [shouldUseAIT, setShouldUseAIT] = useState(false);
  const [userAgentVars, setUserAgentVars] = useState<UserAgentVariables | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent;
      
      // UserAgentVariables 형식에 맞게 객체 생성
      const vars: UserAgentVariables = {
        isIOS: /iPhone|iPad|iPod/i.test(ua),
        isAndroid: /Android/i.test(ua),
        fontA11y: undefined,
        fontScale: 1,
      };
      
      setUserAgentVars(vars);
      
      // 토스 앱 환경인지 체크 (Toss 앱은 User Agent에 'Toss'가 포함됨)
      const isTossApp = /Toss/i.test(ua);
      setShouldUseAIT(isTossApp);
      setIsReady(true);
    }
  }, []);

  if (!isReady || !userAgentVars) return null;

  // 토스 앱이 아닐 때는 기본 디자인 테마만 공급하여 에러 방지
  if (!shouldUseAIT) {
    return <BasicTDSProvider userAgent={userAgentVars}>{children}</BasicTDSProvider>;
  }

  return (
    <TDSMobileAITProvider>
      {children}
    </TDSMobileAITProvider>
  );
}
