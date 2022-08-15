"use strict";

const { PromisePool } = require("@supercharge/promise-pool");

/**
 * Very basic, non-optimal shuffle function
 * to randomly order the items.
 *
 * @param {Array} array
 *
 * @returns {Array}
 */
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRecordsForProcess() {
  return shuffle(
    [
      { color: "red", delay: 1 },
      { color: "green", delay: 2 },
      { color: "blue", delay: 3 },
      { color: "cyan", delay: 4 },
      { color: "magenta", delay: 5 },
      { color: "yellow", delay: 6 },
      { color: "black", delay: 7 },
      { color: "pink", delay: 8 },
      { color: "white", delay: 9 },
      { color: "orange", delay: 10 },
    ].map((item) => {
      return {
        color: item.color,
        delay: item.delay * 100,
      };
    })
  );
}

async function startProcess(recordForProcess) {
  let { delay } = recordForProcess;
 
    await new Promise((resolve, reject) => setTimeout(()=>{
      if(delay >= 200 && delay <=400) {
        reject(JSON.stringify({error:"A test error", recordForProcess}))
      }

      resolve()
    }, delay));
}

async function run() {
  const recordsForProcess = getRecordsForProcess();

  console.log(recordsForProcess);
  startProcess(recordsForProcess);
  
  const { results, errors } = await PromisePool.for(recordsForProcess)
    .withConcurrency(2)
    .process(async (recordForProcess, index, pool) => {

      await startProcess(recordForProcess);
      console.log(`#${index}: waited ${recordForProcess.delay}ms`);

      return { item: index, delay: recordForProcess.delay };
    });

  console.log();
  console.log("Results ->");
  console.log(results);

  console.log();
  console.log(`Errors -> ${errors}`);
}

run();
