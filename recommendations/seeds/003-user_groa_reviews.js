const { truncateTable } = require("../helpers/prepTestDB");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return truncateTable('user_groa_reviews')
    .then(function () {
      // Inserts seed entries
      return knex('user_groa_reviews').insert([
        {
          date: new Date("2012-09-20" + "Z"),
          name: "Reservoir Dogs",
          year: 1992,
          rating: 3.5,
          user_id: 3,
          rewatch: "",
          review:
            "No film before or since has embraced nihilism so willingly and made you enjoy it so much (hopefully, to some shame.) I'm not convinced there is any point to this movie but to be a movie, and that job it does quite well and provides a little context to Tarantino's later films.",
          tags: "",
          watched_date: ""
        },
        {

          date: new Date("2012-09-20" + "Z"),
          name: "Singin' in the Rain",
          year: 1952,
          rating: 3.5,
          rewatch: "",
          review:
            "The best of comedy, joy and wonder, distilled to perfection. It took me half an hour to wipe the smile off my face; this is a must-see classic.",
          tags: "",
          watched_date: "",
          user_id: 3
        },
      ]);
    });
};