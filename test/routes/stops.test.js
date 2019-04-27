const request = require('superagent');
const app = require('../../lib/app');

describe.skip('stop routes test', () => {
  it('returns the weather from city name or lat/lon', () => {
    return request(app)
      .post('/tours/:id/stops')
      .send({
        location: {
          lat: 12345,
          lon: 4444,
        },
        attendance: 2
      })
      .then(res => {
        expect(res.body).toEqual({
          location: {
            lat: 12345,
            lon: 4444,
          },
          weather: {
            temp_max: expect.any(Number),
            temp_min: expect.any(Number),
            description: expect.any(String)
          },
          attendance: 2,
          _id: expect.any(String),
          __v: 0
        });
      });
  });  
});
