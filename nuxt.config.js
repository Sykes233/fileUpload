export default {
  ssr: false,
  head: {
    title: '文件上传系统',
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  plugins: [
    '@/plugins/element-ui',
  ],
  components: true,
  buildModules: [
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  build: {
    transpile: [/^element-ui/],
  },
  serverMiddleware: [
    { path: '/api', handler: '~/server/index.js' }
  ],
  server: {
    port: '8000',
    host: '0.0.0.0',
  }
}
