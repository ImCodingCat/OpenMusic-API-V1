const { Pool } = require('pg');
const { InternalError, NotFoundError } = require('../exceptions');
const GenerateId = require('../generator/id');
// Made by mdavap

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = `album-${GenerateId()}`;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InternalError('Failed to add new album');
    }

    return result.rows[0].id;
  }

  async updateAlbum(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $2, year = $3 WHERE id = $1 RETURNING *',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Failed to update album. Id doesnt exist');
    }

    return result.rows;
  }

  async deleteAlbum(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Failed to delete album. Id doesnt exist');
    }
  }

  async getAlbum(id = undefined) {
    if (id) {
      let query = {
        text: 'SELECT * FROM albums WHERE id = $1',
        values: [id],
      };

      const albums = (await this._pool.query(query)).rows;

      if (!albums.length) {
        throw new NotFoundError('Album id doesnt exist');
      }

      query = {
        text: 'SELECT id, title, performer FROM songs WHERE albumid = $1',
        values: [id],
      };

      const [album] = albums;
      album.songs = (await this._pool.query(query)).rows;

      return album;
    }
    return (await this._pool.query('SELECT * FROM albums')).rows;
  }
}

module.exports = AlbumService;
