const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;
const connection = knex(config);

// Rodar "npx knex migrate:latest" no terminal para criar banco de dados.

module.exports = connection;