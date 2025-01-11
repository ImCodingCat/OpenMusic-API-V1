const AlbumApi = require('../api/albums');
const AlbumService = require('../services/AlbumService');
const AlbumValidator = require('../validator/album');
// Made by mdavap

function registerAlbum() {
  const Service = new AlbumService();

  return {
    plugin: AlbumApi,
    options: {
      service: Service,
      validator: AlbumValidator,
    },
  };
}

module.exports = registerAlbum;
