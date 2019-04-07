import Enum from "./enum.js";


/////////////////////////////////////////////////////////////////////////

export var iptype = Enum("group", "netmask", "range");
export var ipver = Enum("v4", "v6");

export const iptype_list = [
  { text: "Group", value: iptype.group },
  { text: "Netmask", value: iptype.netmask },
  { text: "Range", value: iptype.range },
];

export const ipver_list = [{ text: "IPv4", value: ipver.v4 }, { text: "IPv6", value: ipver.v6 }];

export class IpObj {
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
