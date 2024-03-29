import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import uniReadPagesV3Plugin from './src/yu/router/utils/uni-read-pages-v3'
import mpliveMainfestPlugin from './src/yu/libs/mplive-manifest-plugin'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, __dirname, 'SHOPRO_')
  return {
    envPrefix: 'SHOPRO_',
    plugins: [
      uni(),
      // viteCompression({
      // 	verbose: false
      // }),
      uniReadPagesV3Plugin({
        pagesJsonDir: path.resolve(__dirname, './src/pages.json'),
        includes: ['path', 'aliasPath', 'name', 'meta']
      }),
      mpliveMainfestPlugin(env.SHOPRO_MPLIVE_ON)
    ],
    server: {
      host: true,
      // open: true,
      port: env.SHOPRO_DEV_PORT,
      hmr: {
        overlay: true
      }
    },
    // define: {
    //   __VUE_PROD_DEVTOOLS__: true
    // }
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@yu': path.resolve(__dirname, './src/yu')
      },
      extensions: ['.js', '.json', '.ts']
    }
  }
})
