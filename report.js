function printReport(pages) {
  console.log('Report starting...');
  const sortedPages = pageSort(pages);
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const count = sortedPage[1];
    console.log(`Found ${count} internal links to ${url}`);
  }
}

function pageSort(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((pageA, pageB) => {
    return pageB[1] - pageA[1];
  });
  return pagesArr;
}

module.exports = {
  printReport,
};
