import Enum from "./enum.js";

/////////////////////////////////////////////////////////////////////////

export var svctype = Enum("single", "ragne", "group");
export var svcprotocol = Enum("icmp=1", "tcp=6", "udp=17", "all=255");
export var any_port = 0;

export const svcobj_type_list = [
  { text: "Signle", value: svctype.single },
  { text: "Range", value: svctype.range },
  { text: "Group", value: svctype.group },
];

export class SvcObj {
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
