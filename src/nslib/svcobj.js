import * as lodash from "lodash";
import "./enum.js";

// import "./enum.js";
// import * as utils from "./utils.js";
// import * as baseclass from "./baseclass.js";

/////////////////////////////////////////////////////////////////////////

export var svctype = lodash.enum("single", "ragne", "group");
export var svcprotocol = lodash.enum("icmp=1", "tcp=6", "udp=17", "all=255");
export var any_port = 0;

export const svcobj_type_list = [
  { text: "Signle", value: svctype.single },
  { text: "Range", value: svctype.range },
  { text: "Group", value: svctype.group },
];

export class svcobj {
  constructor(id) {
    this.id = id;
    this.name = "";
    this.created_date = "";
    this.desc = "";
    this.type = svctype.single;

    this.protocol = svcprotocol.tcp;
    this.port_start = any_port;
    this.port_end = any_port;
  }
}
