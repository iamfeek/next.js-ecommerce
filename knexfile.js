module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './db/test.sqlite',
    },
    migrations: {
      directory: './db/migrations',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'sqlite3',
    connection: () => ({
      filename: process.env.SQLITE_FILENAME,
    }),
    useNullAsDefault: true,
  },
};
