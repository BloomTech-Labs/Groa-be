const db = require('../database/dbConfig')
const RECOMMENDATIONS = require('./recommendations-model')

describe('recommendations-model', function() {
    describe('test environment', function() {
        it('should use the test environment', function() {
            expect(process.env.DB_ENV).toBe('testing')
        });
    });


    describe('getLatestRecommendations(id)', function() {
    });

    describe('getAllRecommendations(id)', function() {
    });

})