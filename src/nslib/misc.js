import * as lodash from "lodash";


export function print_json(d, msg) {
  console.log("#### %s: %s", msg, JSON.stringify(d, null, 2));
}

export function array_empty(arr) {
  arr.splice(0, arr.length);
}

export function array_move(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

export function clone_deep(obj) {
  return lodash.cloneDeep(obj);
}

export function assign_deep(to, from) {
  lodash.assign(to, from);
}