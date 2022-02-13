export function isNullish(value: null): value is null {
  return value === null || value === undefined;
}
