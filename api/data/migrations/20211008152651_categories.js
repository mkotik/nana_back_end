exports.up = async function (knex) {
  await knex.schema.createTable("categories", (tbl) => {
    tbl.increments("category_id");
    tbl.string("category_name").unique().notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("categories");
};
