
exports.up = function(knex) {
  return knex.schema.createTable("recommendations", tbl => {
  tbl
  .integer("user_id")
  .unsigned()
  .notNullable()
  .references("id")
  .inTable("users")
  .onDelete("CASCADE")
  .onUpdate("CASCADE");
    tbl.string("recommendation_id");
    tbl.json("recommendation_json");
    tbl.date("date");
    tbl.string("model_type");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recommendations");
};
