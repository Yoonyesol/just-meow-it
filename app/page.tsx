import CatModel from '@/components/CatModel';
import MeowButton from '@/components/MeowButton';

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <CatModel />
      <MeowButton />
    </main>
  );
}
