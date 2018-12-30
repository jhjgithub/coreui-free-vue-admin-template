////////////////////
// define data struct

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
    showDetail: "true"
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

export const column_icons = {

  'FirstName' : 'fa fa-home fa-lg',
  'LastName' : 'fa fa-camera-retro fa-lg',  
}

export const custom_header = function(text, align, height) {      
  var icon_name = column_icons[text];
  // console.log("text=" + text + " ,icon=" + icon_name)

  if (icon_name) {
    return "<div style='margin: 5px; margin-top: 7px;'><i class='" + icon_name + "' /><span style='margin-left: 4px;'>Name</span><div style='clear: both;'></div></div>";
  }

  return '';
};

export const netobj_columns = [
  {
    text: "FirstName",
    columnGroup: "Name",
    dataField: "FirstName",
    renderer: custom_header,    
    width: 200,
  },
  {
    text: "LastName",
    columnGroup: "Name",
    dataField: "LastName",
    renderer: custom_header,    
    width: 200
  },
  { text: "Title", dataField: "Title", width: 160 },
  {
    text: "Birth Date",
    dataField: "BirthDate",
    cellsFormat: "d",
    // className: 'fa fa-home fa-fw',
    width: 120
  },
  {
    text: "Hire Date",
    dataField: "HireDate",
    cellsFormat: "d",
    width: 100
  },
  { text: "Address", dataField: "Address", width: 200 },
  { text: "City", dataField: "City", width: 100 },
  { text: "Country", dataField: "Country" },
  {
    text: "Edit",
    cellsAlign: "center",
    align: "center",
    columnType: "none",
    editable: false,
    sortable: false,
    dataField: null,
    width: 100,
    cellsRenderer: (row, column, value) => {
      return (
        `<div data-row='` + row +
        `' class='editButton' style='margin-left: 1em; float: left'></div> <div data-row='` + row +
        `' class='cancelButton' style='display: none; float: left; margin-left: 1em'></div>`
      );
    }
  }
];

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
