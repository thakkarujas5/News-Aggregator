const Ajv = require('ajv')
const ajv = new Ajv({
    allErrors: true
});
const addFormats = require('ajv-formats');
addFormats(ajv);
const user = require('../../src/schema/user')
const validateUser = ajv.compile(user);
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../src/app');
const expect = require('chai').expect;

describe('Logging in a user', () => {

    beforeEach((done) => {

        const userdata = {
            name: "ujas",
            email: "thakkarujas5@gmail.com",
            password: "password"
        }
        chai.request(server).post('/register').send(userdata).end((err, res) => {
        done();
        });
    });

    it('Successful Login', (done) => {

        const loginData = {
            email: "thakkarujas5@gmail.com",
            password: "password"
        }

        chai.request(server).post('/login').send(loginData).end((err,res) => {
            expect(res.status).equal(200);
            done()
        })

    })

    it('Incorrect Login Credentials', (done) => {

        const loginData = {
            email: "thakkarujas5@gmail.com",
            password: "passwo"
        }

        chai.request(server).post('/login').send(loginData).end((err,res) => {
            expect(res.status).equal(401);
            expect(res.body.message).equal('Invalid email or password')
            done()
        })

    })
})