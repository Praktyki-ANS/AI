import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ANS-AI-DEMO/',
  define: {
    'process.env.GPT_API_IN': JSON.stringify(process.env.GPT_API_IN),
    'process.env.GPT_API_OUT': JSON.stringify(process.env.GPT_API_OUT),
  },
});
