////////////////////
// define data struct

/*
export const netobj_data_field = {
  dataType: "json",
  dataFields: [
    { name: "EmployeeID", type: "number" },
    { name: "ReportsTo", type: "number" },
    { name: "FirstName", type: "string" },
    { name: "LastName", type: "string" },
    { name: "Country", type: "string" },
    { name: "City", type: "string" },
    { name: "Address", type: "string" },
    { name: "Title", type: "string" },
    { name: "HireDate", type: "date" },
    { name: "BirthDate", type: "date" }
  ],

  hierarchy: {
    keyDataField: { name: "EmployeeID" },
    parentDataField: { name: "ReportsTo" }
  },

  id: "EmployeeID",
};

export const column_icons = {
  'FirstName' : 'fa fa-home fa-lg',
  'LastName' : 'fa fa-camera-retro fa-lg',  
}

export const netobj_data = [
  {
    EmployeeID: 1,
    FirstName: "Nancy",
    LastName: "Davolio",
    icon: "fa fa-tachometer fa-3x dashboard-icon-color",
    ReportsTo: null,
    Country: "USA",
    Title: "Sales Representative",
    HireDate: "1992-05-01 00:00:00",
    BirthDate: "1948-12-08 00:00:00",
    City: "Seattle",
    Address: "507 - 20th Ave. E.Apt. 2A",
    // showDetail: "true"
  },
  {
    EmployeeID: 2,
    FirstName: "Andrew",
    LastName: "Fuller",
    ReportsTo: null,
    Country: "USA",
    Title: "Vice President, Sales",
    HireDate: "1992-08-14 00:00:00",
    BirthDate: "1952-02-19 00:00:00",
    City: "Tacoma",
    Address: "908 W. Capital Way"
  },
  {
    EmployeeID: 3,
    FirstName: "Janet",
    LastName: "Leverling",
    ReportsTo: 2,
    Country: "USA",
    Title: "Sales Representative",
    HireDate: "1992-04-01 00:00:00",
    BirthDate: "1963-08-30 00:00:00",
    City: "Kirkland",
    Address: "722 Moss Bay Blvd."
  },
  {
    EmployeeID: 4,
    FirstName: "Margaret",
    LastName: "Peacock",
    ReportsTo: 1,
    Country: "USA",
    Title: "Sales Representative",
    HireDate: "1993-05-03 00:00:00",
    BirthDate: "1937-09-19 00:00:00",
    City: "Redmond",
    Address: "4110 Old Redmond Rd."
  },
  {
    EmployeeID: 5,
    FirstName: "Steven",
    LastName: "Buchanan",
    ReportsTo: 4,
    Country: "UK",
    Title: "Sales Manager",
    HireDate: "1993-10-17 00:00:00",
    BirthDate: "1955-03-04 00:00:00",
    City: "London",
    Address: "14 Garrett Hill"
  },
  {
    EmployeeID: 6,
    FirstName: "Michael",
    LastName: "Suyama",
    ReportsTo: null,
    Country: "UK",
    Title: "Sales Representative",
    HireDate: "1993-10-17 00:00:00",
    BirthDate: "1963-07-02 00:00:00",
    City: "London",
    Address: "Coventry House Miner Rd."
  },
  {
    EmployeeID: 7,
    FirstName: "Robert",
    LastName: "King",
    ReportsTo: 5,
    Country: "UK",
    Title: "Sales Representative",
    HireDate: "1994-01-02 00:00:00",
    BirthDate: "1960-05-29 00:00:00",
    City: "London",
    Address: "Edgeham Hollow Winchester Way"
  },
  {
    EmployeeID: 8,
    FirstName: "Laura",
    LastName: "Callahan",
    ReportsTo: 2,
    Country: "USA",
    Title: "Inside Sales Coordinator",
    HireDate: "1994-03-05 00:00:00",
    BirthDate: "1958-01-09 00:00:00",
    City: "Seattle",
    Address: "4726 - 11th Ave. N.E."
  },
  {
    EmployeeID: 9,
    FirstName: "Anne",
    LastName: "Dodsworth",
    ReportsTo: 5,
    Country: "UK",
    Title: "Sales Representative",
    HireDate: "1994-11-15 00:00:00",
    BirthDate: "1966-01-27 00:00:00",
    City: "London",
    Address: "7 Houndstooth Rd."
  }
];
*/

/////////////////////////////////////////////////////////

export const netobj_data_field = {
  dataType: "json",
  dataFields: [
    { name: "netobj_id", type: "string" },
    { name: "parent_id", type: "string" },
    { name: "netobj_name", type: "string" },
    { name: "network_type", type: "string" },
    { name: "network_start", type: "string" },
    { name: "network_end", type: "string" },
    { name: "netmask", type: "string" },
    { name: "create_date", type: "date" },
    { name: "desc", type: "string" }
  ],

  hierarchy: {
    keyDataField: { name: "netobj_id" },
    parentDataField: { name: "parent_id" }
  },

  id: "netobj_id",
};

export const column_icons = {
  'ID' : 'fa fa-home fa-lg',
  'Name' : 'fa fa-camera-retro fa-lg',  
}

export const netobj_data = [
  {
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
