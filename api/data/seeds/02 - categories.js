const categories = [
  { category_name: "Body Bars" },
  { category_name: "Face Bars" },
  { category_name: "For Babies" },
  { category_name: "Gift Boxes" },
];

exports.categories = categories;

exports.seed = function (knex) {
  return knex("categories").insert(categories);
};
