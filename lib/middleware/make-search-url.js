const BASE_URL = 'http://metaweather.com/api/location';
const SEARCH_LOC_URL = `${BASE_URL}/search/?lattlong`;

function makeLLUrl(location) {
  const splitLoc = location.split(',');
  const url = new URL(SEARCH_LOC_URL);
  url.searchParams.set('lattlong', splitLoc);
  return url.toString();
}

function makeWoeidUrl(woeid) {
  const url = new URL(BASE_URL + `/${woeid}`);
  return url.toString();
}

module.exports = { makeLLUrl, makeWoeidUrl };
