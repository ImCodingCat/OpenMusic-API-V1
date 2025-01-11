const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.createAlbum,
  },
  {
    method: 'GET',
    path: '/albums',
    handler: handler.getAlbums,
  },
  {
    method: 'GET',
    path: '/albums/{albumId}',
    handler: handler.getAlbum,
  },
  {
    method: 'PUT',
    path: '/albums/{albumId}',
    handler: handler.updateAlbum,
  },
  {
    method: 'DELETE',
    path: '/albums/{albumId}',
    handler: handler.deleteAlbum,
  },
];

module.exports = routes;
