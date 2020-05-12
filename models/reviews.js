const db = require("../database/dbConfig.js");

module.exports = {
  addReview,
  getReviews,
  getReviewById,
  getMovieByName,
  addUploadReview,
};

async function addReview(review) {
  await db("user_reviews")
    .select("*")
    .where("movie_id", review.movie_id)
    .andWhere("user_id", review.user_id)
    .then((reviews) => {
      if (reviews.length === 0) {
        return db("user_reviews").insert(review, "id");
      } else {
        return db("user_reviews")
          .where("movie_id", review.movie_id)
          .andWhere("user_id", review.user_id)
          .update("review", review.review, "id");
      }
    });
}

function getReviews(user_id) {
  return db("user_reviews").where("user_id", user_id);
}

function getReviewById(id) {
  return db("user_reviews").where("id", id).first();
}

function getMovieByName(upload) {
  return db("movies as m")
    .select("movie_id")
    .where("primary_title", upload.primary_title)
    .andWhere("start_year", upload.start_year);
}

async function addUploadReview(review) {
  let movie_id = getMovieByName(review);
  await db("user_reviews")
    .select("*")
    .where("movie_id", movie_id)
    .andWhere("user_id", review.user_id)
    .then((reviews) => {
      if (reviews.length === 0) {
        return db("user_reviews").insert(review, "review_id");
      } else {
        return db("user_reviews")
          .where("movie_id", movie_id)
          .andWhere("user_id", review.user_id)
          .update("review_text", review.review_text, "review_id");
      }
    });
}
