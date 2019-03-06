import * as lodash from "lodash";
import * as utils from "./utils.js";
import "./enum.js";
import { nsobj_base } from "./nsobjbase.js";
import * as netobj from "./netobj.js"


////////////////////////////////

export var objidx = lodash.enum("start", "end", "max");

export var spolicy_type = lodash.enum("firewall", "nat", "ips", "vpn");
export var spolicy_act_fw = lodash.enum("allow", "deny");
export var spolicy_act_nat = lodash.enum("snat", "dnat", "bnat");
export var spolicy_type_snat = lodash.enum("napt", "map", "hash", "redir");
export var spolicy_type_dnat = lodash.enum("map", "hash", "redir");

export var nat_options = lodash.enum("arp_proxy", "dynamic_ip");

export class natinfo extends nsobj_base {
  constructor(id) {
    super(id);
    this.nat_type = spolicy_type_snat.napt;
    this.options = [];
    this.nic = "";
    this.nat_ip = [];     //0: start ip, 1: end ip
    this.nat_port = [];   // 0: start port, 1: end port
  }
}

export class spolicy extends nsobj_base {
  constructor(id) {
    super(id);

    this.stype = spolicy_type.firewall;
    this.actions = [];
    this.network = [];    // 0: src, 1: dst
    this.nic = [];          // objidx.max
    this.enable = true;
    this.nat_info = [];   // 0: snat, 1: dnat
  }
}

export const nsruleset_VER = 1.0;
export const nsruleset_ID = "NetShield";
export class nsruleset {
  constructor() {
    this.ver = nsruleset_VER;
    this.id = nsruleset_ID;
    this.desc = "This is NetShield Rules";
    this.firewall = [];
    this.nat = [];
  }
}

///////////////////////////////////////////////

export function init_sample_nsruleset() {
  let r = new nsruleset();

  // for ssh
  let f1 = new spolicy();
  f1.stype = spolicy_type.firewall;
  f1.network[objidx.start] = "id-any-any";
  f1.network[objidx.end] = "id-ssh-server";
  f1.actions[0] = spolicy_act_fw.allow;
  f1.nic[objidx.start] = "dpdk0";
  f1.nic[objidx.end] = "dpdk0";

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

  r.firewall.push(f1);
  r.firewall.push(f2);
  r.firewall.push(f3);

  let n1 = new spolicy();
  let n2 = new spolicy();
  let n3 = new spolicy();


  r.nat.push(n1);
  r.nat.push(n2);
  r.nat.push(n3);

  console.log(r);
}
