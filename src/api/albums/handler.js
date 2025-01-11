const autoBind = require('auto-bind');
const formatter = require('../../formatter');
// Made by mdavap

class AlbumHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async createAlbum(request, h) {
    const { payload } = request;

    this._validator.validate(payload);

    const albumId = await this._service.addAlbum(payload);

    return h.response(formatter(true, undefined, { albumId })).code(201);
  }

  async getAlbums(request, h) {
    const albums = await this._service.getAlbum();

    return h.response(formatter(true, undefined, { albums })).code(200);
  }

  async getAlbum(request, h) {
    const { albumId } = request.params;

    const album = await this._service.getAlbum(albumId);

    return h.response(formatter(true, undefined, { album })).code(200);
  }

  async updateAlbum(request, h) {
    const { albumId } = request.params;
    const { payload } = request;

    this._validator.validate(payload);

    const updatedAlbum = await this._service.updateAlbum(albumId, payload);

    return h.response(formatter(true, 'Album has been updated', { album: updatedAlbum })).code(200);
  }

  async deleteAlbum(request, h) {
    const { albumId } = request.params;

    await this._service.deleteAlbum(albumId);

    return h.response(formatter(true, 'Album has been deleted')).code(200);
  }
}

module.exports = AlbumHandler;
