const postgres = require('postgres');
const vercelPostgres = require('@vercel/postgres');

const connectionString = process.env.POSTGRES_URL;
const localDatabase =
  connectionString &&
  ['localhost', '127.0.0.1', '::1'].includes(new URL(connectionString).hostname);

function createLocalClient() {
  const client = postgres(connectionString);
  const localSql = (strings, ...values) =>
    client(strings, ...values).then((rows) => {
      Object.defineProperties(rows, {
        rows: { value: rows },
        rowCount: { value: rows.length },
      });
      return rows;
    });
  const query = (text, values = []) =>
    client.unsafe(text, values).then((rows) => ({
      rows,
      rowCount: rows.length,
    }));
  localSql.query = query;

  const database = {
    sql: localSql,
    query,
    connect: async () => ({
      sql: localSql,
      query,
      end: () => client.end(),
    }),
  };

  return { ...database, db: database };
}

module.exports = localDatabase ? createLocalClient() : vercelPostgres;
