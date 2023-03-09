const { readJSONFile, writeJSONFile } = require('../Routes/functions');
const path = require('path');
const CART_FILE = path.resolve(__dirname, '../data/cart.json');
const PRODUCT_FILE = path.resolve(__dirname, '../data/products.json');

const createCart = (req, res) => {
  const { id } = req.body;

  const carts = readJSONFile(CART_FILE);
  const existingCart = carts.find((cart) => cart.id == id);
  if (existingCart) {
    return res.status(400).json({ error: 'Cart already exists' });
  }

  const newCart = {
    id: Math.floor(Math.random() * 10000),
    products: [],
  };
  carts.push(newCart);

  writeJSONFile(CART_FILE, carts);

  res.status(201).json(newCart);
};

const getCartById = (req, res) => {
  const { cid } = req.params;

  const carts = readJSONFile(CART_FILE);
  const cart = carts.find((cart) => cart.id == cid);
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  res.json(cart);
};

const addProductToCart = (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const carts = readJSONFile(CART_FILE);
  const cart = carts.find((cart) => cart.id == cid);
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const products = readJSONFile(PRODUCT_FILE);
  const product = products.find((product) => product.id == pid);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const existingProduct = cart.products.find(
    (cartProduct) => cartProduct.id == pid
  );
  if (existingProduct) {
    existingProduct.quantity += parseInt(quantity, 10);
  } else {
    cart.products.push({ id: pid, quantity });
  }

  writeJSONFile(CART_FILE, carts);

  res.status(201).json(cart);
};

module.exports = { createCart, getCartById, addProductToCart };