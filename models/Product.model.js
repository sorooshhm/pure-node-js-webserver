const { ObjectId } = require("mongodb");
const client = require("../db");

class ProductModel {
  constructor() {
    let db = client.db("project");
    this.collection = db.collection("products");
  }
  async find(query) {
    return await this.collection.find(query).toArray();
  }
  async findById(id) {
    const product = await this.collection.findOne({ _id: new ObjectId(id) });
    return product;
  }
  async insertOne(product) {
    return await this.collection.insertOne(product);
  }
  async findOneAndUpdate(id, product) {
    return await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...product,
        },
      },
      { returnDocument: "after" }
    );
  }
  async findOneAndDelete(id) {
    return await this.collection.findOneAndDelete({ _id: new ObjectId(id) });
  }
}

module.exports = new ProductModel();
