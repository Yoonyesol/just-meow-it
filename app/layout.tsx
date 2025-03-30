import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Just Meow It',
  description: '고민이 있을 때는 고양이의 조언을 들어보세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head />
      <body className="bg-gray-100">
        <header className='flex fixed top-0 px-3 left-0 w-full h-16 bg-gray-800 text-white z-10'>
          <h1 className="flex items-center text-3xl font-bold">🐱 고양이의 조언</h1></header>
        <div className="container mx-auto">{children}</div>
      </body>
    </html>
  );
}
