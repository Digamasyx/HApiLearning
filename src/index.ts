/**
 * @format
 */

import { CharList } from './chars/types/char';
import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { FindCharsWithCriterion, PullData } from './chars/types/functions';
import { IsInCharList } from './chars/types/typeguards';
import { CharTypes } from './chars/types/char';

const init = async () => {
	const server: Server = new Server({
		port: 3000,
		host: 'localhost',
	});

	server.route({
		method: 'POST',
		path: '/pulldata/{field?}',
		handler: (req, res) => {
			try {
				// Extract the payload, recieving a { chars: CharList[] } like.
				let { chars } = req.payload as { chars: CharList[] };
				let fieldParam =
					req.params.field !== undefined ? (req.params.field as string) : null;

				let data = PullData(chars);

				if (fieldParam !== null) {
					const newData = data.map(sub => sub[fieldParam as string]);
					return res.response(newData).code(200);
				} else {
					return res.response(data).code(200);
				}
			} catch (err) {
				console.error(err);

				return res
					.response({
						message: err,
					})
					.code(500);
			}
		},
	});

	server.route({
		method: 'GET',
		path: '/char/{name}',
		handler: (req, res) => {
			try {
				if (IsInCharList(req.params.name)) {
					return res.response(PullData(req.params.name)).code(200);
				} else {
					return res
						.response({
							message: 'Char not found',
						})
						.code(400);
				}
			} catch (err) {
				console.error(err);
				return res
					.response({
						message: err,
					})
					.code(500);
			}
		},
	});

	// Todo resole path types { separe into a new one like Charlist to be indexable }

	server.route({
		method: 'GET',
		path: '/char/{name}/{field}',
		handler: (req, res) => {
			try {
				if (IsInCharList(req.params.name)) {
					if (typeof req.params.field !== 'string')
						return res
							.response({ message: 'Argument must be a string' })
							.code(400);
					let temp = req.params.field;
					return res.response(PullData(req.params.name)[temp]).code(200);
				} else {
					return res
						.response({
							message: 'Null',
						})
						.code(404);
				}
			} catch (err) {
				return res
					.response({
						message: err,
					})
					.code(500);
			}
		},
	});

	await server.start();
	console.log('Server Running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
	console.error(err);
	process.exit(1);
});

init();
