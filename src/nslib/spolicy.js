import Enum from "./enum.js";

////////////////////////////////

export var objidx = Enum("start", "end", "max");

export var spolicy_type = Enum("firewall", "nat", "ips", "vpn");
export var spolicy_act_fw = Enum("allow", "deny");
export var spolicy_act_nat = Enum("snat", "dnat", "bnat");
export var spolicy_type_snat = Enum("napt", "map", "hash", "redir");
export var spolicy_type_dnat = Enum("map", "hash", "redir");
export var spolicy_any_port = 65536;

export var spolicy_options = Enum("log");
export var nat_options = Enum("arp_proxy", "dynamic_ip");

export class NatInfo {
  constructor(id) {
    this.id = id;
    this.ntype = spolicy_type_snat.napt;
    this.options = [];
    // this.nic = "";
    this.nat_network = []; //0: ipobj, 1: svcobj
  }
}

// security policy
export class SecurityPolicy {
  constructor(id) {
    this.id = id;
    this.name = "";
    this.created_date = "";
    this.desc = "";
    this.stype = spolicy_type.firewall;
    this.enable = true;
    this.actions = [];
    this.innic = null;
    this.outnic = null;
    this.srcnet = null;
    this.srcport = spolicy_any_port;
    this.dstnet = null;
    this.dstport = spolicy_any_port;
    this.schedule = null;
    this.options = [spolicy_options.log];

    this.natinfo = []; // 0: snat, 1: dnat
  }

  get_ip_address() {

  }
}
