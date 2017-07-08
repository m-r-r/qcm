/* @flow */

let lastId = 1;
export function newId(prefix: string = 'id'): string {
  return prefix + ++lastId;
}
