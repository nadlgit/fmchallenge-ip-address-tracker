import { MainApp } from './main-app';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import 'whatwg-fetch';
import { server, testData, DEFAULT_DATA } from 'test-mocks/internal-iplocation-api';

jest.mock('components/map', () => ({
  Map: ({ latitude, longitude }) => {
    const MapMock = 'map-component-mock';
    return (
      <MapMock>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
      </MapMock>
    );
  },
}));

beforeAll(() => {
  server.listen();
  process.env.NEXT_PUBLIC_USE_REAL_GEO_API = '';
});

afterEach(() => {
  server.resetHandlers();
  process.env.NEXT_PUBLIC_USE_REAL_GEO_API = '';
});

afterAll(() => {
  server.close();
});

describe('MainApp component', () => {
  it('at initial load should display location for default IP (test replacement for own IP)', async () => {
    render(<MainApp />);
    await screen.findByText(DEFAULT_DATA.ip);
    expect(screen.getByText(DEFAULT_DATA.location)).toBeInTheDocument();
    expect(screen.getByText(`UTC ${DEFAULT_DATA.timezone}`)).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_DATA.isp)).toBeInTheDocument();
    expect(screen.getByText(`Latitude: ${DEFAULT_DATA.latitude}`)).toBeInTheDocument();
    expect(screen.getByText(`Longitude: ${DEFAULT_DATA.longitude}`)).toBeInTheDocument();
  });

  it.each(testData.filter((item) => item !== DEFAULT_DATA))(
    'should display location for submitted IP "$ip"',
    async (val) => {
      expect(val).not.toEqual(DEFAULT_DATA);
      render(<MainApp />);
      await userEvent.type(screen.getByRole('searchbox'), `${val.ip}{enter}`);
      await screen.findByText(val.ip);
      expect(screen.getByText(val.location)).toBeInTheDocument();
      expect(screen.getByText(`UTC ${val.timezone}`)).toBeInTheDocument();
      expect(screen.getByText(val.isp)).toBeInTheDocument();
      expect(screen.getByText(`Latitude: ${val.latitude}`)).toBeInTheDocument();
      expect(screen.getByText(`Longitude: ${val.longitude}`)).toBeInTheDocument();
    }
  );
});
