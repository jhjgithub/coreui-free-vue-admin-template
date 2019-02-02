function get_item_index(items, nid) {
  let i = items.findIndex((item, idx) => {
    return item.netobj_id == nid;
  });

  return i;
}

function expand_children(items, item_index, item) {
  item.children.forEach((child, idx) => {
    // move item's children to root
    item_index++;
    items.splice(item_index, 0, child);
  });

  item._visible_child = "show";
  empty_array(item.children);

  //print_json(items, "after");
}

function collapse_children(items, start_index, parent) {
  let begin_matched = false;

  for (let i = start_index; i < items.length; i++) {
    let item = items[i];
    let pid = parent.netobj_id;

    //console.log("nid: %s, pid: %s", item.netobj_id, pid);

    if (item._parent_id === pid) {
      //console.log("found item: nid=%s, pid=%s", item.netobj_id, item._parent_id);
      //console.log("%d: %s", i, JSON.stringify(item, null, 2));

      if (item._visible_child === "show") {
        // console.log("call recursive remove for %d", item.netobj_id);
        collapse_children(items, i, item);
        item._visible_child = "hide";
      }

      begin_matched = true;

      // remove it from root
      items.splice(i, 1);
      i--;

      //console.log("after len: %s, %d", items.length, i);
      //console.log("parent: %s", JSON.stringify(parent, null, 2));

      // and push it back to its parent
      parent.children.push(item);
    } else if (begin_matched) {
      break;
      //return begin_matched;
    }
  }

  parent._visible_child = "hide";
  //print_json(items, "after");
}

function save_expanded_items(items, expanded_items) {
  // console.log("--> save expanded items");

  empty_array(expanded_items);

  items.forEach((item, idx) => {
    if (item._visible_child === "show") {
      let showed_item = {
        idx: idx,
        netobj_id: item.netobj_id,
        parent_id: item._parent_id,
        visible_child: item._visible_child
      };

      expanded_items.push(showed_item);
    }
  });

  //print_json(expanded_items, "Last Status");
}

function collapsed_items(items, expanded_items) {
  // console.log("--> collapse all items: %d", expanded_items.length);

  expanded_items.forEach((item, idx) => {
    if (item._parent_id == null) {
      let child_idx = get_item_index(items, item.netobj_id);
      if (child_idx != -1) {
        let child = items[child_idx];
        collapse_children(items, child_idx, child);
      }
    }
  });

  //print_json(expanded_items, "Last show");
  //print_json(items, "collapse all");
}

function dynamic_sort(property) {
  let sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  /*
  return function (a,b) {
          if (sortOrder == -1) {
                  return b[property].localeCompare(a[property]);
          } 
          else {
                  return a[property].localeCompare(b[property]);
          }        
  }
  */

  const reA = /[^a-zA-Z]/g;
  const reN = /[^0-9]/g;

  // to properly handle mixed string with alphabet and digit
  return function(itemA, itemB) {
    let a, b;

    if (sortOrder == -1) {
      a = itemB[property];
      b = itemA[property];
    } else {
      a = itemA[property];
      b = itemB[property];
    }

    let aA = a.replace(reA, "");
    let bA = b.replace(reA, "");

    if (aA === bA) {
      let aN = parseInt(a.replace(reN, ""), 10);
      let bN = parseInt(b.replace(reN, ""), 10);
      if (isNaN(bN) || isNaN(bN)) {
        return a > b ? 1 : -1;
      }

      return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
      return aA > bA ? 1 : -1;
    }
  };
}

function sort_items(items, sort_by, sort_desc) {
  // console.log("--> sorting items: %d", items.length);

  let field = sort_by;

  if (sort_desc) {
    field = "-" + sort_by;
  }

  items.sort(dynamic_sort(field));

  items.forEach((item, idx) => {
    if (item.children && item.children.length > 1) {
      sort_items(item.children, sort_by, sort_desc);
    }
  });
}

