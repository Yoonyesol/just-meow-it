import type { Metadata } from 'next';
import './globals.css';
import AdSense from '@/components/AdSense';

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
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_ADS_KEY}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-gray-100 flex flex-col h-full">
        <header className='flex fixed top-0 px-3 left-0 w-full h-16 bg-gray-800 text-white z-10'>
          <h1 className="flex items-center text-2xl font-bold font-bnviit">🐱 Just Meow It</h1>
        </header>
        <div className="container mx-auto pt-16 flex-1">
          <AdSense adSlot={"8185832302"} />
          {children}
          <AdSense adSlot={"8185832302"} />
        </div>
      </body>
    </html>
  );
}


