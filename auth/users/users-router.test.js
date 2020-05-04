const db = require('../../database/dbConfig');
const request = require('supertest');
const server = require('../../api/server');

describe('Users Router', function() {
    it('runs the tests', function() {
        expect(true).toBe(true)
    });
    describe('test environment', function() {
        it('should use the test environment', function() {
            expect(process.env.DB_ENV).toBe('testing')
        });
    });
    beforeEach(async function() {
        await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');

    });
    afterEach(async function() {
        await db.raw('TRUNCATE user_ratings RESTART IDENTITY CASCADE');
    })
    describe('POST /api/users/register', function() {
        it ('should register a user', async function() {
            await request(server)
                .post('/api/users/register')
                .send(
                    { 
                        firstName: 'user1111111111255', 
                        lastName: 'passwor1111111d251',
                        email: 'namee11112151ee@email.com'
                    }
                )
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                    expect(res.body).toContain(expect.objectContaining(
                        {
                            "message": expect.any(String),
                            "user_id": expect.any(Number),
                            "okta_id": expect.any(String),
                        }
                    ));
                })
        });
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
})