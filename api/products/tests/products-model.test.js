const Products = require("../products-model");
const db = require("../../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

it("sanity check", () => {
  expect(true).not.toBe(false);
});

describe("products-model", () => {
  describe("getAllProducts", () => {
    test("returns 4 categories", async () => {
      const categories = await Products.getAllCategories();
      expect(categories).toHaveLength(4);
    });
    test("each category has the product property", async () => {
      const categories = await Products.getAllCategories();
      expect(categories[0]).toHaveProperty("products");
    });
    test("each product has the right properties", async () => {
      const categories = await Products.getAllCategories();
      expect(categories[0].products[0]).toHaveProperty("images");
      expect(categories[0].products[0]).toHaveProperty("quantitySold");
      expect(categories[0].products[0]).toHaveProperty("sales");
      expect(categories[0].products[0].quantitySold).toBeTruthy();
      expect(categories[0].products[0].sales).toBeTruthy();
    });
    test("product 1 has the correct sales amt", async () => {
      const categories = await Products.getAllCategories();
      expect(categories[0].products[0].sales).toBe(45);
    });
  });

  describe("addNewProduct", () => {
    test("adds a new product", async () => {
      const newProd = {
        name: "testName",
        description: "testDescription",
        price: 9.99,
        featured: false,
        smells_like: "testSmell",
        exfoliation: "Light",
        inventory: 100,
        category: 4,
      };
      await Products.addNewProduct(newProd);
      expect(await db("products")).toHaveLength(7);
    });
    test("returns all 4 categories with new products", async () => {
      const newProd = {
        name: "testName",
        description: "testDescription",
        price: 9.99,
        featured: false,
        smells_like: "testSmell",
        exfoliation: "Light",
        inventory: 100,
        category: 4,
      };
      const response = await Products.addNewProduct(newProd);
      expect(response).toHaveLength(4);
      expect(response[3].products).toHaveLength(1);
    });
    test("adds new product without smells_like, exfoliation, featured", async () => {
      const newProd = {
        name: "testName",
        description: "testDescription",
        price: 9.99,
        inventory: 100,
        category: 4,
      };
      await Products.addNewProduct(newProd);
      const products = await db("products");
      const newlyMadeProd = products[6];
      expect(products).toHaveLength(7);
      expect(newlyMadeProd.featured).toBe(false);
      expect(newlyMadeProd.smells_like).toBe(null);
      expect(newlyMadeProd.exfoliation).toBe(null);
    });
  });

  describe("addNewImage", () => {
    test("adds a new Image", async () => {
      const image = {
        image_url: "www.aws.com/image/test",
        primary: false,
        product_id: 1,
      };
      await Products.addNewImage(image);
      const images = await db("images");
      expect(images).toHaveLength(7);
    });
    test("returns the categories with new img", async () => {
      const image = {
        image_url: "www.aws.com/image/test",
        primary: true,
        product_id: 1,
      };
      const response = await Products.addNewImage(image);
      expect(response).toHaveLength(4);
      expect(response[0].products[0].product_id).toBe(1);
      expect(response[0].products[0].images).toHaveLength(2);
      expect(response[0].products[0].images[1].primary).toBe(true);
    });
    test("defaults to primary => false", async () => {
      const image = {
        image_url: "www.aws.com/image/test",
        product_id: 1,
      };
      const response = await Products.addNewImage(image);
      expect(response[0].products[0].images[1].primary).toBe(false);
    });
  });

  describe("removeProduct", () => {
    test("removes a product", async () => {
      await Products.removeProduct("2");
      expect(await db("products")).toHaveLength(5);
    });
    test("returns 4 categories", async () => {
      const response = await Products.removeProduct("2");
      expect(response).toHaveLength(4);
    });
  });

  describe("updateProduct", () => {
    test("updates a product name", async () => {
      await Products.updateProduct("1", { name: "testName" });
      const updatedProd = await db("products").where("product_id", "1").first();
      expect(updatedProd.name).toBe("testName");
    });
    test("updates a product price and category", async () => {
      await Products.updateProduct("1", {
        price: 12.99,
        category: 4,
      });
      const updatedProd = await db("products").where("product_id", "1").first();
      expect(updatedProd.price).toBe(12.99);
      expect(updatedProd.category).toBe(4);
    });
    test("does not change the amount of products", async () => {
      await Products.updateProduct("1", {
        price: 12.99,
        category: 4,
      });
      const products = await db("products");
      expect(products).toHaveLength(6);
    });
    test("returns 4 categories with updated product", async () => {
      const response = await Products.updateProduct("1", {
        inventory: 15,
        category: 2,
      });
      const updatedProd = response[1].products.find(
        (cur) => cur.product_id == 1
      );
      expect(response).toHaveLength(4);
      expect(updatedProd).toBeTruthy();
      expect(updatedProd.inventory).toBe(15);
      expect(updatedProd.category).toBe(2);
      expect(response[0].products).toHaveLength(1);
    });
  });
});
