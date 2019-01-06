////////////////////

export const netobj_fields = {
  selected: {
    label: '',    
    sortable: false,
    class: "options-column",
    thStyle: { width: '10px', maxWidth: '10px', minWidth: '5px' },
  },

  netobj_id: {
    label: 'ID',
    // icon: 'fa fa-home fa-lg',    
    icon: 'user',    
    sortable: true,
    thStyle: { width: '30px', maxWidth: '200px', minWidth: '50px' },    
  },

  netobj_name: {
    label: 'Name',
    icon: 'fa fa-camera-retro fa-lg',  
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },    
  },

  network_type: {
    label: 'Type',
    sortable: true,
    thStyle: { width: '20px', maxWidth: '100px', minWidth: '50px' },    
  },

  network_start: {
    label: 'Start Address',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },    
  },
  network_end: {
    label: 'End Address',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },    
  },
  netmask: {
    label: 'Network Mask',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },    
  },
  create_date: {
    label: 'Created Date',
    sortable: true,
    thStyle: { width: '50px', maxWidth: '100px', minWidth: '50px' },    
  },
  details: {
    label: 'Details',
    sortable: false,
    thStyle: {
      width: '20px',            
      maxWidth: '20px',
      minWidth: '20px'
    },
  },
};

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
  },
  {
    'selected': false,    
    'netobj_id': 'netobj-3',
    'parent_id': 'netobj-4',
    'netobj_name': 'WebServer3',
    'create_date': '2018-12-31T13:10:10',
    'network_type': 'netmask', // range, netmask, group
    'network_start': '2.2.1.0',
    'network_end': '',
    'netmask': '24',
    'desc': 'network object 3',
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
  },
];
