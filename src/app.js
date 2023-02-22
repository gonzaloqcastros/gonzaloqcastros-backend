const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const PORT = 3000;

const productManager = new ProductManager();
productManager.init();

app.get('/products', async (req, res) => {
  const limit = parseInt(req.query.limit);

  if (isNaN(limit)) {
    const products = await productManager.getProducts();
    return res.json(products);
  }

  const products = await productManager.getProducts();
  return res.json(products.slice(0, limit));
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = await productManager.getProductById(productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});