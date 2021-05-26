//1. Imported File System Module of nodeJS
import fs from 'fs';

//2. Imported uuid module to generate IDs for new products
import { v4 as uuidv4 } from 'uuid';
import { saveToDatabase, loadFromDatabase } from '../lib/databaseHelper.js';

//3. Create a new product will ALL properties, which have been passed (from request body)
function postProduct(request, response) {
  /*   const { productname, price } = request.body; */
  const newProduct = { ...request.body, id: uuidv4() };

  const database = loadFromDatabase();
  const products = database.products;
  products.push(newProduct);
  saveToDatabase(database); //fire and forget (funktion gibt nichts zurück)

  response.json(newProduct);
}

function getProducts(request, response) {
  const database = loadFromDatabase();

  //15. Reply to the client with the list (array) of products
  response.json(database.products);
}

function productForm(request, response) {
  response.send(`
    <form action="/products" method="POST">
    <input type="text" name="productname" placeholder="Product Name">
    <input type="text" name="price" placeholder="Price">
    <input type="text" name="category" placeholder="Category">
    <input type="text" name="color" placeholder="Color">
    <button> Add product </button>
    </form> `);
}

export { getProducts, productForm, postProduct };
