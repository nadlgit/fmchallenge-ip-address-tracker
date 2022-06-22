import { rest } from 'msw';
import { setupServer } from 'msw/node';
import testData from './data.json';
import { isValidIP } from 'utils/helpers';

const API_URL = 'https://geo.ipify.org/api/v2/country,city';

export const ERROR_API_KEY = Object.freeze({
  code: 403,
  messages: 'Access restricted. Check credits balance or enter the correct API key.',
});

export const ERROR_INVALID_IP = Object.freeze({
  code: 422,
  messages: 'Input correct IPv4 or IPv6 address.',
});

export const server = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    const apiKey = req.url.searchParams.get('apiKey');
    const ip = req.url.searchParams.get('ipAddress');

    if (!apiKey || apiKey !== process.env.GEO_IPIFY_API_KEY) {
      return res(ctx.status(ERROR_API_KEY.code), ctx.json(ERROR_API_KEY));
    }

    if (ip && !isValidIP(ip)) {
      return res(ctx.status(ERROR_INVALID_IP.code), ctx.json(ERROR_INVALID_IP));
    }

    const result = testData.find((item) => item.ip === ip);
    if (!result) {
      return res(
        ctx.status(404),
        ctx.json({ code: 404, messages: `IP "${ip}" is not part of testing data set.` })
      );
    }
    return res(ctx.status(200), ctx.json(result));
  })
);
