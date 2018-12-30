
export const netobjs = [
  {
    'netobj_id': 'netobj-1',
    'netobj_name': 'WebServer',
    'network_type': 'range', // range, netmask, group
    'network_start': '1.1.1.1',
    'network_end': '1.1.1.254',
    'netmask': '',
    'create_date': '2018-12-30T13:02:10',    
    'desc': 'network object 1',
    // 'children': '',
  },
  {
    'netobj_id': 'netobj-2',
    'netobj_name': 'WebServer1',
    'create_date': '2018-12-30T13:10:10',
    'network_type': 'netmask', // range, netmask, group
    'network_start': '1.1.1.0',
    'network_end': '1.1.1.254',
    'netmask': '24',
    'desc': 'network object 2',
    // 'children': [],
  },
  {
    'netobj_id': 'netobj-3',
    'parent_id': 'netobj-4',
    'netobj_name': 'WebServer3',
    'create_date': '2018-12-31T13:10:10',
    'network_type': 'netmask', // range, netmask, group
    'network_start': '2.2.1.0',
    'network_end': '',
    'netmask': '24',
    'desc': 'network object 3',
    // 'children': [],
  },
  {
    'netobj_id': 'netobj-4',
    'netobj_name': 'WebServer4',
    'create_date': '2018-12-31T14:10:10',
    'network_type': 'group', // range, netmask, group
    'network_start': '',
    'network_end': '',
    'netmask': '',
    'desc': 'network object 4',
    // 'children': ['netobj-3'],
  },
];

export const priorities = [
  { id: 1, value: 'Low' },
  { id: 2, value: 'Normal' },
  { id: 3, value: 'Urgent' },
  { id: 4, value: 'High' }
];
