test("GET para /api/v1/status deve retornar 200", async () => {
  const resposta = await fetch("http://localhost:3000/api/v1/status");
  expect(resposta.status).toBe(200);

  const responseBody = await resposta.json();
  expect(responseBody.update_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toBe(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version_postgres).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
