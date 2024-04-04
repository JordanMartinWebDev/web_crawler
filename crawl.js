const { JSDOM } = require('jsdom');

async function crawlPage(baseURL, currentURL, pages) {
  const currentURLObj = new URL(currentURL);
  const baseURLObj = new URL(baseURL);

  if (currentURLObj.hostname !== baseURLObj.hostname) {
    return pages;
  }

  let norm_current = normalizeURL(currentURL);
  if (pages[norm_current] > 0) {
    pages[norm_current]++;
    return pages;
  }
  pages[norm_current] = 1;

  console.log(`crawling ${currentURL}`);
  let htmlBody = '';

  try {
    const response = await fetch(currentURL);
    if (!response.headers.get('Content-Type').includes('text/html')) {
      console.log(`Incorrect Content Type: Not Text/HTML`);
      return pages;
    }

    if (response.ok) {
      htmlBody = await response.text();
    } else {
      console.log(`Error Reponse Code: ${response.status}`);
      return pages;
    }
  } catch (err) {
    console.log(err.message);
  }

  const allURLS = get_urls_from_html(htmlBody, baseURL);
  for (const url of allURLS) {
    pages = await crawlPage(baseURL, url, pages);
  }
  return pages;
}

function normalizeURL(url) {
  const urlObj = new URL(url);
  let path = `${urlObj.host}${urlObj.pathname}`;
  if (path.length > 0 && path.slice(-1) === '/') {
    path = path.slice(0, -1);
  }
  return path;
}

function get_urls_from_html(htmlBody, baseURL) {
  const html = new JSDOM(htmlBody);
  let aTags = html.window.document.querySelectorAll('a');
  urls = [];
  for (const aTag of aTags) {
    if (aTag.href.slice(0, 1) === '/') {
      try {
        urls.push(new URL(aTag.href, baseURL).href);
      } catch (err) {
        console.log(`${err.message}: ${aTag.href}`);
      }
    } else {
      try {
        urls.push(new URL(aTag.href).href);
      } catch (err) {
        console.log(`${err.message}: ${aTag.href}`);
      }
    }
  }
  return urls;
}

module.exports = {
  normalizeURL,
  get_urls_from_html,
  crawlPage,
};
