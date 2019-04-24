const Tour = require('../../lib/models/Tour');
const mongoose = require('mongoose');
// const connect = require('../../lib/utils/connect');

describe('Tour schema tests', () => {
  // beforeAll(() => {
  //   return connect();
  // });

  // beforeEach(() => {
  //   mongoose.connection.dropDatabase();
  // });

  // afterAll(() => {
  //   return mongoose.connection.close();
  // });

  it('can create a Tour', () => {
    const tour = new Tour({
      title: 'Best Little Whore-House in PDX',
      activities: ['fire-breathing', 'feats of strength', 'juggling'],
      launchdate: new Date('1999'),
      stops: [
        {
          location: 'Portland',
          weather: 'Sunny',
          attendance: 1
        },
        {
          location: 'Seattle',
          weather: 'Rainy',
          attendance: 5
        }
      ]
    });

    console.log('nonJSON', tour);

    expect(tour).toEqual({
      title: 'Best Little Whore-House in PDX',
      activities: ['fire-breathing', 'feats of strength', 'juggling'],
      launchdate: new Date('1999'),
      stops: [
        {
          attendance: 1,
          _id: expect.any(String)
        },
        {
          attendance: 5,
          _id: expect.any(String)
        }
      ],
      _id: expect.any(String)
    });
  });

  it('has a required title field', () => {
    const tour = new Tour({
      activities: ['fire-breathing', 'feats of strength', 'juggling'],
      launchdate: new Date(),
      stops: [
        {
          location: 'Portland',
          weather: 'Sunny',
          attendance: 1
        },
        {
          location: 'Seattle',
          weather: 'Rainy',
          attendance: 5
        }
      ]
    });

    const error = tour.validateSync().errors;
    expect(error.title.message).toEqual('Path `title` is required.');
  });
});
