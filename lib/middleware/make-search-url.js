const BASE_URL = 'https://metaweather.com/api';
const SEARCH_LOC_URL = `${BASE_URL}/location/search/?lattlong`;

function makeUrl(location) {
  const splitLoc = location.split(',');
  const url = new URL(SEARCH_LOC_URL);
  url.searchParams.set('lattlong', splitLoc);

  return url.toString();
}

module.exports = makeUrl;
