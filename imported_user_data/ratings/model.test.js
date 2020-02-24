const db = require("../../database/dbConfig.js");
const prepTestDB = require("../../helpers/prepTestDB.js");

const {} = require("./model.js");

beforeEach(prepTestDB);
beforeEach(async () => await db("ratings").del());

describe("ratings model", () => {
  it("", () => {});
});
