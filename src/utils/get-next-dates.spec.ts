import { getNextDates } from './get-next-dates';

describe('getNextDates', () => {
  it('should return next dates', () => {
    expect(getNextDates(new Date('2021-05-17T00:00:00.000Z'), 5)).toStrictEqual(
      [
        new Date('2021-05-24T00:00:00.000Z'),
        new Date('2021-05-31T00:00:00.000Z'),
        new Date('2021-06-07T00:00:00.000Z'),
        new Date('2021-06-14T00:00:00.000Z'),
        new Date('2021-06-21T00:00:00.000Z'),
      ],
    );
  });
});
