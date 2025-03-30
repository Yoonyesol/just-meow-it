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
        <div className="container mx-auto">{children}</div>
      </body>
    </html>
  );
}
