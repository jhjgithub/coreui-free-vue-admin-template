<template>
  <div>
    <b-form @submit="on_submit" @reset="on_reset" v-if="local_show">
      <b-card header-tag="header" border-variant="light">
        <template slot="header">
          <b-row>
            <b-col class="card-header-text align-self-center">
              <h5 slot="header" class="my-0">{{title}}</h5>
            </b-col>
            <b-col class="text-right mx-0">
              <b-button class="mr-1" size="sm" type="submit">적용
                <font-awesome-icon class="top-btn" icon="check" size="lg" />
              </b-button>
              <b-button class="mr-1" size="sm" type="reset">리셋
                <font-awesome-icon class="top-btn" icon="eraser" size="lg" />
              </b-button>
              <b-button class="mr-1" size="sm" @click="on_close">닫기
                <font-awesome-icon class="top-btn" icon="times" size="lg" />
              </b-button>
            </b-col>
          </b-row>
        </template>

        <!-- ID & Name  -->
        <b-row class="my-1 mx-3">
          <b-col sm="5" class="align-self-top">
            <b-input-group size="sm" class="mb-2">
              <b-input-group-text text="Date" class="left-side-label" slot="prepend">Date</b-input-group-text>
              <b-form-input disabled size="sm" type="text" v-model="local_created_date" />
            </b-input-group>
            <b-input-group size="sm" class="mb-2">
              <b-input-group-text class="left-side-label" slot="prepend">ID</b-input-group-text>
              <b-form-input disabled size="sm" type="text" v-model="local_ipobj.id" />
            </b-input-group>
            <b-input-group size="sm" class="mb-2">
              <b-input-group-text class="left-side-label" slot="prepend">Name</b-input-group-text>
              <b-form-input size="sm" type="text" v-model="local_ipobj.name" name="name" v-validate="{ regex:/^[A-Za-z_-][A-Za-z0-9_-]*$/, required: true, min:3}"
                :state="validate_state('name')" placeholder="Enter Network object Name" />
            </b-input-group>
            <b-input-group size="sm">
              <b-input-group-text class="left-side-label" slot="prepend">Description</b-input-group-text>
              <b-form-textarea no-resize v-model="local_ipobj.desc" placeholder="Enter descirption" :rows="3" :max-rows="3" />
            </b-input-group>
          </b-col>

          <b-col sm="7" class="align-self-top">
            <b-row>
              <b-input-group size="sm" class="mb-2">
                <b-input-group-text class="right-side-label" slot="prepend">Address Type</b-input-group-text>
                <b-form-radio-group buttons button-variant="outline-secondary" class="ml-1" size="sm" v-model="local_ipobj.type"
                  :options="iptype_list" @input="on_change_objtype" />
                <b-form-radio-group v-if="local_ipobj.type != iptype.group" class="ml-1" buttons button-variant="outline-secondary"
                  size="sm" v-model="local_ipobj.ipaddr_ver" :options="ipver_list" />
              </b-input-group>
            </b-row>

            <b-row>
              <b-input-group size="sm" class="mb-2">
                <b-input-group-text class="right-side-label" slot="prepend">IP Address</b-input-group-text>
                <b-form-input :disabled="local_ipobj.type === iptype.group" class="ip_addr" size="sm" type="text" key="start_ip"
                  name="start_ip" v-model="local_ipobj.ipaddr_start" v-validate="{ip: true, required: true}" :state="validate_state('start_ip')"
                  placeholder="Enter IP address" />
                <b-form-input v-if="local_ipobj.type === iptype.netmask" class="ip_mask ml-1" size="sm" type="text" key="mask"
                  name="mask" v-model="local_ipobj.netmask" v-validate="{between:[1,32], required: true} " :state="validate_state('mask')"
                  placeholder="Netmask" />
                <b-form-input v-if="local_ipobj.type === iptype.range" class="ip_addr ml-1" size="sm" type="text" key="end_ip"
                  name="end_ip" v-model="local_ipobj.ipaddr_end" v-validate="{ip: true, required: true}" :state="validate_state('end_ip')"
                  placeholder="Enter IP address" />
              </b-input-group>
            </b-row>

            <b-row>
              <b-input-group size="sm" class="mb-2">
                <b-input-group-text class="right-side-label" slot="prepend">Subobject</b-input-group-text>
                <!-- Subobj -->

                <b-form-select ref="ref_subobj" multiple :select-size="5" @focusout.native="on_focus_out" v-model="selected_subipobjs"
                  key="subobj" name="subobj" v-validate="'subobj_len'" :state="validate_state('subobj')" :options="local_sub_ipobjs" />

                <b-col sm="2" class="align-self-center">
                  <div>
                    <span>
                      <b-button-group vertical>
                        <b-button ref="ref_up_subobj" @click="on_moveup_subobj" class="mr-1 subobj-btn" size="sm" variant="secondary">
                          <!-- 추가 -->
                          <font-awesome-icon icon="caret-up" size="lg" />
                        </b-button>
                        <b-button ref="ref_down_subobj" @click="on_movedown_subobj" class="mr-1 subobj-btn" size="sm" variant="secondary">
                          <!-- 삭제 -->
                          <font-awesome-icon icon="caret-down" size="lg" />
                        </b-button>
                      </b-button-group>
                    </span>
                    <span>
                      <b-button-group vertical>
                        <b-button ref="ref_add_subobj" @click="on_add_subobj" class="ml-1 subobj-btn" size="sm" variant="secondary">
                          <font-awesome-icon icon="plus" size="sm" />
                        </b-button>
                        <b-button ref="ref_del_subobj" @click="on_del_subobj" class="ml-1 subobj-btn" size="sm" variant="secondary">
                          <font-awesome-icon icon="minus" size="sm" />
                        </b-button>
                      </b-button-group>
                    </span>
                  </div>
                </b-col>
              </b-input-group>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </b-form>
  </div>
