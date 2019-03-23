import * as lodash from "lodash";
import "./enum.js";

// import * as utils from "./utils.js";
// import * as baseclass from "./baseclass.js";


/////////////////////////////////////////////////////////////////////////

export var iptype = lodash.enum("group", "netmask", "range");
export var ipver = lodash.enum("v4", "v6");

export const iptype_list = [
  { text: "Group", value: iptype.group },
  { text: "Netmask", value: iptype.netmask },
  { text: "Range", value: iptype.range },
];

export const ipver_list = [
  { text: "IPv4", value: ipver.v4 },
  { text: "IPv6", value: ipver.v6 }
];

export class ipobj {
  constructor(id) {
    this.id = id;
    this.name = "";
    this.created_date = "";
    this.desc = "";
    this.type = iptype.netmask;

    // for network
    this.ipaddr_ver = ipver.v4;
    this.ipaddr_start = "";
    this.ipaddr_end = "";
    this.netmask = 0;
  }
}
