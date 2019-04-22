const makeUrl = require('../../lib/middleware/make-search-url');

describe('it makes search url for api', () => {
  it('includes lattlong in search URL', () => {
    const location = '33.845470' + ',130.848557';

    const result = makeUrl(location);

    expect(result).toEqual('https://metaweather.com/api/location/search/?lattlong=33.845470%2C130.848557');
  });
});
