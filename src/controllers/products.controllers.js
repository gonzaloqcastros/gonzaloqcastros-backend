const { readJSONFile, writeJSONFile } = require('../Routes/functions');
const path = require('path');
const PRODUCTS_FILE = path.resolve(__dirname, '../data/products.json');

const getProducts = (req, res) => {
  let products = readJSONFile(PRODUCTS_FILE);

  if (req.query.limit) {
    products = products.slice(0, req.query.limit);
  }

  res.json(products);
};

const getProductById = (req, res) => {
  const { pid } = req.params;
  const products = readJSONFile(PRODUCTS_FILE);
  const product = products.find((p) => p.id == pid);

  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
};

const createProduct = (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } =
    req.body;

  if (!title || !description || !code || !price || !status || !stock || !category) {
    res.status(400).send('Missing fields');
    return;
  }

  const products = readJSONFile(PRODUCTS_FILE);

  const newProduct = {
    id: Math.floor(Math.random() * 10000),
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails: thumbnails || [],
  };

  products.push(newProduct);

  writeJSONFile(PRODUCTS_FILE, products);

  res.json(newProduct);
};

const updateProduct = (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category, thumbnails } =
    req.body;
    
    const products = readJSONFile(PRODUCTS_FILE);
    const index = products.findIndex((p) => p.id == pid);
    
    if (index !== -1) {
    products[index] = {
    ...products[index],
    title: title || products[index].title,
    description: description || products[index].description,
    code: code || products[index].code,
    price: price || products[index].price,
    status: status || products[index].status,
    stock: stock || products[index].stock,
    category: category || products[index].category,
    thumbnails: thumbnails || products[index].thumbnails,
    };

    writeJSONFile(PRODUCTS_FILE, products);

    res.json(products[index]);

} else {
    res.status(404).send('Product not found');
    }
    };
    
    const deleteProduct = (req, res) => {
    const { pid } = req.params;
    
    const products = readJSONFile(PRODUCTS_FILE);
    const filteredProducts = products.filter((p) => p.id != pid);
    
    if (products.length !== filteredProducts.length) {
    writeJSONFile(PRODUCTS_FILE, filteredProducts);
    res.status(204).send();
    } else {
    res.status(404).send('Product not found');
    }
    };
    
    module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    };

