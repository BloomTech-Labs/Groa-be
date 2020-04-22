exports.up = function(knex) {
  return knex.schema.createTable("user_groa_ratings", tbl => {
    tbl.increments();
    tbl.date("date");
    tbl.string("name");
    tbl.integer("year");
    tbl.float("rating");
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_groa_ratings");
};
