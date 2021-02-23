const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');


describe('GET /apps', () => {
    it('should not run query without rating or App', () => {
        return supertest(app)
            .get('/apps')
            .expect(400, 'Sort must be one of App or rating')
            ;
            
            
    })
    it('should be 400 if query is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'MISTAKE' })
            .expect(400, 'Sort must be one of App or rating');
    });
    it('should sort by genre', (done) => {
        return supertest(app)
            .get('/apps')
            .query({ genres: 'Arcade' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;

                let i = 0;
                // iterate once less than the length of the array
                // because we're comparing 2 items in the array at a time
                while (i < res.body.length - 1) {
                    // compare app at `i` with next app at `i + 1`
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i + 1];
                    // if the next app is less than the app at i,
                    if (appAtIPlus1.title < appAtI.title) {
                        // the books were not sorted correctly
                        sorted = false;
                        break; // exit the loop
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            })
            .then(done())
    });
})