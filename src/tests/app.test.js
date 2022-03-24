const app = require('../server/app.js')
const request = require('supertest')

describe('api server', () => {
    let api;
    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log("Test server running on port 8000")
        })
    })

   afterAll((done) => {
        console.log("Stop test server")
        api.close(done)
    })

    test("responds to get / with status 200", (done) => {
        request(api)
            .get('/')
            .expect(200, done)
    })

    test("responds to get /posts with status 200", (done) => {
        request(api)
            .get('/posts')
            .expect(200,done)
    })

//     test('responds to post /post with status 201 and returns a post with a new ID', (done) => {
//         let testPost = {"value":'anisha' }
//         request(api)
//             .post('/post') 
//             .send(testPost) 
//             .set('Accept', 'application/json')
//             .expect(201)
//             .expect({id: 1, ...testPost}, done) 
//     })
    
})
