import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  distDir: '.next/web', // 토스 CLI가 빌드 결과물을 찾는 경로
};

export default nextConfig;
