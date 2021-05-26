import express from 'express';

/* const express = require('express'); */

const app = express();

import customerRoutes from './routes/customer.routes.js';
import productsRoutes from './routes/products.routes.js';

app.use(express.urlencoded({ extended: false }));

/* const customerController = require('./controller/customer.controller.js'); */
/* import {
  customerForm,
  postCustomer,
} from './controller/customer.controller.js'; */
app.use(customerRoutes);
app.use(productsRoutes);

/* NACH ROUTES VERSCHOBEN 
app.get('/', customerForm);
app.post('/customer', postCustomer); */

app.listen(4000, () => console.log('Server is started!'));
