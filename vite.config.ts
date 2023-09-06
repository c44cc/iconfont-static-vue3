import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
const buildArr = ['js-cookie', 'axios', 'vue-router', 'tools-javascript', 'element-plus', 'vue+runtime', 'vue']
export default defineConfig(({ command, mode }) => {
    return {
        resolve: {
            alias: {
                '~/': `${path.resolve(__dirname, 'src')}/`
            }
        },
        plugins: [vue()],
        server: {
            host: '0.0.0.0',
            port: 9600,
            open: false,
            https: false
        },
        build: {
            assetsDir: 'static_app',
            minify: 'terser',
            cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
            reportCompressedSize: false,
            terserOptions: {
                compress: {
                    // warnings: false,
                    drop_console: true, // 打包时删除console
                    drop_debugger: true, // 打包时删除 debugger
                    pure_funcs: ['console.log']
                },
                output: {
                    // 去掉注释内容
                    comments: true
                }
            },
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            const arr = id.toString().split('node_modules/')[1].split('/')
                            const npmName = arr[0].indexOf('pnpm') != -1 ? arr[1] : arr[0]

                            for (let i = 0; i < buildArr.length; i++) {
                                const key = buildArr[i]
                                if (npmName.indexOf(key) != -1) return key
                            }

                            return '_vendor'
                        }
                    }
                }
            }
        }
    }
})
