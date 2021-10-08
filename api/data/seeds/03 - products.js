const products = [
  {
    name: "Sweet Orange Hibiscus",
    description:
      "Saponified 100% Extra Virgin Olive Oil, Virgin Coconut Oil, Castor Oil, Avocado Oil, Shea Butter, Rose Kaolin Clay, Ground Annatto, Turmeric,  Hibiscus Tea and an Essential Oil Blend of Sweet Orange, Lemongrass, Rosemary and Cedarwood. ",
    price: 8.0,
    featured: true,
    smells_like: "Oranges",
    exfoliation: "None",
    inventory: 30,
    category: 1,
  },
  {
    name: "Lavender",
    description:
      "Saponified 100% Extra Virgin Olive Oil, Virgin Coconut Oil, Castor Oil, Avocado Oil, Shea Butter, Kaolin Clay, Alkanet Root, Fresh Lavender Buds & an Essential Oil Blend of Lavender, Peru Balsam, Bergamot, Clary Sage and Cedarwood. ",
    price: 8.0,
    featured: true,
    smells_like: "Lavender",
    exfoliation: "Light",
    inventory: 25,
    category: 1,
  },
  {
    name: "Honeycomb",
    description:
      "Saponified 100% Extra Virgin Olive Oil, Virgin Coconut Oil, Castor Oil, Avocado Oil, Shea Butter, Kaolin Clay, Oatmeal, Turmeric & Raw Honey. ",
    price: 9.0,
    featured: true,
    smells_like: "Honey",
    exfoliation: "None",
    inventory: 22,
    category: 2,
  },
  {
    name: "Pink Himalayan Salt",
    description:
      "Saponified 100% Extra Virgin Olive Oil, Virgin Coconut Oil, Castor Oil, Avocado Oil, Shea Butter, Kaolin Clay, Pink Himalayan Salt and an Essential Oil Blend of Eucalyptus, Rosemary, Lemongrass, Spearmint and Cedarwood.",
    price: 9.0,
    featured: true,
    smells_like: "Cedarwood",
    exfoliation: "Medium",
    inventory: 25,
    category: 2,
  },
  {
    name: "Mint & Thyme",
    description:
      "Saponified 100% Extra Virgin Olive Oil, Virgin Coconut Oil, Castor Oil, Avocado Oil, Shea Butter, Kaolin Clay, Fresh Thyme, Dried Peppermint Leaves & an Essential Oil Blend of Peppermint, Spearmint, Thyme, Lavender and Cedarwood. ",
    price: 9.0,
    featured: false,
    smells_like: "Cedarwood",
    exfoliation: "None",
    inventory: 17,
    category: 3,
  },
  {
    name: "Spearmint Loofah",
    description:
      "Saponified 100% Extra Virgin Olive Oil, Virgin Coconut Oil, Castor Oil, Avocado Oil, Shea Butter, Kaolin Clay, Chlorella, Chlorophyl,  Loofah Sponge & an Essential Oil Blend of Spearmint, Peppermint, Eucalyptus and Cedarwood. ",
    price: 10.0,
    featured: true,
    smells_like: "Peppermint",
    exfoliation: "High",
    inventory: 22,
    category: 3,
  },
];

exports.products = products;

exports.seed = function (knex) {
  return knex("products").insert(products);
};
