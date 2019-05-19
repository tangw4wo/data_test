module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',
    publicPath: '/views/default/tongji/',
    devServer: {
        proxy: {
            "/api/*": {
              target: "http://www.hifkw.com",
              changeOrigin:true,
              secure: false,
              pathRewrite: {'^/api' : '/'}
            }
        }

    }




  }