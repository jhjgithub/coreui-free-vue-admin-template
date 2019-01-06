export default [
  {
    'name': 'subnet1',
    'type': 'subnet', // group, subnet, range
    'address_type': 'v4',   // v4, v6
    'address': '192.168.1.0',
    'netmask': '255.255.255.0',
    'comment': 'this is user comment'
  },
  {
    'name': 'range1',
    'type': 'range', // group, subnet, range
    'address_type': 'v4',   // v4, v6    
    'range_start': '192.168.1.11',
    'range_end': '192.168.1.129',
    'comment': 'this is user comment'    
  },  
  {
    'name': 'group1',
    'type': 'group', // group, subnet, range
    'child': [
      'subnet1', 
      'range1'
    ],
    'comment': 'this is user comment'    
  },
  {
    'name': 'group2',
    'type': 'group', // group, subnet, range
    'child': [
      'group1', 
      'range1'
    ],
    'comment': 'this is user comment'    
  },
  
];