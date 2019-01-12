/////////////////////////////

function print_json(d, msg) {
  console.log("#### %s: %s", msg, JSON.stringify(d, null, 2));
}

function get_item_index(data, nid) {
  var i = data.findIndex((item, idx) => {
    return item.netobj_id == nid;
  });

  return i;
}

function expand_children(data, item_index, item) {
  item.children.forEach((child, idx) => {
    // move item's children to root
    item_index++;
    data.splice(item_index, 0, child);
  });

  item.show_child = true;
  item.children = [];

  // print_json(data, "after");
}

function collapse_children(data, start_index, parent) {
  var begin_matched = false;

  for (var i = start_index; i < data.length; i++) {
    var item = data[i];
    var pid = parent.netobj_id;

    // console.log("nid: %d, pid: %d", item.id, pid);

    if (item.parent_id === pid) {
      // console.log("found item: nid=%d, pid=%d", item.id, item.pid);
      // console.log("%d: %s", i, JSON.stringify(item, null, 2));

      if (item.show_child == true) {
        // console.log("call recursive remove for %d", item.netobj_id);
        collapse_children(data, i, item);
        item.show_child = false;
      }

      begin_matched = true;

      // remove it from root
      data.splice(i, 1);
      i--;

      //console.log("after len: %s, %d", data.length, i);
      //console.log("parent: %s", JSON.stringify(parent, null, 2));

      // and push it back to its parent
      parent.children.push(item);
    }
    else if (begin_matched) {
      break;
      //return begin_matched;
    }
  }

  parent.show_child = false;
  // print_json(data, "after");
}

export function toggle_child(table_data, nid) {
  var item_index = get_item_index(table_data, nid);
  // console.log("toggle item index: %d", item_index);

  if (item_index === -1) {
    console.log("no item with nid: " + nid);
    return
  }

  var item = table_data[item_index];

  // console.log("%d: %s", item_index, JSON.stringify(item, null, 2));
  // console.log("index: %s, nid: %s", item_index, item.netobj_id);

  var show_child = item.show_child;

  if (show_child == false && item.children != undefined && item.children.length > 0) {
    // console.log("--> expanding child: %s", item.netobj_id);
    expand_children(table_data, item_index, item);
  }
  else if (show_child == true) {
    // console.log("--> collaping child: idx=%s, id=%s", item_index, item.netobj_id);
    collapse_children(table_data, item_index, item);
  }
}




