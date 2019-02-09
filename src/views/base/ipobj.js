import * as _ from "lodash";
import "./enum.js";
import { print_json, empty_array } from "./nodeHelper.js";

////////////////////////////////

export var ipnode_type = _.enum("none", "group", "netmask", "range");
export var ipnode_ipver = _.enum("none", "v4", "v6");
// export var ipnode_visible = _.enum("none", "hide", "show");

export class ipnode {
  constructor(id) {
    this.id = id;
    this.name = "";
    this.type = ipnode_type.netmask;
    this.ipaddr_ver = ipnode_ipver.v4;
    this.ipaddr_start = "";
    this.ipaddr_end = "";
    this.netmask = "";
    this.created_date = "";
    this.desc = "";
    this.children = [];

    // for internal
    this._selected = false;
    this._depth = 0;
    this._parent_id = [];
    this._visible_child = [];
    // sort 시 원래의 위치를 기억하기 위해서 사용. node 가 변경 되면 갱신 해야 한다.
    this._fix_idx = -1;
  }

  clone_deep() {
    return _.cloneDeep(this);
  }

  assign(from) {
    _.assign(this, from);
  }

  reset() {
    let n = new ipnode("");
    this.assign(n);
  }

  // handle child
  get child_len() {
    return this.children.length;
  }

  add_child(child, at_top = false) {
    child._parent_id.push(this.id);

    if (at_top) {
      this.children.unshift(child.id);
    }
    else {
      this.children.push(child.id);
    }
  }
}

///////////////////////////////////////////////

export function ipnodelist() {
  Array.call(this);
}

ipnodelist.prototype = Object.create(Array.prototype);

ipnodelist.prototype.remove_at = function(idx) {
  return this.splice(idx, 1);
};

ipnodelist.prototype.insert_at = function(idx, item) {
  this.splice(idx, 0, item);
};

ipnodelist.prototype.get_root_node = function(id) {
  let node = this.find((node) => {
    return node._depth == 0 && node.id === id;
  });

  return node;
};

ipnodelist.prototype.get_node_index = function(node) {
  let i = this.findIndex((n) => {
    return n == node;
  });

  return i;
};

ipnodelist.prototype.expand_children = function(parent) {
  if (parent.children.length < 1) {
    return;
  }

  let idx = this.get_node_index(parent);

  parent.children.forEach((child_id) => {
    let child_org = this.get_root_node(child_id);

    if (child_org) {
      let c = child_org.clone_deep();

      if (c) {
        c._depth = parent._depth + 1;
        c._fix_idx = -1;

        empty_array(c._parent_id);
        empty_array(c._visible_child);

        // set parent id
        c._parent_id.push(parent.id);
        parent._visible_child.push(c);

        // move clone at root level to be shown
        idx++;
        this.insert_at(idx, c);
      }
      else {
        console.log("no data");
      }
    }
  });

  this.normalize_nodes(parent._visible_child, parent._depth + 1);
  // print_json(parent, "expand node:");
};

ipnodelist.prototype.collapse_children = function(parent) {
  parent._visible_child.forEach((child) => {
    if (child._visible_child.length > 0) {
      this.collapse_children(child);
    }

    let i = this.get_node_index(child);
    this.remove_at(i);
  });

  empty_array(parent._visible_child);
};

ipnodelist.prototype.normalize_nodes = function(nodes, depth) {
  let fix_idx = 0;

  // console.log("depth: %d", depth);

  nodes.forEach((node) => {
    if (node._depth == depth) {
      node._fix_idx = fix_idx.toString();
      fix_idx++;
    }
  });
};

ipnodelist.prototype.toggle_child = function(node) {
  if (node.children == undefined || node.children.length < 1) {
    return;
  }

  let visible_child = node._visible_child;

  if (visible_child.length < 1) {
    this.expand_children(node);
  }
  else if (visible_child.length > 0) {
    this.collapse_children(node);
  }
};

ipnodelist.prototype.dynamic_sort = function(property) {
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
    }
    else {
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
    }
    else {
      return aA > bA ? 1 : -1;
    }
  };
};

