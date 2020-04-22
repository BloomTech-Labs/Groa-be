exports.up = function(knex) {
    return knex.schema.createTable("user_groa_watchlist", tbl => {
      tbl.increments();
      tbl.string("name");
      tbl.date("date");
      tbl.integer("year");
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
    return knex.schema.dropTableIfExists("user_groa_watchlist");
  };
  