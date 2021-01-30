const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 8899;

module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
     externals: {
      'AMap': 'AMap', // 高德地图配置
      'AMapUI': 'AMapUI'
    }
  },
  devServer: {
    open: false,
    port: port,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        crossDomain: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
