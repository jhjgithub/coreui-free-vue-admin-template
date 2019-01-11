////////////////////

export const netobj_fields = [
  {
    key: 'selected',
    label: '',
    sortable: false,
    class: "options-column",
    thStyle: { width: '10px', maxWidth: '10px', minWidth: '5px' },
    tdClass: 'get_tdclass',
  },

  {
    key: 'netobj_id',
    label: 'ID',
    // icon: 'fa fa-home fa-lg',    
    icon: 'user',
    sortable: true,
    thStyle: { width: '100px', maxWidth: '200px', minWidth: '50px' },
    tdClass: 'get_tdclass',
  },

  {
    key: 'netobj_name',
    label: 'Name',
    icon: 'fa fa-camera-retro fa-lg',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },
    tdClass: 'get_tdclass',
  },

  {
    key: 'network_type',
    label: 'Type',
    sortable: true,
    thStyle: { width: '20px', maxWidth: '100px', minWidth: '50px' },
    tdClass: 'get_tdclass',
  },

  {
    key: 'network_start',
    label: 'Start Address',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },
    tdClass: 'get_tdclass',
  },

  {
    key: 'network_end',
    label: 'End Address',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },
    tdClass: 'get_tdclass',
  },

  {
    key: 'netmask',
    label: 'Network Mask',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },
    tdClass: 'get_tdclass',
  },

  {
    key: 'create_date',
    label: 'Created Date',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },
    tdClass: 'get_tdclass',
  },

  {
    key: 'details',
    label: 'Details',
    sortable: false,
    thStyle: {
      width: '20px',
      maxWidth: '20px',
      minWidth: '20px'
    },
    tdClass: 'get_tdclass',
  },
];

export const netobj_data = [
  {
    'selected': false,
    'netobj_id': 'netobj-1',
    'parent_id': null,
    'netobj_name': 'WebServer',
    'network_type': 'range', // range, netmask, group
    'network_start': '1.1.1.1',
    'network_end': '1.1.1.254',
    'netmask': '',
    'create_date': '2018-12-30T13:02:10',
    'desc': 'network object 1',
    'show_child': false,
    children: [
      {
        'selected': false,
        'netobj_id': 'netobj-3',
        'parent_id': 'netobj-1',
        'netobj_name': 'WebServer3',
        'create_date': '2018-12-31T13:10:10',
        'network_type': 'netmask', // range, netmask, group
        'network_start': '2.2.1.0',
        'network_end': '',
        'netmask': '24',
        'desc': 'network object 3',
        'show_child': false,
        children: [
          {
            'selected': false,
            'netobj_id': 'netobj-5',
            'parent_id': null,
            'netobj_name': 'WebServer5',
            'create_date': '2018-12-31T14:10:10',
            'network_type': 'group', // range, netmask, group
            'network_start': '',
            'network_end': '',
            'netmask': '',
            'desc': 'network object 5',
            'show_child': false,
          },
        ],
      },
    ],
  },
  {
    'selected': false,
    'netobj_id': 'netobj-2',
    'parent_id': null,
    'netobj_name': 'WebServer1',
    'create_date': '2018-12-30T13:10:10',
    'network_type': 'netmask', // range, netmask, group
    'network_start': '1.1.1.0',
    'network_end': '1.1.1.254',
    'netmask': '24',
    'desc': 'network object 2',
    'show_child': false,
    children: [],
  },
  {
    'selected': false,
    'netobj_id': 'netobj-4',
    'parent_id': null,
    'netobj_name': 'WebServer4',
    'create_date': '2018-12-31T14:10:10',
    'network_type': 'group', // range, netmask, group
    'network_start': '',
    'network_end': '',
    'netmask': '',
    'desc': 'network object 4',
    'show_child': false,
  },
];

