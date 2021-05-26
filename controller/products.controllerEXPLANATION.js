//1. Imported File System Module of nodeJS
import fs from 'fs';

//2. Imported uuid module to generate IDs for new products
import { v4 as uuidv4 } from 'uuid';

//3. Create a new product will ALL properties, which have been passed (from request body)
function postProduct(request, response) {
  /*   const { productname, price } = request.body; */
  const newProduct = { ...request.body, id: uuidv4() };

  //4. Read File Contents from db.json
  //datei erst auslesen bevor sie geschrieben wird (fs.readFile vor fs.writeFile), datei öffnen, einlesen, dann wird produkt darin gespeichert, dann wird datei gespeichert und geschlossen
  fs.readFile('db.json', (error, currywurstFileContents) => {
    //5. Handle possible error
    if (error) {
      console.error(error.message);
      response.json({
        succes: false,
        message: 'Database could not be opened.',
      });
    }
    //6. Parse the file contents and work with them in the JSON format
    const database = JSON.parse(currywurstFileContents);
    //7. Geth the products array from our JSON object
    const products = database.products;
    //8. Push the new product onto our list of products
    products.push(newProduct);

    //9. Write the JSON object with all products, including the new product back to the database
    //database wird in db.json geschrieben das null steht für replacer, also kein replacer (z.b. emojis als umlaute) 2 spaces heißt es wird umgebrochen in der darstellung
    fs.writeFile('db.json', JSON.stringify(database, null, 2), (error) => {
      if (error) {
        console.errer(error.message);
        response.json({
          success: false,
          message: 'Database could not be written.',
        });
        return false;
      }
      //10. Reply to the client with the newly created product
      //best practice: wenn ich an api etwas schicke erwarte ich dass sie mir auch antwortet; bei apis mit json
      response.json(newProduct);
    });
  });
}
//11. Add a new route in products.routes.js  for GET /products
//12. Create function getProducts
function getProducts(request, response) {
  //13. Read file contents from db.json
  fs.readFile('db.json', (error, currywurstFileContents) => {
    if (error) {
      console.error(error.message);
      response.json({
        success: false,
        message: 'Database could not be opened.',
      });
      return false;
    }
    //14. Parse the whole database into JSON format
    const database = JSON.parse(currywurstFileContents);
    //15. Reply to the client with the list (array) of products
    response.json(database.products);
  });
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
