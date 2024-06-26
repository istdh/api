export function generateTimestampWithOffset(offsetMinutes: number) {
  const now = new Date();
  const offsetMilliseconds = offsetMinutes * 60 * 1000; // Convert minutes to milliseconds
  const newTime = new Date(now.getTime() + offsetMilliseconds);
  return Math.floor(newTime.getTime() / 1000); // Convert to seconds and return
}
