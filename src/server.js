require('dotenv').config();
// Made by mdavap

const hapi = require('@hapi/hapi');

const registerAlbum = require('./plugins/album');
const registerSong = require('./plugins/song');

const { RequestError } = require('./exceptions');

const init = async () => {
  const { HOST, PORT } = process.env;

  const server = hapi.server({
    host: HOST,
    port: PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([registerAlbum(), registerSong()]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    // Forward any Error
    if (response instanceof Error) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      // Is our Error? get the status of it else set to internal server error aka 500
      newResponse.code(response instanceof RequestError ? response.statusCode : 500);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();

  console.log(`Server ran at ${server.info.uri}`);
};

init();
