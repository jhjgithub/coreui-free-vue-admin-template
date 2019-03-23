import * as _ from "lodash";

function _enum() {
  var key,
    val = -1,
    list = {};
  _.reduce(
    _.toArray(arguments),
    function (result, kvp) {
      kvp = kvp.split("=");
      key = _.trim(kvp[0]);
      val = _.parseInt(kvp[1]) || ++val;
      result[(result[val] = key)] = val;
      return result;
    },
    list
  );
  return Object.freeze(list);
}

// Add enum to lodash
_.mixin({ "enum": _enum });

