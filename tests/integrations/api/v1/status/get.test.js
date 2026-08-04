test("GET para /api/v1/status deve retornar 200", async () => {
  const resposta = await fetch("http://localhost:3000/api/v1/status").then(
    (r) => {
      return r.status;
    }
  );

  expect(resposta).toBe(200);
});
