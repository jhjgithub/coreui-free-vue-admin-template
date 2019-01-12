////////////////////

export const netobj_fields = [
  {
    key: 'selected',
    label: '',
    sortable: false,
    class: "options-column",
    thStyle: { width: '10px', maxWidth: '10px', minWidth: '5px' },
  },

  {
    key: 'netobj_id',
    label: 'ID',
    icon: 'id-badge',
    sortable: true,
    thStyle: { width: '100px', maxWidth: '200px', minWidth: '50px' },
  },

  {
    key: 'netobj_name',
    label: 'Name',
    icon: 'user',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },
  },

  {
    key: 'network_type',
    label: 'Type',
    sortable: true,
    thStyle: { width: '20px', maxWidth: '100px', minWidth: '50px' },
  },

  {
    key: 'network_start',
    label: 'Start Address',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },
  },

  {
    key: 'network_end',
    label: 'End Address',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },
  },

  {
    key: 'netmask',
    label: 'Network Mask',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },
  },

  {
    key: 'create_date',
    label: 'Created Date',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },
  },

  {
    key: 'details',
    label: 'Details',
    sortable: false,
    thStyle: { width: '20px', maxWidth: '20px', minWidth: '20px' },
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
    'children': [
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
        'children': [
          {
            'selected': false,
            'netobj_id': 'netobj-5',
            'parent_id': 'netobj-3',
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
    'children': [],
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

