const express = require('express');
const app = express();
const productsRouter = require('./routes/products.route');
const cartRouter = require('./routes/cart.route');
const PORT=8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});

module.exports = app;