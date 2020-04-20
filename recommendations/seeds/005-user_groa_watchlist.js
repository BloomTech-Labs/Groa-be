const { truncateTable } = require("../helpers/prepTestDB");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return truncateTable('user_groa_watchlist')
    .then(function () {
      // Inserts seed entries
      return knex('user_groa_watchlist').insert([
        {
          date: new Date("2012-09-20" + "Z"),
          name: "Shame",
          year: 2011,
          user_id: 3
        },
        {
          date: new Date("2012-09-20" + "Z"),
          name: "Moneyball",
          year: 2011,
          user_id: 3
        }
      ]);
    });
};
