//const app = require('./Server');
//const request = require('supertest');
import app from './Server'
import supertest from 'supertest'
//const mongoose = require('mongoose')
import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();
//const databaseName = 'test'

/*beforeAll(async () => {

    //const url = `mongodb://127.0.0.1/${databaseName}`
    await mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true })
})*/

const request=supertest(app);


const test_user = "test";
const test_pw = "testtest";
//get token
//const token_req = request.post('/users/login').send('{"username": "test","password": "testtest"}').set('Accept', 'application/json').set('Content-Type', 'raw').end(function(err,res){ return res })
//const token = token_req.body.json();
let token;
//get the login token
// let token;
// function get_token(){
//     console.log("get token called")
//     /* const response = await request.post('/users/login')
//         .send({"username": "test","password": "testtest"})
//         .set('Accept', 'application/json')
//         .then() */
//     const response = request.post('/users/login')
//         .send({"username": "test","password": "testtest"})
//         .expect(200)
//         .set('Accept', 'application/json')
//         .then(res => console.log("in then", res)).catch(err => console.log(err));
//
//     response.then(res => console.log("in then", res)).catch(err => console.log(err))
//
//     console.log("body:", response)
// };
async function get_token() {
    console.log("before await")
    await new Promise(r => setTimeout(r, 5000));
    console.log("after await")

    let response = await request.post('/users/login')
        .send({'username':'test','password':'testtest'})
        .set('Accept','application/json');
}

//get_token().then(res => console.log(res)).catch(err => console.log(err));

it('Get token', async done => {
    const res = await request.post('/users/login')
        .send({'username':'test','password':'testtest'})

    console.log("Token res: ", res)

    done()

})



it('Test of root path', async done => {
    const response = await request.get('/');

    expect(response.status).toBe(200)

    done();
})


/*
describe('GET /', () => {
    it('responds with 200', async () => {
        await request(app)
            .get('/')
            .expect(200);
    });
})*/
