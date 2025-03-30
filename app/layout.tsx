import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Just Meow It | 고양이의 조언으로 고민 해결하기',
  description: '고양이의 지혜를 통해 고민을 해결해 보세요.',
  keywords: '고양이, 조언, 고민, 팁, 동물, 심리 상담, 동물 조언, 정신 건강',
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
      <head />
      <body className="bg-gray-100">
        <header className='flex fixed top-0 px-3 left-0 w-full h-16 bg-gray-800 text-white z-10'>
          <h1 className="flex items-center text-2xl font-bold font-bnviit">🐱 Just Meow It</h1></header>
        <div className="container mx-auto">{children}</div>
      </body>
    </html>
  );
}
