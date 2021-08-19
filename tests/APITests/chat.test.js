const app = require('../../app');
const supertest = require('supertest');
const {StatusCodes} = require("http-status-codes");
const faker = require('faker');
const User = require('./../../Models/User');
const Message = require('./../../Models/Message');
const md5 = require("md5");

let token;
let receiver_id;
let sender_id;

describe('Chat', () => {

    beforeAll(async () => {
        const userName1 = faker.name.firstName();
        const password1 = faker.internet.password();
        const userName2 = faker.internet.email();
        const password2 = faker.internet.password();
        let user1 = new User(
            {
                userName: userName1 ,
                password : md5(password1)
            });
        user1 = await user1.save();
        let user2 = new User(
            {
                userName: userName2 ,
                password : md5(password2)
            });
        user2 = await user2.save();
        receiver_id = user2._id;
        sender_id = user1._id;

        await supertest(app)
            .post('/api/login')
            .send({
                userName : userName1 ,
                password : password1
            }).then((res)=>{
                token = JSON.parse(res.text).token;
            });
    });

    beforeEach(async () => {
        await Message.remove({});
    });

    it('Send Message', async () => {
        const text = faker.name.firstName()
        await supertest(app)
            .post('/api/message')
            .set('Authorization', token)
            .send({
                receiver_id : receiver_id ,
                text : text
            }).expect((response) => {
                expect(JSON.parse(response.text).data.message.text).toEqual(text);
                expect(JSON.parse(response.text).data.message.sender_id.toString()).toEqual(sender_id.toString());
                expect(JSON.parse(response.text).data.message.receiver_id.toString()).toEqual(receiver_id.toString());
                expect(response.statusCode).toEqual(StatusCodes.CREATED);
            });
    });

    it('Get Message', async () => {
        const text = faker.name.firstName()
        let message = new Message(
            {
                receiver_id: receiver_id ,
                sender_id : sender_id,
                text : text
            });
        await message.save();
        await supertest(app)
            .get('/api/message')
            .set('Authorization', token)
            .send({
                receiver_id : receiver_id
            }).expect((response) => {
                expect(JSON.parse(response.text).data.message[0].text).toEqual(text);
                expect(JSON.parse(response.text).data.message[0].sender_id.toString()).toEqual(sender_id.toString());
                expect(JSON.parse(response.text).data.message[0].receiver_id.toString()).toEqual(receiver_id.toString());
                expect(response.statusCode).toEqual(StatusCodes.OK);
            });
    });
})
