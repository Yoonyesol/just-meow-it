import CatModel from "@/components/CatModel";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold">🐱 고양이의 가르침</h1>
      <CatModel />
    </main>
  );
}
