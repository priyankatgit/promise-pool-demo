const { products } = require("./products");

async function execute() {
  const promises = []

  // Running each import product process parallel
  for await (const data of products) {
    const importPromise = importProduct(data);
    promises.push(importPromise)
  }

  // Waited to finish all products at once and returns inserted product data from database
  const importedProducts = await Promise.all(promises)
}

async function importProduct(data) {
  return await createProduct(data);
}

execute();
