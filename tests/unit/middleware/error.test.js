const errorMiddleware = require('../../../lib/middleware/error');

describe('error middleware function', () => {
  it('sets the error status to 500 and sends the error', () => {
    const error = 'Error';
    const res = {};
    res.status = jest.fn(() => res);
    res.send = jest.fn(() => res);

    errorMiddleware(error, {}, res, () => { });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error
    });
  });
  it('sets the status to the error status and sends the error', () => {
    const error = new Error('oops');
    error.status = 404;
    const res = {};
    res.status = jest.fn(() => res);
    res.send = jest.fn(() => res);

    errorMiddleware(error, {}, res, () => { });

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      error: error.message
    });
  });
});
