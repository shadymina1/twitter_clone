const supertest = require('supertest');
const app = require('../../app');
const {StatusCodes} = require("http-status-codes");
const faker = require('faker');
const User = require('./../../Models/User');
const md5 = require("md5");

describe('Authorization', () => {
    beforeEach(async () => {
        await User.remove({});
    });

    it('should register user', async () => {
        const userName = faker.name.firstName();
        const password = faker.internet.password();
        await supertest(app)
            .post('/api/register')
            .send({
                userName : userName ,
                password : password
            }).expect((response) => {
                expect(JSON.parse(response.text)).toHaveProperty('token');
                expect(JSON.parse(response.text).user.userName).toEqual(userName);
                expect(response.statusCode).toEqual(StatusCodes.CREATED);
            });
    });

    it('should login user', async () => {
        const userName = faker.name.firstName();
        const password = faker.internet.password();
        const user = new User(
            {
                userName: userName ,
                password : md5(password)
            });
        await user.save();
        await supertest(app)
            .post('/api/login')
            .send({
                userName : userName ,
                password : password
            }).expect((response) => {
                expect(JSON.parse(response.text)).toHaveProperty('token');
                expect(JSON.parse(response.text).user.userName).toEqual(userName);
                expect(response.statusCode).toEqual(StatusCodes.OK);
            });
    })
})
