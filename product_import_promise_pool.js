const { PromisePool } = require("@supercharge/promise-pool");
const { products } = require("./products");

async function execute() {
  const { results } = await PromisePool.for(products)
    .withConcurrency(10)
    .process(importProduct);

  console.log(results);
}

async function importProduct(data, index) {
  const result = await createProduct(data, index);
  console.log(result);
  return result;
}

async function createProduct(data, index) {
  const dummyProcessDelay = data.rating * 100;

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ item: index, delay: dummyProcessDelay });
    }, dummyProcessDelay)
  );
}

execute();
