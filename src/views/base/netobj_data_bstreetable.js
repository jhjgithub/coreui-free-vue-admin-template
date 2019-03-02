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
    id: "netobj-1",
    name: "WebServer",
    type: "range", // range, netmask, group
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
        id: "netobj-6",
        name: "WebServer6",
        type: "group", // range, netmask, group
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
        id: "netobj-3",
        name: "WebServer3",
        created_date: '1549529217446',
        type: "netmask", // range, netmask, group
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
            id: "netobj-5",
            name: "WebServer5",
            created_date: '1549529617446',
            ipaddr_ver: "",
            type: "group", // range, netmask, group
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
    id: "netobj-4",
    name: "WebServer4",
    created_date: '1549520617446',
    type: "group", // range, netmask, group
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
    id: "netobj-2",
    name: "WebServer1",
    created_date: '1549521617446',
    type: "netmask", // range, netmask, group
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