export const netobj_data1 = [
  {
    'selected': false,
    'netobj_id': 'netobj-1',
    'parent_id': null,
    'netobj_name': 'WebServer',
    'network_type': 'range', // range, netmask, group
    'network_start': '1.1.1.1',
    'network_end': '1.1.1.254',
    'netmask': '',
    'create_date': '2018-12-30T13:02:10',
    'desc': 'network object 1',
    'show_child': false,
  },

  {
    'selected': false,
    'netobj_id': 'netobj-3',
    'parent_id': 'netobj-1',
    'netobj_name': 'WebServer3',
    'create_date': '2018-12-31T13:10:10',
    'network_type': 'netmask', // range, netmask, group
    'network_start': '2.2.1.0',
    'network_end': '',
    'netmask': '24',
    'desc': 'network object 3',
    'show_child': false,
  },

  {
    'selected': false,
    'netobj_id': 'netobj-5',
    'parent_id': null,
    'netobj_name': 'WebServer5',
    'create_date': '2018-12-31T14:10:10',
    'network_type': 'group', // range, netmask, group
    'network_start': '',
    'network_end': '',
    'netmask': '',
    'desc': 'network object 5',
    'show_child': false,
  },
  {
    'selected': false,
    'netobj_id': 'netobj-2',
    'parent_id': null,
    'netobj_name': 'WebServer1',
    'create_date': '2018-12-30T13:10:10',
    'network_type': 'netmask', // range, netmask, group
    'network_start': '1.1.1.0',
    'network_end': '1.1.1.254',
    'netmask': '24',
    'desc': 'network object 2',
    'show_child': false,
    children: [],
  },
  {
    'selected': false,
    'netobj_id': 'netobj-4',
    'parent_id': null,
    'netobj_name': 'WebServer4',
    'create_date': '2018-12-31T14:10:10',
    'network_type': 'group', // range, netmask, group
    'network_start': '',
    'network_end': '',
    'netmask': '',
    'desc': 'network object 4',
    'show_child': false,
  },
];



function print_json(d, msg) {
  console.log("#### %s: %s", msg, JSON.stringify(d, null, 2));
}

function get_item_index(data, rid) {
  var i = data.findIndex((item, idx) => {
    return item.id == rid;
  });

  return i;
}

/*
function remove_item_by_id(data, id) {
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    if (item.id === id) {
      // remove it from root
      data.splice(i, 1);
      i--;
      // and push it back to its parent
      var parent = get_item(data, item.pid);
      parent.children.push(item);

      if (item.show_child == true &&
        item.children != undefined &&
        item.children.length > 0) {

        item.children.forEach((child, idx) => {
          remove_item_by_id(data, child.id);
        });

        item.show_child = false;
      }

      return;
    }
  }
}
*/

function expand_children(data, item_index, item) {
  item_index++;

  item.children.forEach((child, idx) => {
    // move item's children to root
    data.splice(item_index, 0, child);
    item_index++;
  });

  item.show_child = true;
  item.children = [];

  print_json(data, "after");
}

function collapse_children(data, start_index, parent) {
  var begin_matched = false;

  for (var i = start_index; i < data.length; i++) {
    var item = data[i];
    var pid = parent.id;

    // console.log("rid: %d, pid: %d", item.id, pid);

    if (item.pid === pid) {
      // console.log("found item: rid=%d, pid=%d", item.id, item.pid);
      // console.log("%d: %s", i, JSON.stringify(item, null, 2));

      if (item.show_child == true) {
        console.log("call recursive remove for %d", item.id);
        var cnt = collapse_children(data, i, item);

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

  print_json(data, "after");
}

function toggle_child(table_data, rid) {
  var item_index = get_item_index(table_data, rid);
  // console.log("toggle item index: %d", item_index);

  if (item_index === -1) {
    console.log("no item with rid: " + rid);
    return
  }

  var item = table_data[item_index];

  console.log("id: %d, index: %d", item.id, item_index);

  var show_child = item.show_child;

  if (show_child == false && item.children != undefined && item.children.length > 0) {
    console.log("--> expanding child: %s", item.id);
    expand_children(table_data, item_index, item);
  }
  else if (show_child == true) {
    console.log("--> collaping child: idx=%d, id=%d", item_index, item.id);
    collapse_children(table_data, item_index, item);
  }


}
