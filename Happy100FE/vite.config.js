import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: fileURLToPath(new URL('.', import.meta.url)),
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          axios: ['axios'],
          editor: ['@ckeditor/ckeditor5-build-classic', '@ckeditor/ckeditor5-react'],
        },
      },
    },
  },
  server: {
    proxy: {
      // API 요청을 백엔드로 프록시 → 쿠키 SameSite=Lax로도 동작
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      // OAuth 시작 URL만 프록시 (콜백 '/oauth2/callback'은 SPA 라우팅으로 FE가 처리해야 함)
      '/oauth2/authorization': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      // 업로드 정적 파일 프록시 (썸네일/첨부 이미지)
      '/uploads': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
