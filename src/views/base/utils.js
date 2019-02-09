export function print_json(d, msg) {
  console.log("#### %s: %s", msg, JSON.stringify(d, null, 2));
}

/*
export function deep_copy(obj_to, obj_from) {
  for (let k in obj_from) {
    obj_to[k] = obj_from[k];
  }
}

export function deep_copy_array(arr) {
  let out = [];

  for (let i = 0, len = arr.length; i < len; i++) {
    let item = arr[i];
    let obj = {};

    deep_copy(obj, item);

    out.push(obj);
  }
  return out;
}

*/

export function array_empty(arr) {
  arr.splice(0, arr.length);
}

export function array_move(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}