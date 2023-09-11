import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { IsInCharList, PullData } from "./chars/types/char";

const init = async () => {

    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    })

    server.route({
        method: 'GET',
        path: '/char/{name}',
        handler: (req, res) => {
            try {

                if (IsInCharList(req.params.name)) {
                    return res.response(PullData(req.params.name)).code(200);
                } else {
                    return res.response({
                        message: "Null" 
                    }).code(404);
                }
            } catch (err) {
                return res.response({
                    message: err
                }).code(500);
            }
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