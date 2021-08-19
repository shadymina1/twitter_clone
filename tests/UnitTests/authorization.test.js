const {StatusCodes} = require("http-status-codes");
const faker = require('faker');
const User = require('./../../Models/User');
const md5 = require("md5");
const Login = require('../../apis/authorization/login');
const connect = require('../../storage/mongo/connect');
describe('Authorization', () => {
    beforeEach(async () => {
        connect();
        await User.remove({});
    });

    it('should login user', async () => {
        const userName = faker.name.firstName();
        const password = faker.internet.password();
        process.env.JWT_SECRET = 123123123;
        process.env.JWT_EXPIRE = "50h";
        const user = new User(
            {
                userName: userName ,
                password : md5(password)
            });
        await user.save();
        const newUser = await Login(userName ,password);
        expect(newUser).toHaveProperty('token');
        expect(newUser.user.userName).toEqual(userName);
    });
})
