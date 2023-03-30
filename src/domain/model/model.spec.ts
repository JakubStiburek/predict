import { Model } from './model';

describe('Model', () => {
  const mockData = [
    43, 134, 324, 251, 532, 943, 1025, 859, 1313, 764, 861, 767, 343, 0, 599,
    1119, 1637, 1439, 1715, 1376, 1234, 1151, 1744, 1848, 1858, 2067, 2283,
    1929, 3237, 1110, 2615,
  ];

  it('should return predicted values, with moving average', () => {
    const model = new Model(mockData);

    expect(model.predictWithMovingAverage(3, 3)).toStrictEqual([
      2397, 2474, 2550,
    ]);
  });
});
