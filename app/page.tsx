import CatModel from '@/components/CatModel';
import MeowButton from '@/components/MeowButton';

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">🐱 고양이의 조언</h1>
      <CatModel />
      <MeowButton />
    </main>
  );
}
