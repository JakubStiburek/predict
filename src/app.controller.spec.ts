import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PredictRequestDto } from './dto/predict-request.dto';
import { TimeSeriesItem } from './domain/time-series-item';
import { ParamsDto } from './dto/params.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('predict', () => {
    const mockData = [
      {
        timestamp: '2018-09-24T00:00:00.000Z',
        value: 43,
      },
      {
        timestamp: '2018-10-01T00:00:00.000Z',
        value: 134,
      },
      {
        timestamp: '2018-10-08T00:00:00.000Z',
        value: 324,
      },
      {
        timestamp: '2018-10-15T00:00:00.000Z',
        value: 251,
      },
      {
        timestamp: '2018-10-22T00:00:00.000Z',
        value: 532,
      },
      {
        timestamp: '2018-10-29T00:00:00.000Z',
        value: 943,
      },
    ].map((i) => new TimeSeriesItem(new Date(i.timestamp), i.value));

    const mockParams = new ParamsDto(5, 5);

    const expected = mockData.concat([
      new TimeSeriesItem(new Date('2018-11-05T00:00:00.000Z'), 473),
      new TimeSeriesItem(new Date('2018-11-12T00:00:00.000Z'), 509),
      new TimeSeriesItem(new Date('2018-11-19T00:00:00.000Z'), 545),
      new TimeSeriesItem(new Date('2018-11-26T00:00:00.000Z'), 581),
      new TimeSeriesItem(new Date('2018-12-03T00:00:00.000Z'), 617),
    ]);

    it('should return an array of time series items', () => {
      expect(
        appController.getPrediction(
          new PredictRequestDto(mockData, mockParams),
        ),
      ).toEqual(expected);
    });

    it('should default to 5 for forecast if not provided', () => {
      const mockParamsNoForecast = new ParamsDto(5);

      expect(
        appController.getPrediction(
          new PredictRequestDto(mockData, mockParamsNoForecast),
        ),
      ).toEqual(expected);
    });

    it('should throw an error if data is not provided', () => {
      expect(() => {
        appController.getPrediction(new PredictRequestDto([], mockParams));
      }).toThrow();
    });
  });
});
