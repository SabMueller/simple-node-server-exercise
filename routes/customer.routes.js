import express from 'express';
import {
  postCustomer,
  customerForm,
} from '../controller/customer.controller.js';
//wichtig dass man unbedingt js anfügt am ende

const router = express.Router();

//hier wird dann app durch router ersetzt
router.get('/', customerForm);
router.post('/customer', postCustomer);

export default router;
