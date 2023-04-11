export function getMonthDifference(currentDate, targetDate) {
  return (
    targetDate.getMonth() -
    currentDate.getMonth() +
    12 * (targetDate.getFullYear() - currentDate.getFullYear())
  );
}
