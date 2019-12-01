export function emptyish(value) {
  if (
    value === null ||
    value === ''
  ) {
    return true;
  } else {
    return false;
  }
}
