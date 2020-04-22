const db = require("../../database/dbConfig.js");

module.exports = {
  addReview,
  getReviews,
  getReviewById,
};

async function addReview(review) {
  await db("user_reviews")
    .select("*")
    .where("name", review.name)
    .andWhere("year", review.year)
    .andWhere("user_id", review.user_id)
    .then((reviews) => {
      if (reviews.length === 0) {
        return db("user_reviews").insert(review, "id");
      } else {
        return db("user_reviews")
          .where("name", review.name)
          .andWhere("year", review.year)
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
