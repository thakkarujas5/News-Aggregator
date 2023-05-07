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

describe('Registering a New User', () => {

    it('Creates a new user successfully', (done) => {

        const userdata = {
            name: "ujas",
            email: "thakkarujas5@gmail.com",
            password: "password"
        }

        chai.request(server).post('/register').send(userdata).end((err,res) => {
            expect(res.status).equal(200);
            expect(res.body.message).equal('User registered successfully');
            done()
        })
    })

    it('Incorrect Email Format while registering', (done) => {

        const userdata = {
            name: "ujas",
            email: "thakkarujas5gmail.com",
            password: "password"
        }

        chai.request(server).post('/register').send(userdata).end((err,res) => {
            expect(res.status).equal(400);
            expect(res.body.errors[0].message).equal('must match format "email"');
            done()
        })

    })

    it('Password length less than 8 characters', (done) => {

        const userdata = {
            name: "ujas",
            email: "thakkarujas5@gmail.com",
            password: "passw"
        }

        chai.request(server).post('/register').send(userdata).end((err,res) => {
            expect(res.status).equal(400);
            expect(res.body.errors[0].message).equal('must NOT have fewer than 6 characters');
            done()
        })

    })
});