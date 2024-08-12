const ProductModel = require("../models/Product.model");

class ProductController {
  async get(req, res) {
    try {
      const products = await ProductModel.find();
      res.write({ products });
      res.end();
    } catch (error) {
      res.statusCode = 400;
      res.write({ message: error.message });
      res.end();
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);
      res.write({ message: "profuct was found ", product });
      res.end();
    } catch (error) {
      res.statusCode = 400;
      res.write({ message: error.message });
      res.end();
    }
  }
  async create(req, res) {
    try {
      const product = req.body;

      await ProductModel.insertOne(product);
      res.write({ message: "prodcuct added", product });
      res.end();
    } catch (error) {
      res.statusCode = 400;
      res.write({ message: error.message });
      res.end();
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const product = req.body;

      const updatedProduct = await ProductModel.findOneAndUpdate(id, product);
      res.write({ message: "prodcuct updated", product: updatedProduct.value });
      res.end();
    } catch (error) {
      res.statusCode = 400;
      res.write({ message: error.message });
      res.end();
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      await ProductModel.findOneAndDelete(id);
      res.write({ message: "prodcuct deleted" });
      res.end();
    } catch (error) {
      res.statusCode = 400;
      res.write({ message: error.message });
      res.end();
    }
  }
}

module.exports = new ProductController();
