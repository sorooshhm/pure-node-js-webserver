const { app } = require("./app");
const ProductController = require("./controllers/product.controller");

app.get("/api/product", ProductController.get);

app.get("/api/product/:id", ProductController.getById);

app.post("/api/product", ProductController.create);

app.put("/api/product/:id", ProductController.update);

app.delete("/api/product/:id", ProductController.delete);

app.get("/api/product/:id/:test", (req, res) => {
  res.write(req.params);
  res.end();
});

app.listen(3000, () => {
  console.log("app is listening to port 3000");
});
