////////////////////

export const ipobj_fields = [
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

  /*
  {
    key: "name",
    label: "Name",
    icon: "user",
    sortable: true,
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },
  */

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
    formatter: "show_datetime",
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },

  {
    key: "details",
    label: "Details",
    sortable: false,
    thStyle: { width: "20px", maxWidth: "20px", minWidth: "20px" },
  },
];

export const spolicy_fields = [
  {
    key: "_selected",
    label: "",
    sortable: false,
    class: "options-column",
    thStyle: { width: "10px", maxWidth: "10px", minWidth: "5px" },
  },
  {
    key: "name",
    label: "Name",
    icon: "user",
    sortable: true,
    thStyle: { width: "100px", maxWidth: "100px", minWidth: "50px" },
  },
  {
    key: "action",
    label: "Act",
    sortable: true,
    // formatter: 'show_action',
    thStyle: { width: "20px", maxWidth: "100px", minWidth: "50px" },
  },
  {
    key: "nics",
    label: "NICs",
    sortable: false,
    // formatter: 'show_nic',
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },
  {
    key: "srcnet",
    label: "SRC Network",
    sortable: true,
    // formatter: 'show_srcnet',
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },
  {
    key: "dstnet",
    label: "DST Network",
    sortable: true,
    // formatter: 'show_dstnet',
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },
  {
    key: "options",
    label: "Options",
    sortable: false,
    // formatter: 'show_options',
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },
  /*
  {
    key: "schedule",
    label: "Schedule",
    sortable: false,
    formatter: 'show_schedule',
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },
  {
    key: "log",
    label: "Log",
    sortable: false,
    formatter: 'show_log',
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },
  */
  {
    key: "created_date",
    label: "Created Date",
    sortable: true,
    formatter: "show_datetime",
    thStyle: { width: "50px", maxWidth: "100px", minWidth: "50px" },
  },
  {
    key: "details",
    label: "Details",
    sortable: false,
    thStyle: { width: "20px", maxWidth: "20px", minWidth: "20px" },
  },
];
