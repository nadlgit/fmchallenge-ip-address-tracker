import { rest } from 'msw';
import { setupServer } from 'msw/node';

const API_URL = 'https://api.ipify.org/';
const testDelay = null; //random realistic server response time

export const MOCK_OWN_IP = '9.88.77.6';

export const okHandler = rest.get(API_URL, (req, res, ctx) => {
  return res(ctx.delay(testDelay), ctx.status(200), ctx.text(MOCK_OWN_IP));
});

export const errorHandler = rest.get(API_URL, (req, res, ctx) => {
  return res(ctx.delay(testDelay), ctx.status(500));
});

export const server = setupServer(okHandler);
