export function getNextDates(startDate: Date, n = 5): Date[] {
  return Array.from({ length: n }, (_, i) => {
    return new Date(
      new Date(startDate).setDate(startDate.getDate() + (i + 1) * 7),
    );
  });
}
