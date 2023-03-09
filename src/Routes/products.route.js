const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controllers');

router.get('/', getProducts);

router.get('/:pid', getProductById);

router.post('/', createProduct);

router.put('/:pid', updateProduct);

router.delete('/:pid', deleteProduct);

module.exports = router;