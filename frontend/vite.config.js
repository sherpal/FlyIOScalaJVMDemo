import { resolve } from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'

import { defineConfig } from 'vite'

const scalaVersion = "3.3.1"

export default defineConfig(({ command, mode, ssrBuild }) => {

    const htmlPlugin = createHtmlPlugin()

    const mainJS = `/target/scala-${scalaVersion}/frontend-${mode === 'production' ? 'opt' : 'fastopt'}/main.js`
    console.log('mainJS', mainJS)
    const script = `<script type="module" src="${mainJS}"></script>`

    return {
        publicDir: './public',
        plugins: createHtmlPlugin({
            minify: process.env.NODE_ENV === 'production',
            inject: {
                data: {
                    script
                }
            }
        }),
        server: {
            port: 3000,
            proxy: {
                "/api": {
                    target: "http://127.0.0.1:9000"
                }
            }
        },
        base: "/static/"
    }
})
