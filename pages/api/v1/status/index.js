import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const showPostgresVersion = await database.query("SHOW server_version;");
  const versionPostgres = showPostgresVersion.rows[0].server_version;

  const showPostgresMaxConnections = await database.query(
    "SHOW MAX_CONNECTIONS;"
  );
  const maxConnections = showPostgresMaxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const showPostgresConnections = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const currentConnections = showPostgresConnections.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version_postgres: versionPostgres,
        max_connections: Number(maxConnections),
        opened_connections: Number(currentConnections),
      },
    },
  });
}

export default status;
