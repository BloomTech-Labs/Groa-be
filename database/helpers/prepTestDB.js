const db = require("../dbConfig.js");

module.exports = {
  prepTestingDB,
  truncateTable,
};
/**
 * Preps the testing DB but truncating a choosen table, and running seed data
 * @param {string} table_name - matches the table name you'd like to truncate
 */
async function prepTestingDB(table_name) {
  await db.raw(`TRUNCATE ${table_name} RESTART IDENTITY CASCADE`);
}
async function truncateTable(table_name) {
  await db.raw(`TRUNCATE ${table_name} RESTART IDENTITY CASCADE`);
}
