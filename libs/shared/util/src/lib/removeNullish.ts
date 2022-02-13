import { isNonNull } from "./isNonNull";

export function removeNullish(object: any) {
  Object.entries(object).forEach(([key, value]) => {
    isNonNull(value) ? undefined : delete object[key];
  });
  return object;
}
