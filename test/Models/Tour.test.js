const Tour = require('../../lib/Models/Tour');
const mongoose = require('mongoose');

describe('tour model test', () => {
  it('has a', () => {
    const launch = new Date();
    const stop = new mongoose.Types.ObjectId;
    const staaahp = new mongoose.Types.ObjectId;

    const tour = new Tour({
      title: 'cheese tour',
      activities: ['eating', 'smelling', 'tasting', 'cheese making'],
      launchDate: launch,
      stops: [stop, staaahp]
    });

    expect(tour.toJSON()).toEqual({
      title: 'cheese tour',
      activities: ['eating', 'smelling', 'tasting', 'cheese making'],
      launchDate: launch,
      stops: [stop, staaahp],
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required title', () => {
    const launch = new Date();
    const stop = new mongoose.Types.ObjectId;
    const staaahp = new mongoose.Types.ObjectId;

    const tour = new Tour({
      activities: ['eating', 'smelling', 'tasting', 'cheese making'],
      launchDate: launch,
      stops: [stop, staaahp]
    });

    const errors = tour.validateSync().errors;
    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('has a default date', () => {
    const stop = new mongoose.Types.ObjectId;
    const staaahp = new mongoose.Types.ObjectId;

    const tour2 = new Tour({
      title: 'my feet hurt and i am dying',
      activities: ['eating', 'smelling', 'tasting', 'cheese making'],
      stops: [stop, staaahp]
    });

    expect(tour2.toJSON()).toEqual({
      title: 'my feet hurt and i am dying',
      activities: ['eating', 'smelling', 'tasting', 'cheese making'],
      launchDate: expect.any(Date),
      stops: [stop, staaahp],
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it.skip('has required activities', () => {
    const launch = new Date();
    const stop = new mongoose.Types.ObjectId;
    const staaahp = new mongoose.Types.ObjectId;

    const tour1 = new Tour({
      title: 'dog walking',
      launchDate: launch,
      stops: [stop, staaahp]
    });

    const errors = tour1.validateSync().errors;
    expect(errors.activities.message).toEqual('Path `activities` is required.');
  });
});

