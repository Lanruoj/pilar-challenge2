export function getMonthDifference(
  currentDate: Date,
  targetDate: Date
): number {
  return (
    targetDate.getMonth() -
    currentDate.getMonth() +
    12 * (targetDate.getFullYear() - currentDate.getFullYear())
  );
}
