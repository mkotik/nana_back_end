exports.up = async function (knex) {
  await knex.schema.createTable("shipping_options", (tbl) => {
    tbl.increments("shipping_id");
    tbl.string("shipping_name").notNullable();
    tbl.float("cost").unsigned().notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("shipping_options");
};
