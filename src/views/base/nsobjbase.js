import * as lodash from "lodash";

////////////////////////////////

export class nsobj_base {
  constructor(id) {
    if (!id) {
      this.init_id();
    }
    else {
      this.id = id;
    }

    this.name = "";
    this.created_date = "";
    this.desc = "";

    // for internal
    // bootstrap table에서 _로 시작하는 property는 검색에서 제외.
    this._selected = false;
    // sort 시 원래의 위치를 기억하기 위해서 사용. node 가 변경 되면 갱신 해야 한다.
    this._fix_idx = -1;

    this.init_created_date();
  }

  init_internal_data() {
    this._selected = false;
    this._fix_idx = -1;
  }

  init_id(max_range=1000000) {
    let id = Math.floor(Math.random() * (max_range - 1 + 1)) + 1;
    this.id = "id-" + id.toString();
  }

  init_created_date() {
    this.created_date = Date.now().toString();
  }

  clone_deep() {
    return lodash.cloneDeep(this);
  }

  assign(from) {
    lodash.assign(this, from);
  }

  reset() {
    this.id = "";
    this.name = "";
    this.created_date = "";
    this.desc = "";
  }
}

///////////////////////////////////////////////
