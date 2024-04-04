const { test, expect } = require('@jest/globals');
const { normalizeURL, get_urls_from_html, crawlPage } = require('./crawl.js');

test('checks for https: and ending /', () => {
  expect(normalizeURL('https://boot.dev/path/')).toBe('boot.dev/path');
});

test('checks for https:', () => {
  expect(normalizeURL('https://boot.dev/path')).toBe('boot.dev/path');
});

test('checks for http: and ending /', () => {
  expect(normalizeURL('http://boot.dev/path/')).toBe('boot.dev/path');
});

test('checks for http:', () => {
  expect(normalizeURL('http://boot.dev/path')).toBe('boot.dev/path');
});

test('checks html for a tags (relative path)', () => {
  expect(
    get_urls_from_html(
      "<h1>This is a Title</h1><a href='/hello.txt'>This is a link</a>",
      'https://boot.dev'
    )
  ).toEqual(['https://boot.dev/hello.txt']);
});

test('checks html for a tags (absolute path)', () => {
  expect(
    get_urls_from_html(
      "<h1>This is a Title</h1><a href='https://boot.dev/hello.txt'>This is a link</a>",
      'https://boot.dev'
    )
  ).toEqual(['https://boot.dev/hello.txt']);
});

test('checks crawlpage for header error', async () => {
  expect(await crawlPage('https://wagslane.dev')).toEqual('')
})
