import { rest } from 'msw';
import { setupServer } from 'msw/node';

const API_URL = 'https://api.ipify.org/';

export const OWN_IP_MOCK_VALUE = '9.88.77.6';

export const okHandler = rest.get(API_URL, (req, res, ctx) => {
  return res(ctx.status(200), ctx.text(OWN_IP_MOCK_VALUE));
});

export const errorHandler = rest.get(API_URL, (req, res, ctx) => {
  return res(ctx.status(500));
});

export const server = setupServer(okHandler);
