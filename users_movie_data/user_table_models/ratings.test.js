const db = require("../../../database/dbConfig.js");
const { prepTestingDB } = require("../../../helpers/prepTestDB.js");

const { addRating, getRatingById, getRatings } = require("./ratings.js");

beforeAll(async() => {
  prepTestingDB("user_groa_ratings")
  prepTestingDB("users")
  await db.seed.run({ specific: '001-users.js' })
});


const rating1 = {
  date: new Date("2020-02-14" + "Z"),
  name: "The Princess Bride",
  year: Number("1987"),
  rating: Number("3.5"),
  user_id: 2
};
const rating2 = {
  date: new Date("2020-02-14" + "Z"),
  name: "Aladdin",
  year: Number(1992),
  rating: Number("4"),
  user_id: 2
};

describe("letterboxd ratings model", () => {
  it("should insert the provided rating into the db", async () => {
    await addRating(rating1)
    let rating = await getRatingById(1)
    expect(rating.name).toBe("The Princess Bride");
    expect(rating.year).toBe(1987);
    expect(rating.rating).toBe(3.5);

     await addRating(rating2);
    rating = await getRatingById(2)
    expect(rating.name).toBe("Aladdin");
    expect(rating.year).toBe(1992);
    expect(rating.rating).toBe(4);

    let ratings = await db("user_groa_ratings");
    expect(ratings).toHaveLength(2);
  });

  it("should return the ratings for a given user", async () => {
    await addRating(rating1);
    await addRating(rating2);
    let ratings = await getRatings(2);
    expect(ratings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Aladdin" }),
        expect.objectContaining({ name: "The Princess Bride" }),
        expect.objectContaining({ user_id: 2 })
      ])
    )
  });
  // will continue to add tests and model functions if more functionality is needed.
});
