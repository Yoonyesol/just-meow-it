import type { Metadata } from 'next';
import './globals.css';
import TDSProvider from '@/components/TDSProvider';

export const metadata: Metadata = {
  title: 'Just Meow It | 고양이의 조언으로 고민 해결하기',
  description: '고양이의 지혜를 통해 고민을 해결해 보세요.',
  keywords: '고양이, 고민, 해결, 고민해결, 해결의책, 고민, 팁, 동물, 심리 상담, 동물 조언, 정신 건강',
  robots: 'index, follow',
  openGraph: {
    title: 'Just Meow It | 고양이의 조언으로 고민 해결하기',
    description: '고양이의 지혜를 통해 고민을 해결해 보세요.',
    type: 'website',
  },
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
