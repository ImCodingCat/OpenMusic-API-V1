const AlbumHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const Handler = new AlbumHandler(service, validator);
    server.route(routes(Handler));
  },
};
