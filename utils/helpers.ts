export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export function isKeyOfObject<T extends { [prop: string]: any }>(
  key: string | number | symbol,
  obj: T
): key is keyof T {
  return key in obj;
}
