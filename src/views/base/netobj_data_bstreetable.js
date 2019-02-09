////////////////////

export const netobj_fields = [
  {
    key: "_selected",
    label: "",
    sortable: false,
    class: "options-column",
    thStyle: { width: "10px", maxWidth: "10px", minWidth: "5px" },
  },

  {
    key: "id",
    label: "ID",
    icon: "id-badge",
    sortable: true,
    thStyle: { width: "100px", maxWidth: "200px", minWidth: "50px" },
  },

  {
    key: "name",
    label: "Name",
    icon: "user",
    sortable: true,
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },

  {
    key: "type",
    label: "Type",
    sortable: true,
    thStyle: { width: "20px", maxWidth: "100px", minWidth: "50px" },
  },

  {
    key: "ipaddr_ver",
    label: "Ver",
    sortable: true,
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },

  {
    key: "ipaddr_start",
    label: "Start Address",
    sortable: true,
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },

  {
    key: "ipaddr_end",
    label: "End Address",
    sortable: true,
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },

  {
    key: "netmask",
    label: "Network Mask",
    sortable: true,
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },

  {
    key: "created_date",
    label: "Created Date",
    sortable: true,
    formatter: 'show_datetime',
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },

  {
    key: "details",
    label: "Details",
    sortable: false,
    thStyle: { width: "20px", maxWidth: "20px", minWidth: "20px" },
  },
];

export const netipobj_data = [
  {
    obj_id: "netobj-1",
    obj_name: "WebServer",
    obj_type: "range", // range, netmask, group
    ipaddr_ver: "4",
    ipaddr_start: "1.1.1.1",
    ipaddr_end: "1.1.1.254",
    netmask: "",
    created_date: '1549529617446',
    desc: "network object 1",
    _selected: false,
    _parent_id: null,
    _visible_child: "show", // hide, show, none
    _depth: 0,
    children: [
      {
        obj_id: "netobj-6",
        obj_name: "WebServer6",
        obj_type: "group", // range, netmask, group
        ipaddr_ver: "",
        ipaddr_start: "",
        ipaddr_end: "",
        netmask: "",
        created_date: '1549529615446',
        desc: "network object 5",
        _selected: false,
        _parent_id: "netobj-1",
        _visible_child: "none", // hide, show, none
      },
      {
        obj_id: "netobj-3",
        obj_name: "WebServer3",
        created_date: '1549529217446',
        obj_type: "netmask", // range, netmask, group
        ipaddr_ver: "4",
        ipaddr_start: "2.2.1.0",
        ipaddr_end: "",
        netmask: "24",
        desc: "network object 3",
        _selected: false,
        _parent_id: "netobj-1",
        _visible_child: "hide", // hide, show, none
        _depth: 1,
        children: [
          {
            obj_id: "netobj-5",
            obj_name: "WebServer5",
            created_date: '1549529617446',
            ipaddr_ver: "",
            obj_type: "group", // range, netmask, group
            ipaddr_start: "",
            ipaddr_end: "",
            netmask: "",
            desc: "network object 5",
            _selected: false,
            _parent_id: "netobj-3",
            _visible_child: "none", // hide, show, none
          },
        ],
      },
    ],
  },
  {
    obj_id: "netobj-4",
    obj_name: "WebServer4",
    created_date: '1549520617446',
    obj_type: "group", // range, netmask, group
    ipaddr_ver: "",
    ipaddr_start: "",
    ipaddr_end: "",
    netmask: "",
    desc: "network object 4",
    _selected: false,
    _parent_id: null,
    _visible_child: "none", // hide, show, none
  },
  {
    obj_id: "netobj-2",
    obj_name: "WebServer1",
    created_date: '1549521617446',
    obj_type: "netmask", // range, netmask, group
    ipaddr_ver: "4",
    ipaddr_start: "1.1.1.0",
    ipaddr_end: "1.1.1.254",
    netmask: "24",
    desc: "network object 2",
    _selected: false,
    _parent_id: null,
    _visible_child: "none", // hide, show, none
    children: [],
  },
];
