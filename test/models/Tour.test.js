const mongoose = require('mongoose');
const Tour = require('../../lib/models/Tour');

describe('Tour model', () => {
  it('has a title, activities, launch date, and stops', () => {
    const testLaunchDate = new Date();
    const stop1 = new mongoose.Types.ObjectId;
    const stop2 = new mongoose.Types.ObjectId;

    const tour = new Tour({
      title: 'Magical Mystery Tour',
      activities: ['singing', 'playing', 'dancing', 'bus ride'],
      launchDate: testLaunchDate,
      stops: [stop1, stop2]
    });

    expect(tour.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title: 'Magical Mystery Tour',
      activities: ['singing', 'playing', 'dancing', 'bus ride'],
      launchDate: testLaunchDate,
      stops: [stop1, stop2],
    });
  });
});
