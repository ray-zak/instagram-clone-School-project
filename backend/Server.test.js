//const app = require('./Server');
//const request = require('supertest');
import app from './Server'
import supertest from 'supertest'
//const mongoose = require('mongoose')
import mongoose from 'mongoose'
import fs from 'fs';
import FormData from 'form-data'
import dotenv from "dotenv";
dotenv.config();

const request=supertest(app);

const test_user = "test";
const test_pw = "testtest";

let token;


describe('Get token', () => {
    it('Get token', async done => {
        jest.setTimeout(15000);

        const res = await request.post('/users/login')
            .send({'username':test_user,'password':test_pw})
            .expect(200)
            .then(response =>
            {
                //console.log("token response: ", response);
                token = response.body.token;
                console.log("token: ", token)
                done();
            })

        //token = res.body.token
        //console.log("token: ", token)

        //done()

        //expect(res.status).toBe(200)

        //console.log("Token res: ", res)

    })
})

describe('Basic tests', () => {
    it('Test of root path', async done => {
        const response = await request.get('/');

        expect(response.status).toBe(200)

        done();
    })
})


describe('Test Post', () => {
    let s3_url;
    let post_id;
    // let picture = fs.createReadStream('./test/test-image.jpg', 'utf8', function (err,data) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     //console.log(data);
    // });


    it('Upload Photo', async done => {
        //const formData = new FormData();
        //formData.append('file', picture);
        //console.log("make comment with token", token)
        //console.log("form ", formData.get());
        const res = await request.post('/posts/upload-image')
            .set({'Authorization': `Bearer ${token}`})
            .attach('file', './test/test-image.jpg')
            .expect(200)
            .then(response => {
                console.log("image upload: ", response.body)
                s3_url = response.body.Location;
            })
            .catch(err => {
                console.log(err)
                done(err)
            })

        console.log("s3 url: ", s3_url);

        done();
    })

    it('Make Post', async done => {
        let post = {caption: 'test image caption', imageURL: s3_url}

        const res = await request.post('/posts/add-post')
            .set({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'})
            .send(JSON.stringify(post))
            .expect(200)
            .then(response => {
                console.log("make post: ", response.body)
                post_id = response.body.post._id
                console.log("post id ", post_id)
            })
            .catch(err => {
                console.log(err)
                done(err)
            })

        done();
    })

    it('Make Comment', async done => {
        const res = await request.post('/posts/add-comment')
            .set({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'})
            .send(JSON.stringify({content: 'a test image comment', postId: post_id}))
            .expect(200)
            .then(response => {
                console.log("make comment: ", response.body)
            })
            .catch(err => {
                console.log(err)
                done(err)
            })

        done();
    })
})

describe('Test Follow/Unfollow', () => {
    it('test Unfollow test2', async done => {
        //const response = await request.get('/');

        //expect(response.status).toBe(200)

        done();
    })
    it('test Follow test2', async done => {

        done();
    })
})

/*
describe('GET /', () => {
    it('responds with 200', async () => {
        await request(app)
            .get('/')
            .expect(200);
    });
})*/

afterAll( () =>
{
    //we have to close the db, or else Jest sees open resources and can't close
    mongoose.disconnect();
})