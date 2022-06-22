import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { testData, DEFAULT_DATA } from './data';

const API_URL = '/api/iplocation';

export const server = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(DEFAULT_DATA));
  }),

  rest.get(`${API_URL}/:ip`, (req, res, ctx) => {
    const { ip } = req.params;
    const result = testData.find((item) => item.ip === ip);
    return result ? res(ctx.status(200), ctx.json(result)) : res(ctx.status(404));
  })
);
