// Think that we got the list of products to import into database(May be from CSV or external API anything...)
const { products } = require("./products");

async function execute() {
  let importedProducts = [];

  for await (const data of products) {
    const product = await importProduct(data);
    importedProducts.push(product);
  }
}

async function importProduct(data) {
  // Code to import product into database
  // Imagine createProduct function creates product into database and return database product instance
  return await createProduct(data);
}

execute();
