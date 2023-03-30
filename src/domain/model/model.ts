export class Model {
  private readonly data: number[];

  constructor(data: number[]) {
    this.data = data;
  }

  private getMovingAverage(period: number): number[] {
    return this.data.map((item, index) => {
      if (index >= period - 1) {
        const window = this.data.slice(index - period + 1, index + 1);
        const sum = window.reduce((acc, cur) => acc + cur, 0);

        return Number((sum / period).toFixed(0));
      } else {
        return item;
      }
    });
  }

  predictWithMovingAverage(
    window: number,
    forecast = 5,
    adjustmentFactor = 1,
  ): number[] {
    const movingAvg = this.getMovingAverage(window);

    const lastAvg = movingAvg[movingAvg.length - 1];
    const slope = (lastAvg - movingAvg[movingAvg.length - 2]) / window;

    console.log(slope);
    console.log(slope * adjustmentFactor);

    return Array.from(
      { length: forecast },
      (_, i) => lastAvg + (i + 1) * slope * adjustmentFactor,
    ).map((item) => Number(item.toFixed(0)));
  }
}
