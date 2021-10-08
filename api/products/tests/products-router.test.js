const request = require("supertest");
const server = require("../../server");
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

describe("productsRouter", () => {
  describe("[GET] /api/products/categories", () => {
    test("returns a list of categories", async () => {
      const response = await request(server).get("/api/products/categories");
      expect(response.body).toHaveLength(4);
      expect(response.body[0]).toHaveProperty("category_name");
      expect(response.body[3]).toHaveProperty("products");
    });
    test("returns a status 200", async () => {
      const response = await request(server).get("/api/products/categories");
      expect(response.status).toBe(200);
    });
  });

  describe("[POST] /api/products", () => {
    test("adds a new product", async () => {
      const newProd = {
        name: "testName",
        description: "testDescription",
        price: 9.99,
        featured: false,
        smells_like: "testSmell",
        exfoliation: "Light",
        inventory: 100,
        category: "Body Bars",
      };
      await request(server).post("/api/products").send(newProd);
      expect(await db("products")).toHaveLength(7);
    });
    test("returns a status 201", async () => {
      const newProd = {
        name: "testName",
        description: "testDescription",
        price: 9.99,
        featured: false,
        smells_like: "testSmell",
        exfoliation: "Light",
        inventory: 100,
        category: "Gift Boxes",
      };
      const response = await request(server)
        .post("/api/products")
        .send(newProd);
      expect(response.status).toBe(201);
    });
    test("returns a 404 on invalid category", async () => {
      const newProd = {
        name: "testName",
        description: "testDescription",
        price: 9.99,
        featured: false,
        smells_like: "testSmell",
        exfoliation: "Light",
        inventory: 100,
        category: "Gift Packs",
      };
      const response = await request(server)
        .post("/api/products")
        .send(newProd);
      expect(response.status).toBe(404);
    });
    test("returns 400 on non-number price and inventory", async () => {
      const newProd = {
        name: "testName",
        description: "testDescription",
        price: "string",
        featured: false,
        smells_like: "testSmell",
        exfoliation: "Light",
        inventory: "string",
        category: "Gift Boxes",
      };
      const response = await request(server)
        .post("/api/products")
        .send(newProd);
      expect(response.status).toBe(400);
    });
  });

  describe("[DELETE] /api/products/:id", () => {
    test("deletes a product", async () => {
      await request(server).delete("/api/products/3");
      const products = await db("products");
      expect(products).toHaveLength(5);
    });
    test("returns 4 categories with one less product", async () => {
      const response = await request(server).delete("/api/products/3");
      expect(response.body).toHaveLength(4);
      expect(response.body[1].products).toHaveLength(1);
    });
    test("returns 404 on invalid id", async () => {
      const response = await request(server).delete("/api/products/999");
      expect(response.status).toBe(404);
    });
  });

  describe("[PUT] /api/products/:id", () => {
    test("returns 4 categories with updated product", async () => {
      const updates = { name: "testName", price: 100 };
      const response = await request(server)
        .put("/api/products/1")
        .send(updates);
      console.log(response.body);
      const updatedProd = response.body[0].products.find(
        (prod) => prod.product_id == "1"
      );
      expect(response.body).toHaveLength(4);
      expect(response.body[0].products).toHaveLength(2);
      expect(updatedProd.name).toBe("testName");
      expect(updatedProd.price).toBe(100);
    });
    test("returns 404 on invalid ID", async () => {
      const updates = { name: "testName", price: 100 };
      const response = await request(server)
        .put("/api/products/99")
        .send(updates);
      expect(response.status).toBe(404);
    });
    test("successfully updates category", async () => {
      const updates = { category: "Gift Boxes" };
      const response = await request(server)
        .put("/api/products/1")
        .send(updates);
      const updatedProd = response.body[3].products.find(
        (prod) => prod.product_id == "1"
      );
      expect(response.status).toBe(200);
      expect(updatedProd.category).toBe(4);
    });
  });
});
