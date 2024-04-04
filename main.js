const { argv } = require('node:process');
const { crawlPage } = require('./crawl');
const { printReport } = require('./report');

async function main() {
  if (argv.length === 3) {
    baseURL = argv[2];
    console.log(`Beginning crawl on: ${baseURL}`);
    const pageList = await crawlPage(baseURL, baseURL, {});
    printReport(pageList);
  } else {
    console.log('Incorrect number of arguments.');
  }
}

main();
