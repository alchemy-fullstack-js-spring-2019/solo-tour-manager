const Tour = require('../../lib/models/Tour');
const mongoose = require('mongoose');

describe('Tour schema tests', () => {
  it('can create a Tour', () => {
    const tour = new Tour({
      title: 'Best Little Whore-House in PDX',
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

    expect(tour.toJSON()).toEqual({
      title: 'Best Little Whore-House in PDX',
      activities: ['fire-breathing', 'feats of strength', 'juggling'],
      launchdate: expect.any(Date),
      stops: [
        {
          location: 'Portland',
          weather: 'Sunny',
          attendance: 1,
          _id: expect.any(mongoose.Types.ObjectId)
        },
        {
          location: 'Seattle',
          weather: 'Rainy',
          attendance: 5,
          _id: expect.any(mongoose.Types.ObjectId)
        }
      ],
      _id: expect.any(mongoose.Types.ObjectId)
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
