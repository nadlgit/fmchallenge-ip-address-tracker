import { rest } from 'msw';
import { setupServer } from 'msw/node';
import testData from './data.json';
// import { isValidIP } from 'utils/helpers';

const API_URL = 'https://api.ipgeolocation.io/ipgeo';

export const ERROR_API_KEY = Object.freeze({
  code: 401,
  payload: Object.freeze({
    message:
      'Provided API key is not valid. Contact technical support for assistance at support@ipgeolocation.io',
  }),
});

// export const ERROR_INVALID_IP = Object.freeze({
//   code: 422,
//   messages: 'Input correct IPv4 or IPv6 address.',
// });

export const server = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    const apiKey = req.url.searchParams.get('apiKey');
    const ip = req.url.searchParams.get('ip');
    if (!apiKey || apiKey !== process.env.IPGEOLOCATION_API_KEY) {
      return res(ctx.status(ERROR_API_KEY.code), ctx.json(ERROR_API_KEY.payload));
    }
    // if (ip && !isValidIP(ip)) {
    //   return res(ctx.status(ERROR_INVALID_IP.code), ctx.json(ERROR_INVALID_IP.payload));
    // }
    const result = testData.find((item) => item.ip === ip);
    if (!result) {
      return res(
        ctx.status(404),
        ctx.json({ message: `IP "${ip}" is not part of testing data set.` })
      );
    }
    return res(ctx.status(200), ctx.json(result));
  })
);
