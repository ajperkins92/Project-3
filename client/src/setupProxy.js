const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        "/event",
        proxy({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );

    app.use(
        "/event/:id",
        proxy({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );

    app.use(
        "/signup/:id",
        proxy({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );

    app.use(
        "/user",
        proxy({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );

    app.use(
        "/user/:id",
        proxy({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );

    app.use(
        "/user/:id/myevents",
        proxy({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );

    app.use(
        '/login',
        proxy({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );

};