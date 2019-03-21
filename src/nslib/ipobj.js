import * as lodash from "lodash";
import "./enum.js";

// import * as utils from "./utils.js";
// import * as baseclass from "./baseclass.js";


/////////////////////////////////////////////////////////////////////////

export var ipobj_type = lodash.enum("group", "netmask", "range");
export var ipobj_ipver = lodash.enum("v4", "v6");

export const ipobj_type_list = [
  { text: "Group", value: ipobj_type.group },
  { text: "Netmask", value: ipobj_type.netmask },
  { text: "Range", value: ipobj_type.range },
];

export const ipobj_ipver_list = [
  { text: "IPv4", value: ipobj_ipver.v4 },
  { text: "IPv6", value: ipobj_ipver.v6 }
];

export class ipobj {
  constructor(id) {
    this.id = id;
    this.name = "";
    this.created_date = "";
    this.desc = "";
    this.type = ipobj_type.netmask;

    // for network
    this.ipaddr_ver = ipobj_ipver.v4;
    this.ipaddr_start = "";
    this.ipaddr_end = "";
    this.netmask = 0;
  }
}
