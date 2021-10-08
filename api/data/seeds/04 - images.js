const images = [
  {
    image_url:
      "https://cdn.shopify.com/s/files/1/2537/8570/products/image_a78adf13-a48f-4b6f-a3fa-44cae08cfeb1_1024x1024@2x.jpg?v=1580161140",
    product_id: 1,
    primary: true,
  },
  {
    image_url:
      "https://cdn.shopify.com/s/files/1/2537/8570/products/image_72b679cd-103d-499e-a1b2-bbbbaf376aa0_1024x1024@2x.jpg?v=1592861647",
    product_id: 2,
    primary: true,
  },
  {
    image_url:
      "https://cdn.shopify.com/s/files/1/2537/8570/products/image_50a501ed-da8c-4689-a72d-62d708c3ebdb_1024x1024@2x.jpg?v=1629498732",
    product_id: 3,
    primary: true,
  },
  {
    image_url:
      "https://cdn.shopify.com/s/files/1/2537/8570/products/image_39369003-a042-4349-b496-b85b4ba0f4c1_1024x1024@2x.jpg?v=1559432792",
    product_id: 4,
    primary: true,
  },
  {
    image_url:
      "https://cdn.shopify.com/s/files/1/2537/8570/products/image_e13ffaba-9a5b-4e73-b672-203a53abbb0b_1024x1024@2x.jpg?v=1606328924",
    product_id: 5,
    primary: true,
  },
  {
    image_url:
      "https://cdn.shopify.com/s/files/1/2537/8570/products/image_d0137350-2a9e-4132-ab26-b36df54fecb3_1024x1024@2x.jpg?v=1616198839",
    product_id: 6,
    primary: true,
  },
];

exports.images = images;

exports.seed = function (knex) {
  return knex("images").insert(images);
};