</template>

<script>
import {iptype, iptype_list, ipver, ipver_list} from "../../nslib/ipobj";
import * as ipobjview from "../../nslib/ipobjView";
import * as misc from "../../nslib/misc.js";


export default {
  components: {
  },
  props: {
    ipobj: {
      type: Object,
      default: () => { }
    },
    sub_ipobjs: {
      tyep: Array,
      default: () => []
    },
    show: {
      type: Boolean,
      default: false
    },
    cmd: {
      type: String,
      default: "new",
    },
    selected_ipobjs: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      local_ipobj: new ipobjview.ipobjView(),
      local_sub_ipobjs: [],
      local_selected_ipobjs: this.selected_ipobjs.items,
      local_show: false,
      local_created_date: "",
      iptype: iptype,
      ipver: ipver,
      title: "New IP Address Object",
      selected_subipobjs: [],
      iptype_list: iptype_list,
      ipver_list: ipver_list,
    };
  },

  created() {
    this.$validator.extend('child_len', {
      getMessage: field => field + ' needs at least a child.',
      validate: value => {
        if (this.local_ipobj.type == iptype.group) {
          let l = this.local_ipobj.children.length;
          return l > 0;
        }
        else {
          return null;
        }
      }
    });

    this.$validator.extend('subobj_len', (value, [otherValue]) => {
      // do something and finally return an object like this one:

      let v = true;
      let r = false;

      if (this.local_ipobj.type == iptype.group) {
        let l = this.local_sub_ipobjs.length;
        v = l > 0;
        r = true;
      }
      else {
        return {
          valid: true,
          data: {
            required: false,
          }
        };
      }

      return {
        valid: v,
        data: {
          required: r,
        }
      };

    },
      {
        computesRequired: true
      });
  },

  mounted: function () {
  },

  watch: {
    local_show() {
      if (this.local_show) {
        this.$nextTick(function () {
          // local_show myself
          if (this.ipobj) {
            this.title = "Edit IP Address Object";
            this.init_local_ipobj(this.ipobj);
            this.reset_select();
          }
          else {
            this.init_local_ipobj(null);
          }

          this.update_subobj_btn_state();
        });
      }
      else {
        // hide myself
        this.local_ipobj = new ipobjview.ipobjView();
        this.selected_subipobjs = [];
        this.local_sub_ipobjs = [];
      }
    },
    show(new_val, old_val) {
      this.local_show = this.show;
    },
    selected_ipobjs: {
      // immediate: true,
      deep: true,
      handler(new_val, old_val) {
        this.update_subobj_btn_state();
      }
    },
    selected_subipobjs(new_val, old_val) {
      this.update_subobj_btn_state();
    }
  },

  computed: {},

  methods: {
    init_local_ipobj(obj) {
      if (obj) {
        this.local_ipobj = misc.clone_deep(obj);
        this.local_ipobj._selected = false;
        this.local_sub_ipobjs = this.sub_ipobjs;
      }
      else {
        // new
        let a = new ipobjview.ipobjView();
        a.init_id()
        a.init_created_date();
        this.local_ipobj = a;
      }

      let d = new Date(Number(this.local_ipobj.created_date));
      this.local_created_date = d.toLocaleString();
      this.errors.clear();
      this.$validator.reset();
    },

    normalize() {
      let ipobj = this.local_ipobj;
      ipobj.children = [];
      this.local_sub_ipobjs.forEach((c) => {
        ipobj.children.push(c.value);
      });

      if (ipobj.type == iptype.group) {
        ipobj.ipaddr_start = "";
        ipobj.ipaddr_end = "";
        ipobj.netmask = "";
      }
      else if (ipobj.type == iptype.netmask) {
        ipobj.ipaddr_end = "";
      }
      else {
        ipobj.netmask = "";
      }
    },

    on_submit(evt) {
      evt.preventDefault();

      this.$validator.validate().then(result => {
        if (!result) {
          console.log(this.errors);
        }

        this.normalize();
        this.$emit("eventSubmitIpObjInput", this.local_ipobj);
      });
    },

    validate_state(ref) {
      let f = this.veeFields[ref];

      if (f && (f.dirty || f.validated)) {
        if (ref == 'subobj' && this.local_ipobj.type != iptype.group) {
          return null;
        }

        return !this.errors.has(ref)
      }

      return null
    },

    on_change_objtype() {
      this.errors.clear();
      this.$validator.reset();
    },

    on_close(evt) {
      this.$emit("eventCloseIpObjInput");
    },

    reset_select() {
      this.$emit("eventResetSelect");
    },

    on_reset(evt) {
      evt.preventDefault();
      this.init_local_ipobj(null);

      /* Trick to reset/clear native browser form validation state */
      this.local_show = false;
      this.$nextTick(() => {
        this.local_show = true;
      });
    },

    on_add_subobj() {
      let len = Object.keys(this.local_selected_ipobjs).length;
      for (let i = 0; i < len; i++) {
        let name = this.local_selected_ipobjs[i].name;
        let id = this.local_selected_ipobjs[i].id;

        let c = {
          value: id,
          text: name,
        };

        let e = this.local_sub_ipobjs.find(item => item.value === id);
        if (!e) {
          this.local_sub_ipobjs.push(c);
        }
      }

      if (this.selected_subipobjs.length == 0) {
        this.selected_subipobjs[0] = this.local_sub_ipobjs[0];
      }

      if (this.validate_state('subobj' != null)) {
        this.$validator.validate('subobj');
      }

      this.reset_select();
    },

    on_del_subobj() {
      let len = this.selected_subipobjs.length;
      let first_idx = 0;

      for (let i = 0; i < len; i++) {
        let id = this.selected_subipobjs[i];
        let idx = this.local_sub_ipobjs.findIndex(item => item.value === id);

        if (idx == -1) {
          continue;
        }

        if (i == 0) {
          first_idx = idx;
        }

        this.local_sub_ipobjs.splice(idx, 1);
      }

      this.selected_subipobjs = [];
      len = this.local_sub_ipobjs.length;

      if (len > 0) {
        if (first_idx >= len) {
          first_idx = len - 1;
        }

        this.selected_subipobjs[0] = this.local_sub_ipobjs[first_idx];
      }

      this.$validator.validate('subobj');
      this.update_subobj_btn_state();
    },

    on_moveup_subobj(event) {
      let len = this.selected_subipobjs.length;
      for (let i = 0; i < len; i++) {
        let id = this.selected_subipobjs[i];
        let idx = this.local_sub_ipobjs.findIndex(item => item.value === id);
        if (idx > 0) {
          misc.array_move(this.local_sub_ipobjs, idx, idx - 1);
        }
        else if (i == 0 && idx == 0) {
          return;
        }
      }
    },

    on_movedown_subobj(event) {
      let len = this.selected_subipobjs.length;
      let max_idx = this.local_sub_ipobjs.length - 1;

      for (let i = len - 1; i >= 0; i--) {
        let id = this.selected_subipobjs[i];
        let idx = this.local_sub_ipobjs.findIndex(item => item.value === id);
        if (idx < max_idx) {
          misc.array_move(this.local_sub_ipobjs, idx, idx + 1);
        }
        else if (i == len - 1) {
          return;
        }
      }
    },

    on_focus_out() {
      // var vm = this;
      // setTimeout(function() {
      //   vm.selected_subipobjs = [];
      // }, 300);
    },

    update_subobj_btn_state() {
      if (!this.local_show) {
        return;
      }

      let len = Object.keys(this.local_selected_ipobjs).length;

      if (this.$refs.ref_add_subobj)
        this.$refs.ref_add_subobj.disabled = len <= 0;
      if (this.$refs.ref_del_subobj)
        this.$refs.ref_del_subobj.disabled = this.selected_subipobjs.length <= 0;
      if (this.$refs.ref_up_subobj)
        this.$refs.ref_up_subobj.disabled = this.selected_subipobjs.length <= 0;
      if (this.$refs.ref_down_subobj)
        this.$refs.ref_down_subobj.disabled = this.selected_subipobjs.length <= 0;
    }
  },

};
</script>

