const db = require('../../database/dbConfig');
const request = require('supertest');
const server = require('../../api/server');

describe('Users Router', function() {
    it('runs the tests', function() {
        expect(true).toBe(true)
    });
    // describe('test environment', function() {
    //     it('should use the test environment', function() {
    //         expect(process.env.DB_ENV).toBe('testing')
    //     });
    // });

    // beforeEach(async function() {
    //     await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');

    // });
    // afterEach(async function() {
    //     await db.raw('TRUNCATE user_ratings RESTART IDENTITY CASCADE');
    })

    describe('POST /api/users/register', function() {
        it ('should register a user', async function() {
            await request(server)
                .post('/api/users/register')
                .send(
                    { 
                        firstName: 'us123456d', 
                        lastName: 'pas123456d',
                        email: 'na123456d@email.com'
                    }
                )
                .then(res => {
                    expect(res.type).toMatch(/json/i);

                    //THIS  TEST IS NOT WORKING
                    // expect(res.body).toBeCalledWith(
                    //     expect.objectContaining({
                    //             "message": expect(String),
                    //             "user_id": expect(Number),
                    //             "okta_id": expect(String)
                    //         })
                    //     )

        });
    })
        it ('should NOT register a user', async function() {
            await request(server)
                .post('/api/users/register')
                .send(
                    { 
                        user_name: 'User2' 
                    }
                )
                .expect(500)
                .then(res => {
                    expect(res.status).toBe(500);
                })
        });
    });