const { truncateTable } = require("../helpers/prepTestDB");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return truncateTable('user_letterboxd_watched')
    .then(function () {
      // Inserts seed entries
      return knex('user_letterboxd_watched').insert([
        {
          date: new Date("2012-09-20" + "Z"),
          name: "Pulp Fiction",
          year: 1994,
          user_id: 3
        },
        {
          date: new Date("2012-09-20" + "Z"),
          name: "The Dark Knight Rises",
          year: 2012,
          user_id: 3
        },
      ]);
    });
};