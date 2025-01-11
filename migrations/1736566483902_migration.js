/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('albums', {
        id: {
            type: 'text',
            primaryKey: true
        },
        name: {
            type: 'text',
            notNull: true
        },
        year: {
            type: 'integer',
            notNull: true
        }
    });

    pgm.createTable('songs', {
        id: {
            type: 'text',
            primaryKey: true
        },
        title: {
            type: 'text',
            notNull: true
        },
        year: {
            type: 'integer',
            notNull: true
        },
        genre: {
            type: 'text',
            notNull: true
        },
        performer: {
            type: 'text',
            notNull: true
        },
        duration: {
            type: 'integer'
        },
        albumid: {
            type: 'text',
            references: '"albums"',
            onDelete: 'cascade',
        }
    });
    pgm.createIndex('songs', 'albumid');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('songs');
    pgm.dropTable('albums');
};
