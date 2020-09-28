const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use('http://122.51.249.55:3000/index.php/Api',
        createProxyMiddleware({
            target: 'http://122.51.249.55:3000/index.php/Api',
            changeOrigin: true
        })
    );
};