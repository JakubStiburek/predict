import { Injectable } from '@nestjs/common';
import { TimeSeriesItem } from './domain/time-series-item';
import { Model } from './domain/model/model';
import { getNextDates } from './utils/get-next-dates';

@Injectable()
export class AppService {
  getPrediction(
    data: TimeSeriesItem[],
    window: number,
    forecast?: number,
    adjustmentFactor?: number,
  ): TimeSeriesItem[] {
    const values = data.map((item) => item.value);

    const model = new Model(values);
    const prediction = model.predictWithMovingAverage(
      window,
      forecast,
      adjustmentFactor,
    );
    const dates = getNextDates(
      new Date(data[data.length - 1].timestamp),
      forecast,
    );

    return prediction.map((item, index) => {
      return new TimeSeriesItem(dates[index], item);
    });
  }
}
