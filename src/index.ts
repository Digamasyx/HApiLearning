import { Server, Request, ResponseToolkit } from "@hapi/hapi";

const init = async () => {

    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            return 'Hello World!';
        }
    })

    await server.start();
    console.log('Server Running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
})

init(); 