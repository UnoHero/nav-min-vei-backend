const server = require('./mainServer/app.js');
const skattServer = require("./Skatt-Server/app.js")
const folkRegServer = require("./FolkReg-Server/app.js")
const aaRegServer = require("./aaReg-Server/app.js")
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

it('GET /user should show all users', async () => {
    const res = await requestWithSupertest.get('/user/30101163190');
      expect(res.status).toEqual(202);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toHaveProperty('firstName')
      console.log(res.body.firstName)
});

it('GET /user should return http:400 when user not found', async () => {
    const userId = "3010116190"
    const res = await requestWithSupertest.get(`/user/${userId}`);
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.error).toEqual(`Cannot find user with specified id: ${userId}`)
});