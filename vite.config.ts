import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'uni-app'],
      dirs: ['src/utils'],
      dts: 'src/auto-imports.d.ts'
    }),
  ],
  server: {
    host: true,
    port: 80,
    open: true
  },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src')
  //   }
  // },
  // base: './',
})
