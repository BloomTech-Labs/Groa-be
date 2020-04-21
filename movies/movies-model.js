const db = require("../database/dbConfig.js");

module.exports = {
  getAllMovies,
};

function getAllMovies(user_id) {
  return db("movies as m")
    .where("title_type", "movie")
    .select(
      "m.movie_id as id",
      "m.primary_title as name",
      "m.start_year",
      "m.end_year",
      "m.runtime_minutes",
      "m.genres",
      "m.poster_url",
      "m.average_rating",
      "m.num_votes",
      "m.release_date",
      "m.original_language",
      "m.description",
      "m.trailer_url"
    )
    .whereNotNull("m.average_rating")
    .whereNotNull("m.poster_url")
    .whereNotNull("m.num_votes")
    .orderBy("m.num_votes", "desc");
}
