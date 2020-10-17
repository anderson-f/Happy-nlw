const { test, trait } = use("Test/Suite")("Session");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

/* a pasta pra rodar os testes tem nomes especificos */

trait("Test/ApiClient");

test("it should return JWT token when session created", async ({
  assert,
  client,
}) => {
  const sessionPayload = {
    email: "andersonfreitas.tec@gmail.com",
    password: "123456",
  };
  const user = await Factory.model("App/Models/User").create(sessionPayload);

  const response = await client
    .post("/sessions")
    .send({
      email: "andersonfreitas.tec@gmail.com",
      password: "123456",
    })
    .end();

  console.log(response.body.token);

  response.assertStatus(200);
  assert.exists(response.body.token);
});
