import * as svcobj from "svcobj"

/////////////////////////////////////////////////////////////////////////

export class SvcObjView extends svcobj.SvcObj {
  constructor(id) {
    super(id);

    // for group
    this.children = [];
    this._depth = 0;
    this._parent_id = [];
    this._visible_child = [];
    // bootstrap table에서 _로 시작하는 property는 검색에서 제외.
    this._selected = false;
    // sort 시 원래의 위치를 기억하기 위해서 사용. node 가 변경 되면 갱신 해야 한다.
    this._fix_idx = -1;
  }

  init_internal_data() {
    this._selected = false;
    this._fix_idx = -1;
    this._depth = 0;
  }

  init_id(max_range = 1000000) {
    let id = Math.floor(Math.random() * (max_range - 1 + 1)) + 1;
    this.id = "svcobj-id-" + id.toString();
  }

  init_created_date() {
    this.created_date = Date.now().toString();
  }

  get child_len() {
    return this.children.length;
  }

  add_child(child, at_top = false) {
    child._parent_id.push(this.id);

    if (at_top) {
      this.children.unshift(child.id);
    }
    else {
      this.children.push(child.id);
    }
  }
}
