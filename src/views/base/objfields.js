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