function apply_expanded_items(items, expanded_items) {
  // console.log("--> expanding items: %d", expanded_items.length);

  expanded_items.forEach((item, idx) => {
    //console.log("expanding id: %s", item.netobj_id);
    toggle_child(items, item.netobj_id);
  });

  //print_json(expanded_items, "Last show");
  //print_json(items, "collapse all");
}

function removeChar(data) {
  let b = "";
  for (let j = 0; j < data.length; j++) {
    let c = data[j];
    if (c >= "0" && c <= "9") {
      b = b.concat(c);
    }
  }

  return b;
}

///////////////////////////////////////////

export function print_json(d, msg) {
  console.log("#### %s: %s", msg, JSON.stringify(d, null, 2));
}

export function deep_copy(arr) {
  let out = [];

  for (let i = 0, len = arr.length; i < len; i++) {
    let item = arr[i];
    let obj = {};

    for (let k in item) {
      obj[k] = item[k];
    }

    out.push(obj);
  }
  return out;
}

export function empty_array(arr) {
  arr.splice(0, arr.length);
}

export function normalize_items(items) {
  let depth = 0;

  function _normalize_items(cur_items, cur_depth) {
    let fix_idx = 0;

    cur_items.forEach((item, idx) => {
      item._depth = cur_depth;
      item._visible_child = "none";
      item._fix_idx = fix_idx.toString();
      fix_idx++;

      if (item.children && item.children.length > 0) {
        item._visible_child = "hide";
        _normalize_items(item.children, cur_depth + 1);
      }
    });
  }

  _normalize_items(items, depth);
}

export function toggle_child(items, nid) {
  let item_index = get_item_index(items, nid);
  // console.log("toggle item index: %d", item_index);

  if (item_index === -1) {
    // console.log("no item with nid: " + nid);
    return;
  }

  let item = items[item_index];

  // console.log("%d: %s", item_index, JSON.stringify(item, null, 2));
  // console.log("index: %s, nid: %s", item_index, item.netobj_id);

  let visible_child = item._visible_child;

  if (
    visible_child === "hide" &&
    item.children != undefined &&
    item.children.length > 0
  ) {
    // console.log("--> expanding child: %s", item.netobj_id);
    expand_children(items, item_index, item);
  } else if (visible_child == "show") {
    // console.log("--> collaping child: idx=%s, id=%s", item_index, item.netobj_id);
    collapse_children(items, item_index, item);
  }
}

export function sort_data(items, sort_by, sort_desc) {
  // console.log("#### sort_by: %s, sort_desc: %s", sort_by, sort_desc);

  let expanded_items = [];

  save_expanded_items(items, expanded_items);
  //print_json(expanded_items, "current Last Status");

  collapsed_items(items, expanded_items);
  //print_json(items, "collapsed items");

  if (sort_by) {
    sort_items(items, sort_by, sort_desc);
  } else {
    sort_items(items, "_fix_idx", sort_desc);
  }
  //print_json(items, "sorted items");

  apply_expanded_items(items, expanded_items);
  // print_json(items, "expanded items");
}

export function format_ipv4_address(value) {
  console.log("in value=%s", value);

  let blocks = value.split(".");
  let len = blocks.length;

  if (len > 4) {
    blocks = blocks.splice(0, 4);
    len = 4;
  }

  for (let idx = 0; idx < len; idx++) {
    let block = blocks[idx];

    block = removeChar(block);
    let len = block.length;
    let b = "";

    for (let j = 0; j < len; j++) {
      let c = block[j];
      b = b.concat(c);
      let val = parseInt(b);

      if (val > 255) {
        b = b.substr(0, b.length - 1);
        break;
      }
    }

    blocks[idx] = b;
  }

  let ip = blocks.join(".");

  if (blocks.length < 4) {
    let val = blocks[blocks.length - 1];
    if (val.length == 3) {
      ip += ".";
    }
  }

  console.log("out value=%s", ip);
  return ip;
}

export function array_move(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}
