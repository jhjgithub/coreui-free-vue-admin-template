import Enum from "./enum.js";
import * as misc from "./misc.js";
import * as spolicy from "./spolicy.js";


///////////////////////////////////////////////////////

export const NS_RULESET_VER = 1.0;
export const NS_RULESET_ID = "NetShield";

export class SecurityPolicySet {
  constructor() {
    this.ver = NS_RULESET_VER;
    this.id = NS_RULESET_ID;
    this.desc = "This is NetShield Rules";
    this.spolicy = [];
    this.nat = [];
  }

  get spolicy_length() {
    return this.spolicy.length;
  }

  set_spolicy_items(items) {
    let len = items.length;

    for (let i = 0; i < len; i++) {
      let item = new spolicy.SecurityPolicy();
      misc.assign_deep(item, items[i]);
      this.spolicy.push(item);
    }
  }

}

///////////////////////////////////////////////

export function init_sample_spolicyset() {
  let r = new SecurityPolicySet();

  // for ssh
  let f1 = new spolicy.SecurityPolicy();

  f1.name = "ssh Server";
  f1.stype = spolicy.spolicy_type.firewall;
  f1.srcnet = "id-any-any";
  f1.srcport = 65536;
  f1.dstnet = "id-ssh-server";
  f1.dstport = 22;
  f1.actions.push(spolicy.spolicy_act_fw.allow);
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
