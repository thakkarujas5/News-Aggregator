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

describe('Get Preferences', () => {


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

    it('Got Preferences Successfully' , (done) => {

        chai.request(server).get('/preferences').set('Authorization', `Bearer ${token}`).end((err,res) => {

            expect(res.status).equal(200);
            done()
        })

    })

    it('Wrong Header while getting preferences', (done) => {

        const length = token.length;
        const newString = token.substring(0, length - 1);

        chai.request(server).get('/preferences').set('Authorization', `Bearer ${newString}`).end((err,res) => {

            expect(res.status).equal(401);
            expect(res.body.message).equal('Invalid token')
            done()
        })
    })

    it('Authorization Header Missing', (done) => {

        const pref = {
            q: "sports"
        }

        chai.request(server).put('/preferences').send(pref).end((err,res) => {
            expect(res.status).equal(401);
            expect(res.body.message).equal('Authorization header missing')
            done()
        })


    })

    it('Invalid Authorization Header', (done) => {

        const pref = {
            q: "sports"
        }

        chai.request(server).put('/preferences').set('Authorization', `${token}`).send(pref).end((err,res) => {
            expect(res.status).equal(401);
            expect(res.body.message).equal('Invalid authorization header')
            done()
        })

    })

    it('Preferences not specified', (done) => {

        chai.request(server).put('/preferences').set('Authorization', `Bearer ${token}`).end((err,res) => {
            expect(res.status).equal(400);
            expect(res.body.message).equal('No Preferences')
            done()
        })


    })
})