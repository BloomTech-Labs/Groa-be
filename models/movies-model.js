const db = require("../database/dbConfig.js");

module.exports = {
  getAllMovies,
};

function getAllMovies(user_id) {
  return db("movies as m")
    .where("title_type", "movie")
    .select("*")
    .whereNotNull("m.average_rating")
    .whereNotNull("m.poster_url")
    .whereNotNull("m.num_votes")
    .orderBy("m.num_votes", "desc");
}