ipnodelist.prototype.do_sort = function(items, sort_by, sort_desc) {
  // console.log("--> sorting items: %d", items.length);

  let field = sort_by;

  if (sort_desc) {
    field = "-" + sort_by;
  }

  items.sort(this.dynamic_sort(field));

  items.forEach((item) => {
    if (item._visible_child && item._visible_child.length > 1) {
      this.do_sort(item._visible_child, sort_by, sort_desc);
    }
  });
};

ipnodelist.prototype.remove_subnode = function() {
  for (var i = this.length; i--; ) {
    if (this[i]._depth > 0) {
      this.splice(i, 1);
    }
  }
};

ipnodelist.prototype.restore_subnode = function(nodes) {
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    let idx = i;

    node._visible_child.forEach((child) => {
      if (child._visible_child.lehgth > 0) {
        this.restore_subnode(child);
      }

      idx++;
      this.splice(idx, 0, child);
    });
  }
};

ipnodelist.prototype.sort_data = function(sort_by, sort_desc) {
  //print_json(expanded_items, "current Last Status");

  this.remove_subnode();

  if (sort_by) {
    this.do_sort(this, sort_by, sort_desc);
  }
  else {
    this.do_sort(this, "_fix_idx", sort_desc);
  }

  this.restore_subnode(this);
};

////////////////////////////

export function init_sample_node(ipnodelist) {
  let a = new ipnode();
  a.id = "netobj-a";
  a.name = "WebServer1";
  a.type = ipnode_type.range;
  a.ipaddr_ver = ipnode_ipver.v4;
  a.ipaddr_start = "1.1.1.1";
  a.ipaddr_end = "1.1.1.254";
  a.netmask = "";
  a.created_date = "1549529617446";
  a.desc = "network object 1";

  let b = new ipnode();
  b.id = "netobj-b";
  b.name = "WebServer2";
  b.type = ipnode_type.netmask;
  b.ipaddr_ver = ipnode_ipver.v4;
  b.ipaddr_start = "2.1.1.1";
  b.ipaddr_end = "";
  b.netmask = "24";
  b.created_date = "1559929617446";
  b.desc = "network object 2";

  let c = new ipnode();
  c.id = "netobj-c";
  c.name = "WebServer3";
  c.type = ipnode_type.netmask;
  c.ipaddr_ver = ipnode_ipver.v4;
  c.ipaddr_start = "9.1.1.1";
  c.ipaddr_end = "";
  c.netmask = "24";
  c.created_date = "1539129617446";
  c.desc = "network object 3";

  let d = new ipnode();
  d.id = "netobj-d";
  d.name = "WebServer4";
  d.type = ipnode_type.range;
  d.ipaddr_ver = ipnode_ipver.v4;
  d.ipaddr_start = "192.168.1.1";
  d.ipaddr_end = "192.168.1.100";
  d.netmask = "";
  d.created_date = "1501129617446";
  d.desc = "network object 4";

  let e = new ipnode();
  e.id = "netobj-e";
  e.name = "WebServer5";
  e.type = ipnode_type.range;
  e.ipaddr_ver = ipnode_ipver.v4;
  e.ipaddr_start = "172.1.1.1";
  e.ipaddr_end = "172.1.1.230";
  e.netmask = "";
  e.created_date = "1501229617446";
  e.desc = "network object 5";

  let f = new ipnode();
  f.id = "netobj-f";
  f.name = "Group6";
  f.type = ipnode_type.group;
  f.ipaddr_ver = ipnode_ipver.none;
  f.ipaddr_start = "";
  f.ipaddr_end = "";
  f.netmask = "";
  f.created_date = "1501229617446";
  f.desc = "network group 6";
  f.children = [];

  ipnodelist.push(b);
  ipnodelist.push(a);
  ipnodelist.push(c);
  ipnodelist.push(f);
  ipnodelist.push(d);
  ipnodelist.push(e);

  a.add_child(e);
  a.add_child(f);
  e.add_child(d);
}
