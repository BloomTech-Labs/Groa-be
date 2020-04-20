const { truncateTable } = require("../helpers/prepTestDB");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return truncateTable('user_groa_ratings')
    .then(function () {
      // Inserts seed entries
      return knex('user_groa_ratings').insert([
        {
          date: new Date("2020-02-14" + "Z"),
          name: "Aladdin",
          year: 1992,
          rating: 4,
          user_id: 3
        },
        {
          date: new Date("2020-02-14" + "Z"),
          name: "The Princess Bride",
          year: 1987,
          rating: 3.5,
          user_id: 3
        },
      ]);
    });
};
