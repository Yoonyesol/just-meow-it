import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'star-counting-cat-advice', // 앱인토스 콘솔에서 등록한 앱 이름
  brand: {
    displayName: '별 헤는 냥', // 앱인토스 콘솔에 등록한 앱의 한글 이름
    primaryColor: '#5D6BBF', // 화면에 노출될 앱의 기본 색상 (퍼플/인디고)
    icon: '/favicon3.ico', // 화면에 노출될 앱의 아이콘 이미지 주소
  },
  web: {
    host: 'localhost',
    port: 3000, // Next.js 기본 포트로 설정
    commands: {
      dev: 'next dev',
      build: 'next build',
    },
  },
  permissions: [],
  outdir: '.next', // Next.js 빌드 결과물 경로
});
