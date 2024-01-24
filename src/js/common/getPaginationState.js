export default function getPaginationState(current, total, length) {
  let start = Math.min(current - Math.floor(length / 2), total + 1 - length);
  let values = [];

  if (length > total) length = total;

  for (let i = 0; i < length; i++) {
    const value = (start < 1 ? 1 : start) + i;

    values.push(value);
  }

  return values;
}
