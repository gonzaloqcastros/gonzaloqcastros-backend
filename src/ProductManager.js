const fs = require('fs/promises');

class ProductManager {
  constructor() {
    this.products = [];
    this.ultimoId = 0;
  }

  async init() {
    try {
      const data = await fs.readFile('./productos.json', 'utf-8');
      if (data) {
        this.products = JSON.parse(data);
        this.ultimoId = this.products[this.products.length - 1].id;
      }
    } catch (err) {
      console.error('Error reading file', err);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    if (this.products.some((p) => p.code === code)) {
      console.error('El código ya se encuentra en uso');
      return;
    }

    this.ultimoId++;
    const product = {
      id: this.ultimoId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);

    try {
      await fs.writeFile('./productos.json', JSON.stringify(this.products, null, 2));
      console.log(`Product added: ${JSON.stringify(product)}`);
    } catch (err) {
      console.error('Error writing file', err);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.error('Product not found');
      return null;
    }

    return product;
  }
}

module.exports = ProductManager;