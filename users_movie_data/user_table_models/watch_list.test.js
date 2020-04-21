const db = require("../../../database/dbConfig.js");
const { prepTestingDB } = require("../../../helpers/prepTestDB.js");

const {
  addToWatchList,
  getWatchlist,
  getListItemById
} = require("./watch_list.js");

beforeEach(async () => {
  prepTestingDB("user_groa_watchlist");
  prepTestingDB("users");
  await db.seed.run({ specific: "001-users.js" });
  await db.seed.run({ specific: "007-imdb_movies.js" });
});

const watch_list1 = {
  date: new Date("2012-09-20" + "Z"),
  name: "Shame",
  year: Number("2011"),
  user_id: Number(2)
};
const watch_list2 = {
  date: new Date("2012-09-20" + "Z"),
  name: "Moneyball",
  year: Number(2011),
  user_id: Number(2)
};

describe("letterboxd watch_list model", () => {
  it("should insert the provided watch_list into the db", async () => {
    await addToWatchList(watch_list1);
    let watch_list = await getListItemById(1);
    expect(watch_list.name).toBe("Shame");
    expect(watch_list.year).toBe(2011);

    await addToWatchList(watch_list2);
    watch_list = await getListItemById(2);
    expect(watch_list.name).toBe("Moneyball");
    expect(watch_list.year).toBe(2011);

    let watchList = await db("user_groa_watchlist");
    expect(watchList).toHaveLength(2);
  });

  it("should return the watchlist for a given user", async () => {
    await addToWatchList(watch_list1);
    await addToWatchList(watch_list2);
    let watchlist = await getWatchlist(2);
    expect(watchlist).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Shame" }),
        expect.objectContaining({ name: "Moneyball" }),
        expect.objectContaining({ user_id: 2 })
      ])
    );
  });
  // will continue to add tests and model functions if more functionality is needed.
});
