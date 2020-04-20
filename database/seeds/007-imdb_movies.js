const { truncateTable } = require("../helpers/prepTestDB");

exports.seed = function(knex) {
  return truncateTable("imdb_movies").then(function() {
    // Inserts seed entries
    return knex("imdb_movies").insert([
      {
        primary_title: "Aladdin",
        year: 1992,
        poster_url: "/mjKozYRuHc9j7SmiXmbVmCiAM0A.jpg"
      },
      {
        primary_title: "The Princess Bride",
        year: 1987,
        poster_url: "/gpxjoE0yvRwIhFEJgNArtKtaN7S.jpg"
      },
      {
        primary_title: "Shame",
        year: 2011,
        poster_url: "/mjKozYRuHc9j7SmiXmbVmCiAM0A.jpg"
      },
      {
        primary_title: "Moneyball",
        year: 2011,
        poster_url: "/mjKozYRuHc9j7SmiXmbVmCiAM0A.jpg"
      }
    ]);
  });
};
