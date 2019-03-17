import * as lodash from "lodash";
// import * as utils from "./utils.js";
import "./enum.js";
import * as baseclass from "./baseclass.js";
// import * as objclass from "./objclass.js"


////////////////////////////////

export var objidx = lodash.enum("start", "end", "max");

export var spolicy_type = lodash.enum("firewall", "nat", "ips", "vpn");
export var spolicy_act_fw = lodash.enum("allow", "deny");
export var spolicy_act_nat = lodash.enum("snat", "dnat", "bnat");
export var spolicy_type_snat = lodash.enum("napt", "map", "hash", "redir");
export var spolicy_type_dnat = lodash.enum("map", "hash", "redir");

export var spolicy_options = lodash.enum("log");
export var nat_options = lodash.enum("arp_proxy", "dynamic_ip");

export class natinfo extends baseclass.baseobj {
  constructor(id) {
    super(id);
    this.nat_type = spolicy_type_snat.napt;
    this.options = [];
    // this.nic = "";
    this.nat_network = [];     //0: ipobj, 1: svcobj
  }
}

export class spolicy extends baseclass.baseobj {
  constructor(id) {
    super(id);

    this.stype = spolicy_type.firewall;
    this.enable = true;
    this.actions = [];
    this.innic = null;
    this.outnic = null;
    this.srcnet = null;
    this.srcport = 65536;
    this.dstnet = null;
    this.dstport = 65536;
    this.schedule = null;
    this.options = [
      spolicy_options.log,
    ];

    this.natinfo = [];     // 0: snat, 1: dnat
  }
}

export const NSRULESET_VER = 1.0;
export const NSRULESET_ID = "NetShield";

export class spolicyset {
  constructor() {
    this.ver = NSRULESET_VER;
    this.id = NSRULESET_ID;
    this.desc = "This is NetShield Rules";
    this.firewall = [];
    this.nat = [];
  }
}

///////////////////////////////////////////////

export function init_sample_spolicyset() {
  let r = new spolicyset();


  // for ssh
  let f1 = new spolicy();

  f1.name = "ssh Server";
  f1.stype = spolicy_type.firewall;
  f1.srcnet = "id-any-any";
  f1.srcport = 65536;
  f1.dstnet = "id-ssh-server";
  f1.dstport = 22;
  f1.actions.push(spolicy_act_fw.allow);
  f1.innic = "eth0";
  f1.outnic = "any";

  /*
  let f2 = new spolicy();
  f2.stype = spolicy_type.firewall;
  f2.network[objidx.start] = "id-any-any";
  f2.network[objidx.end] = "id-web-server";
  f2.actions[0] = spolicy_act_fw.allow;
  f2.nic[objidx.start] = "any";
  f2.nic[objidx.end] = "any";

  let f3 = new spolicy();
  f3.stype = spolicy_type.firewall;
  f3.network[objidx.start] = "id-any-any";
  f3.network[objidx.end] = "id-any-server";
  f3.actions[0] = spolicy_act_fw.deny;
  f3.nic[objidx.start] = "any";
  f3.nic[objidx.end] = "any";
  */

  r.firewall.push(f1);
  /*
  r.firewall.push(f2);
  r.firewall.push(f3);

  let n1 = new spolicy();
  let n2 = new spolicy();
  let n3 = new spolicy();


  r.nat.push(n1);
  r.nat.push(n2);
  r.nat.push(n3);
  */

  // console.log(r);

  return r;
}
