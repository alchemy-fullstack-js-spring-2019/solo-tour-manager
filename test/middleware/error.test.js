const errorMiddleware = require('../../lib/middleware/error');

describe('error middleware', () => {
  it('will default to code 500 and sending the error', () => {
    const error = 'Something went wrong';
    const res = {};
    res.status = jest.fn(() => res);
    res.send = jest.fn(() => res);

    errorMiddleware(error, {}, res, () => {});

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ error });
  });
});
