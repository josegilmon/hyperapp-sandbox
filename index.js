'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {

    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/{filename}',
        handler: {
            file: function (request) {
                return `./dist/${request.params.filename}`;
            }
        }
    });
    
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
    
            return h.file('./dist/index.html');
        }
    });
    
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();