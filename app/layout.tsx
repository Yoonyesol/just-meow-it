import type { Metadata, Viewport } from 'next';
import './globals.css';
import TDSProvider from '@/components/TDSProvider';

export const metadata: Metadata = {
  title: '별 헤는 냥 | 묘(猫)한 고민해결책',
  description: '고양이의 지혜를 통해 고민을 해결해 보세요.',
  keywords: '고양이, 고민, 해결, 고민해결, 해결의책, 별헤는냥, 토스미니앱',
  robots: 'index, follow',
  openGraph: {
    title: '별 헤는 냥 | 묘(猫)한 고민해결책',
    description: '고양이의 지혜를 통해 고민을 해결해 보세요.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // 토스 가이드 준수: 확대/축소 비활성화
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="6f3a93abd49e8da4b70f3107ebdf3890e0ab142b" />
      </head>
      <body>
        <TDSProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">
              {children}
            </main>
          </div>
        </TDSProvider>
      </body>
    </html>
  );
}
