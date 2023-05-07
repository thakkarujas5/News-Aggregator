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
const sinon = require('sinon');
const axios = require('axios');

describe('Get News API', () => {

    let token;

    beforeEach((done) => {


        const userdata = {
            name: "ujas",
            email: "thakkarujas5@gmail.com",
            password: "password"
        }

        const loginData = {
            email: "thakkarujas5@gmail.com",
            password: "password"
        }

        const pref = {
            q: "sports"
        }
        chai.request(server).post('/register').send(userdata).end((err, res) => {
        });

        chai.request(server).post('/login').send(loginData).end((err,res) => {
            token = res.body.token;
        })

        chai.request(server).put('/preferences').set('Authorization', `Bearer ${token}`).send(pref).end((err,res) => {
            done()
        })
    });

    it('Got News Successful',  (done) => {

        chai.request(server).get('/news').set('Authorization', `Bearer ${token}`).end((err,res) => {

            expect(res.status).equal(200)
            done()
        })
    })
})