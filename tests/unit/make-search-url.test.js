const { makeLLUrl, makeWoeidUrl } = require('../../lib/middleware/make-search-url');

describe('it makes search url for api', () => {
  it('includes lattlong in search URL', () => {
    const location = '33.845470' + ',130.848557';

    const result = makeLLUrl(location);

    expect(result).toEqual('http://metaweather.com/api/location/search/?lattlong=33.845470%2C130.848557');
  });
  it('makes another URL for woeid search', () => {
    const woeid = 44418;

    const result = makeWoeidUrl(woeid);
    
    expect(result).toEqual('http://metaweather.com/api/location/44418');
  });
});
