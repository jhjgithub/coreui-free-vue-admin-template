import * as lodash from "lodash";
import "./enum.js";

// import * as utils from "./utils.js";
// import * as baseclass from "./baseclass.js";

/////////////////////////////////////////////////////////////////////////

export var svcobj_type = lodash.enum("single", "ragne", "group");
export var svcobj_protocol = lodash.enum("icmp=1", "tcp=6", "udp=17", "all=255");

export const svcobj_type_list = [
  { text: "Signle", value: svcobj_type.single },
  { text: "Range", value: svcobj_type.range },
  { text: "Group", value: svcobj_type.group },
];

export class svcobj {
  constructor(id) {
    this.id = id;
    this.name = "";
    this.created_date = "";
    this.desc = "";
    this.type = svcobj_type.single;

    this.protocol = svcobj_protocol.tcp;
    this.port_start = 0;
    this.port_end = 0;

  }

}
