const db = require("../database/dbConfig.js");
const { prepTestingDB } = require("../../helpers/prepTestDB.js");

const { addReview, getReviews, getReviewById } = require("./reviews.js");

beforeAll(async () => {
  prepTestingDB("user_reviews");
  prepTestingDB("users");
  await db.seed.run({ specific: "001-users.js" });
});

const review1 = {
  date: new Date("2012-09-20" + "Z"),
  name: "Reservoir Dogs",
  year: Number("1992"),
  rating: Number("3.5"),
  user_id: Number(2),
  rewatch: "",
  review:
    "No film before or since has embraced nihilism so willingly and made you enjoy it so much (hopefully, to some shame.) I'm not convinced there is any point to this movie but to be a movie, and that job it does quite well and provides a little context to Tarantino's later films.",
  tags: "",
  watched_date: "",
};

const review2 = {
  date: new Date("2012-09-20" + "Z"),
  name: "Singin' in the Rain",
  year: Number("1952"),
  rating: Number("3.5"),
  rewatch: "",
  review:
    "The best of comedy, joy and wonder, distilled to perfection. It took me half an hour to wipe the smile off my face; this is a must-see classic.",
  tags: "",
  watched_date: "",
  user_id: Number(2),
};

describe("letterboxd reviews model", () => {
  it("should insert the provided reviews into the db", async () => {
    await addReview(review1);
    let review = await getReviewById(1);
    expect(review.name).toBe("Reservoir Dogs");
    expect(review.year).toBe(1992);
    expect(review.rating).toBe(3.5);

    await addReview(review2);
    review = await getReviewById(2);
    expect(review.name).toBe("Singin' in the Rain");
    expect(review.year).toBe(1952);
    expect(review.rating).toBe(3.5);

    let reviews = await db("user_groa_reviews");
    expect(reviews).toHaveLength(2);
  });

  it("should return the reviews for a given user", async () => {
    await addReview(review1);
    await addReview(review2);
    let ratings = await getReviews(2);
    expect(ratings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Reservoir Dogs" }),
        expect.objectContaining({ name: "Singin' in the Rain" }),
        expect.objectContaining({ user_id: 2 }),
      ])
    );
  });
  // will continue to add tests and model functions if more functionality is needed.
});
