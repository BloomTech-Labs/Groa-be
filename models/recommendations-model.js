const db = require("../database/dbConfig.js");

module.exports = {
  getLatestRecommendations,
  getAllRecommendations,
};

function getLatestRecommendations(id) {
  return db("recommendations as r")
    .join(
      "recommendations_movies as rm",
      "r.recommendation_id",
      "rm.recommendation_id"
    )
    .select(
      "r.user_id",
      "rm.num_recs",
      "rm.good_threshold",
      "rm.bad_threshold",
      "rm.harshness"
    )
    .where("r.user_id", id)
}

function getAllRecommendations(id) {
  return db("recommendations as r")
    .join(
      "recommendations_movies as rm",
      "r.recommendation_id",
      "rm.recommendation_id"
    )
    .join("movies as m", "rm.movie_id", "m.movie_id")
    .select("*")
    .where("r.user_id", id)
    .orderBy("r.date", "desc");
}
