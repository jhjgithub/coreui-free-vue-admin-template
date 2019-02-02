////////////////////

export const netobj_fields = [
  {
    key: '_selected',
    label: '',
    sortable: false,
    class: "options-column",
    thStyle: { width: '10px', maxWidth: '10px', minWidth: '5px' },
  },

  {
    key: 'obj_id',
    label: 'ID',
    icon: 'id-badge',
    sortable: true,
    thStyle: { width: '100px', maxWidth: '200px', minWidth: '50px' },
  },

  {
    key: 'obj_name',
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
    'obj_id': 'netobj-1',
    'obj_name': 'WebServer',
    'network_type': 'range', // range, netmask, group
    'network_start': '1.1.1.1',
    'network_end': '1.1.1.254',
    'netmask': '',
    'create_date': '2018-12-30T13:02:10',
    'desc': 'network object 1',

    '_selected': false,
    '_parent_id': null,
    '_visible_child': 'hide',  // hide, show, none
    '_depth': 0,
    'children': [
      {   
        'obj_id': 'netobj-6',
        'obj_name': 'WebServer6',
        'create_date': '2018-12-31T14:10:10',
        'network_type': 'group', // range, netmask, group
        'network_start': '', 
        'network_end': '', 
        'netmask': '', 
        'desc': 'network object 5',
        '_selected': false,
        '_parent_id': 'netobj-1',
        '_visible_child': 'none',  // hide, show, none
      },  
      {
        'obj_id': 'netobj-3',
        'obj_name': 'WebServer3',
        'create_date': '2018-12-31T13:10:10',
        'network_type': 'netmask', // range, netmask, group
        'network_start': '2.2.1.0',
        'network_end': '',
        'netmask': '24',
        'desc': 'network object 3',
        '_selected': false,
        '_parent_id': 'netobj-1',
        '_visible_child': 'hide',  // hide, show, none
        '_depth': 1,
        'children': [
          {
            'obj_id': 'netobj-5',
            'obj_name': 'WebServer5',
            'create_date': '2018-12-31T14:10:10',
            'network_type': 'group', // range, netmask, group
            'network_start': '',
            'network_end': '',
            'netmask': '',
            'desc': 'network object 5',
            '_selected': false,
            '_parent_id': 'netobj-3',
            '_visible_child': 'none',  // hide, show, none
          },
        ],
      },
    ],
  },
  {
    'obj_id': 'netobj-4',
    'obj_name': 'WebServer4',
    'create_date': '2018-12-31T14:10:10',
    'network_type': 'group', // range, netmask, group
    'network_start': '',
    'network_end': '',
    'netmask': '',
    'desc': 'network object 4',
    '_selected': false,
    '_parent_id': null,
    '_visible_child': 'none',  // hide, show, none
  },
  {
    'obj_id': 'netobj-2',
    'obj_name': 'WebServer1',
    'create_date': '2018-12-30T13:10:10',
    'network_type': 'netmask', // range, netmask, group
    'network_start': '1.1.1.0',
    'network_end': '1.1.1.254',
    'netmask': '24',
    'desc': 'network object 2',
    '_selected': false,
    '_parent_id': null,
    '_visible_child': 'none',  // hide, show, none
    'children': [],
  },
];