<style>
.card-btn {
  /* width:190px; */
  /* display:flex; */
  /* flex-direction:row; */
  justify-content: space-between;
  align-items: center;
  text-align: right;
}

.card-header-text {
  /* align-items:center; */
  margin-left: 20px;
  text-align: left;
}

.card-header {
  padding: 5px;
}

.left-side-label:before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}

.left-side-label {
  /* background-color: blue; */
  vertical-align: middle;
  text-align: right;
  display: inline-block;
  width: 90px;
}

.right-side-label:before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}

.right-side-label {
  /* background-color: blue; */
  /* text-align: right; */
  text-align: right;
  display: inline-block;
  width: 100px;
}

.ip_addr {
  max-width: 200px;
}

.ip_mask {
  max-width: 70px;
}

.btn-sm,
.btn-group-sm > .btn {
  border-radius: 0.5rem;
}

/*
.ipadd_type.btn-group-toggle.btn-group.btn-group-sm {
  background-color: red;
} 
*/

.subobj-btn {
  padding: 3px;
}

.btn-group-vertical > .btn,
.btn-group-vertical > .btn-group {
  width: 25px;
}

.top-btn {
  color: rgb(80, 80, 80);
}

.btn-secondary.disabled,
.btn-secondary:disabled {
  color: #8f8e8e;
}
.was-validated .form-control:valid,
.form-control.is-valid {
  background-image: none;
}

.was-validated .form-control:invalid,
.form-control.is-invalid {
  background-image: none;
}
</style>