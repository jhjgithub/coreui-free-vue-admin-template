import * as lodash from "lodash";

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

