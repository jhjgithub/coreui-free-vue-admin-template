import * as lodash from "lodash";

/*
function _enum() {
  var key,
    val = -1,
    list = {};
  lodash.reduce(
    lodash.toArray(arguments),
    function (result, kvp) {
      kvp = kvp.split("=");
      key = lodash.trim(kvp[0]);
      val = lodash.parseInt(kvp[1]) || ++val;
      result[(result[val] = key)] = val;
      return result;
    },
    list
  );
  return Object.freeze(list);
}

// Add enum to lodash
lodash.mixin({ "enum": _enum });
*/

export default function() {
  var key,
    val = -1,
    list = {};
  lodash.reduce(
    lodash.toArray(arguments),
    function (result, kvp) {
      kvp = kvp.split("=");
      key = lodash.trim(kvp[0]);
      val = lodash.parseInt(kvp[1]) || ++val;
      result[(result[val] = key)] = val;
      return result;
    },
    list
  );
  return Object.freeze(list);
}


/*
import _ from 'lodash';

export function enumNumber(...params) {
  return Object.freeze(_.mapValues(_.invert(params), Number));
}

export function enumString(...params) {
  return Object.freeze(_.mapKeys(params));
}
*/