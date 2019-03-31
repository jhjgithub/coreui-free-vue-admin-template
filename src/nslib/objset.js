// import * as lodash from "lodash";
// import "./enum.js";

import * as ipobjview from "./ipobjview";
import * as misc from "./misc.js";

/////////////////////////////////////////////////////////

export class ObjSet {
  constructor() {
    this.elements = [];
  }

  get length() {
    return this.elements.length;
  }

  push(node) {
    this.elements.push(node);
  }

  remove_at(idx) {
    return this.elements.splice(idx, 1);
  }

  insert_at(idx, node) {
    this.elements.splice(idx, 0, node);
  }

  get_root_node(id) {
    let node = this.elements.find((node) => {
      return node._depth == 0 && node.id === id;
    });

    return node;
  }

  get_node_index(node) {
    let i = this.elements.findIndex((n) => {
      return n == node;
    });

    return i;
  }

  set_items(items) {
    let len = items.length;

    for (let i = 0; i < len; i++) {
      let item = new ipobjview.IpObjView();
      misc.assign_deep(item, items[i]);
      this.push(item);
    }
  }

  clone_item(node) {
    let idx = this.get_node_index(node);
    let n = node.clone_deep();

    // n.name = n.name + "_cloned"
    n.init_internal_data();
    n.init_created_date();
    n.init_id();

    this.insert_at(idx, n);
    this.normalize_nodes();
  }

  remove_item(node) {
    let len = this.elements.length;
    for (let i = len - 1; i >= 0; i--) {
      let n = this.elements[i];

      if (n.id == node.id /* && n.name == node.name */) {
        this.remove_at(i);
      }
      else if (n.children && node.children.length > 0) {
        n.children = n.children.filter(function(child_id) {
          return child_id !== node.id;
        });

        if (n._visible_child && n._visible_child.length > 0) {
          n._visible_child = n._visible_child.filter(function(child) {
            return child.id !== node.id;
          });
        }
      }
    }

    this.normalize_nodes();
  }

  remove_child_item(node) {
    if (!node._parent_id) {
      return;
    }

    let pid = node._parent_id[0];
    let parent = this.get_root_node(pid);

    parent.children = parent.children.filter(function(child_id) {
      return child_id !== node.id;
    });

    if (parent._visible_child && parent._visible_child.length > 0) {
      parent._visible_child = parent._visible_child.filter(function(child) {
        return child.id !== node.id;
      });
    }

    // misc.print_json(parent, "after child parent");

    let idx = this.get_node_index(node);
    this.remove_at(idx);
  }

  expand_children(parent) {
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

          misc.array_empty(c._parent_id);
          misc.array_empty(c._visible_child);

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
  }

  collapse_children(parent) {
    parent._visible_child.forEach((child) => {
      if (child._visible_child.length > 0) {
        this.collapse_children(child);
      }

      let i = this.get_node_index(child);
      this.remove_at(i);
    });

    misc.array_empty(parent._visible_child);
  }

  normalize_nodes(nodes = null, depth = 0) {
    let fix_idx = 0;

    if (!nodes) {
      nodes = this.elements;
    }

    // console.log("depth: %d", depth);

    nodes.forEach((node) => {
      if (node._depth == depth) {
        node._fix_idx = fix_idx.toString();
        fix_idx++;
      }
    });
  }

  toggle_child(node) {
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
  }

  dynamic_sort(property) {
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
  }

  do_sort(nodes, sort_by, sort_desc) {
    // console.log("--> sorting nodes: %d", nodes.length);

    let field = sort_by;

    if (sort_desc) {
      field = "-" + sort_by;
    }

    nodes.sort(this.dynamic_sort(field));

    nodes.forEach((node) => {
      if (node._visible_child && node._visible_child.length > 1) {
        this.do_sort(node._visible_child, sort_by, sort_desc);
      }
    });
  }

  remove_subnode() {
    for (var i = this.elements.length; i--; ) {
      if (this.elements[i]._depth > 0) {
        this.remove_at(i);
      }
    }
  }

  restore_subnode(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      let idx = i;

      node._visible_child.forEach((child) => {
        if (child._visible_child.lehgth > 0) {
          this.restore_subnode(child);
        }

        idx++;
        this.insert_at(idx, child);
      });
    }
  }

  sort_data(sort_by, sort_desc) {
    //print_json(expanded_items, "current Last Status");

    this.remove_subnode();

    if (sort_by) {
      this.do_sort(this.elements, sort_by, sort_desc);
    }
    else {
      this.do_sort(this.elements, "_fix_idx", sort_desc);
    }

    this.restore_subnode(this.elements);
  }

  apply_obj(node) {
    let oldobj = this.get_root_node(node.id);

    if (oldobj) {
      let v = oldobj._visible_child;
      misc.assign_deep(oldobj, node);
      oldobj.visible_child = v;
      return;
    }

    let newobj = misc.clone_deep(node);
    this.elements.unshift(newobj);
    this.normalize_nodes();
  }
}
