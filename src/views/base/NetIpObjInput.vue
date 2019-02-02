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
                <font-awesome-icon class="top-btn" icon="check" size="lg"/>
              </b-button>
              <b-button class="mr-1" size="sm" type="reset">리셋
                <font-awesome-icon class="top-btn" icon="eraser" size="lg"/>
              </b-button>
              <b-button class="mr-1" size="sm" @click="on_close">닫기
                <font-awesome-icon class="top-btn" icon="times" size="lg"/>
              </b-button>
            </b-col>
          </b-row>
        </template>

        <!-- ID & Name  -->
        <b-row class="my-1 mx-3">
          <b-col sm="5" class="align-self-top">
            <b-input-group size="sm" class="mb-2">
              <b-input-group-text class="left-side-label" slot="prepend">
                <!-- <strong>Date</strong> -->
                Date
              </b-input-group-text>
              <b-form-input disabled size="sm" type="text" v-model="local_netipobj.create_date" :formatter="date_format"/>
            </b-input-group>
            <b-input-group size="sm" class="mb-2">
              <b-input-group-text class="left-side-label" slot="prepend">ID</b-input-group-text>
              <b-form-input disabled size="sm" type="text" v-model="local_netipobj.obj_id"/>
            </b-input-group>
            <b-input-group size="sm" class="mb-2">
              <b-input-group-text class="left-side-label" slot="prepend">Name</b-input-group-text>
              <b-form-input size="sm" type="text" v-model="local_netipobj.obj_name" required placeholder="Enter Network object Name"/>
            </b-input-group>
            <b-input-group size="sm">
              <b-input-group-text class="left-side-label" slot="prepend">Description</b-input-group-text>
              <b-form-textarea no-resize v-model="local_netipobj.desc" placeholder="Enter descirption" :rows="3" :max-rows="3"/>
            </b-input-group>
          </b-col>

          <b-col sm="7" class="align-self-top">
            <b-row>
              <b-input-group size="sm" class="mb-2">
                <b-input-group-text class="right-side-label" slot="prepend">Address Type</b-input-group-text>
                <b-form-radio-group buttons button-variant="outline-secondary" class="ml-1" size="sm" v-model="local_netipobj.ipaddr_type" :options="ipaddr_type_list"/>
                <b-form-radio-group
                  v-if="local_netipobj.ipaddr_type != 'group'"
                  class="ml-1"
                  buttons
                  button-variant="outline-secondary"
                  size="sm"
                  v-model="local_netipobj.ipaddr_ver"
                  :options="ipaddr_ver_list"
                />
              </b-input-group>
            </b-row>

            <b-row>
              <b-input-group size="sm" class="mb-2">
                <b-input-group-text class="right-side-label" slot="prepend">IP Address</b-input-group-text>
                <b-form-input
                  :disabled="local_netipobj.ipaddr_type == 'group'"
                  class="ip_addr"
                  size="sm"
                  type="text"
                  v-model="local_netipobj.ipaddr_start"
                  required
                  placeholder="Enter IP address"
                  :formatter="ip_formatter"
                />
                <b-form-input v-if="local_netipobj.ipaddr_type === 'netmask'" class="ip_mask ml-1" size="sm" type="text" v-model="local_netipobj.netmask" required placeholder="Netmask"/>

                <b-form-input v-if="local_netipobj.ipaddr_type === 'iprange'" class="ip_addr ml-1" size="sm" type="text" v-model="local_netipobj.netmask" required placeholder="End IP address"/>
              </b-input-group>
            </b-row>

            <b-row>
              <b-input-group size="sm" class="mb-2">
                <b-input-group-text class="right-side-label" slot="prepend">Subobject</b-input-group-text>
                <b-form-select ref="ref_subobj" multiple :select-size="5" @focusout.native="on_focus_out" v-model="selected_child" :options="local_netipobj.children"/>

                <b-col sm="2" class="align-self-center">
                  <div>
                    <span>
                      <b-button-group vertical>
                        <b-button ref="ref_up_subobj" @click="on_moveup_subobj" class="mr-1 subobj-btn" size="sm" variant="secondary">
                          <!-- 추가 -->
                          <font-awesome-icon icon="caret-up" size="lg"/>
                        </b-button>
                        <b-button ref="ref_down_subobj" @click="on_movedown_subobj" class="mr-1 subobj-btn" size="sm" variant="secondary">
                          <!-- 삭제 -->
                          <font-awesome-icon icon="caret-down" size="lg"/>
                        </b-button>
                      </b-button-group>
                    </span>
                    <span>
                      <b-button-group vertical>
                        <b-button ref="ref_add_subobj" @click="on_add_subobj" class="ml-1 subobj-btn" size="sm" variant="secondary">
                          <font-awesome-icon icon="plus" size="sm"/>
                        </b-button>
                        <b-button ref="ref_del_subobj" @click="on_del_subobj" class="ml-1 subobj-btn" size="sm" variant="secondary">
                          <font-awesome-icon icon="minus" size="sm"/>
                        </b-button>
                      </b-button-group>
                    </span>
                  </div>
                </b-col>
              </b-input-group>
            </b-row>
          </b-col>
        </b-row>

        <!-- <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>-->
      </b-card>
    </b-form>
  </div>
</template>

<script>
import { format_ipv4_address, array_move } from "./nodeHelper.js";

export default {
  props: {
    netipobj: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean,
      default: false
    },
    selected_items: {
      type: Object,
      default: () => {}
    }
    // subobj: []
  },
  data() {
    return {
      local_netipobj: {
        obj_id: "",
        obj_name: "",
        create_date: "",
        ipaddr_type: "",
        ipaddr_ver: "",
        ipaddr_start: "",
        netmask: "",
        desc: "",
        children: []
      },
      local_selected_items: this.selected_items.sel_items,
      local_show: false,

      title: "New Network Object",
      selected_child: [],
      ipaddr_type_list: [
        { text: "Group", value: "group" },
        { text: "Netmask", value: "netmask" },
        { text: "IP Range", value: "iprange" }
      ],
      ipaddr_ver_list: [
        { text: "IPv4", value: "4" },
        { text: "IPv6", value: "6" }
      ]
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      // console.log("run updated!!!!!");
      // this.reset_select();
    });
  },
  watch: {
    local_show() {
      if (this.local_show) {
        this.$nextTick(function() {
          // local_show myself
          if (this.netipobj) {
            this.title = "Edit Network Object";
            this.init_local_netipobj(this.netipobj);
            this.reset_select();
          } else {
            this.init_local_netipobj(null);
          }

          this.update_subobj_btn_state();
        });
      } else {
        // hide myself
        this.init_local_netipobj(null);
      }
    },
    show(new_val, old_val) {
      this.local_show = this.show;
    },
    selected_items: {
      // immediate: true,
      deep: true,
      handler(new_val, old_val) {
        this.update_subobj_btn_state();
      }
    },
    selected_child(new_val, old_val) {
      this.update_subobj_btn_state();
    }
    // subobj: function() {
    //   console.log(this.subobj);
    // },
  },
  computed: {},
  methods: {
    init_local_netipobj(obj) {
      if (obj) {
        // edit
        this.local_netipobj.obj_id = obj.obj_id;
        this.local_netipobj.obj_name = obj.obj_name;
        this.local_netipobj.create_date = obj.create_date;
        this.local_netipobj.ipaddr_type = obj.ipaddr_type;
        this.local_netipobj.ipaddr_ver = obj.ipaddr_ver;
        this.local_netipobj.ipaddr_start = obj.ipaddr_start;
        this.local_netipobj.netmask = obj.netmask;
        this.local_netipobj.desc = obj.desc;
        this.local_netipobj.children = obj.children;
      } else {
        // new
        let id = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
        this.local_netipobj.obj_id = "id-" + id.toString();
        this.local_netipobj.obj_name = "";
        // this.local_netipobj.create_date = d.toLocaleString();
        this.local_netipobj.create_date = new Date();
        this.local_netipobj.ipaddr_type = "netmask"; // goup, iprange, netmask
        this.local_netipobj.ipaddr_ver = "4"; // 4 or 6
        this.local_netipobj.ipaddr_start = "";
        this.local_netipobj.netmask = "";
        this.local_netipobj.desc = "";
        this.local_netipobj.children = [];
        // { value: 'local_netipobj-1', text: 'local_netipobj-1'},
        // { value: 'local_netipobj-2', text: 'local_netipobj-2'},
        // { value: 'local_netipobj-3', text: 'local_netipobj-3'},
      }
    },

    on_submit(evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.local_netipobj));

      this.$emit("eventSubmitNetIpObjInput", this.local_netipobj);
    },

    on_close(evt) {
      this.$emit("eventCloseNetIpObjInput");
    },

    reset_select() {
      this.$emit("eventResetSelect");
    },

    on_reset(evt) {
      evt.preventDefault();
      this.init_local_netipobj(null);

      /* Trick to reset/clear native browser form validation state */
      this.local_show = false;
      this.$nextTick(() => {
        this.local_show = true;
      });
    },

    on_add_subobj() {
      let len = Object.keys(this.local_selected_items).length;
      for (let i = 0; i < len; i++) {
        let name = this.local_selected_items[i].obj_name;

        if (this.local_netipobj.children.indexOf(name) == -1) {
          this.local_netipobj.children.push(name);
        }
      }

      this.reset_select();
    },
    on_del_subobj() {
      let len = this.selected_child.length;
      for (let i = 0; i < len; i++) {
        let name = this.selected_child[i];
        let idx = this.local_netipobj.children.indexOf(name);
        if (idx != -1) {
          this.local_netipobj.children.splice(idx, 1);
        }
      }

      this.selected_child = [];
      this.update_subobj_btn_state();
    },

    on_moveup_subobj(event) {
      let len = this.selected_child.length;
      for (let i = 0; i < len; i++) {
        let name = this.selected_child[i];
        let idx = this.local_netipobj.children.indexOf(name);
        if (idx > 0) {
          array_move(this.local_netipobj.children, idx, idx - 1);
        } else if (i == 0 && idx == 0) {
          return;
        }
      }
    },

    on_movedown_subobj(event) {
      let len = this.selected_child.length;
      let max_idx = this.local_netipobj.children.length - 1;

      for (let i = len - 1; i >= 0; i--) {
        let name = this.selected_child[i];
        let idx = this.local_netipobj.children.indexOf(name);
        if (idx < max_idx) {
          array_move(this.local_netipobj.children, idx, idx + 1);
        } else if (i == len - 1) {
          return;
        }
      }
    },

    on_focus_out() {
      // var vm = this;
      // setTimeout(function() {
      //   vm.selected_child = [];
      // }, 300);
    },

    date_format(value, event) {
      if (value) {
        return value.toLocaleString();
      }
      return "";
    },

    ip_formatter(value, event) {
      return value;
    },

    update_subobj_btn_state() {
      if (!this.local_show) {
        return;
      }

      let len = Object.keys(this.local_selected_items).length;

      if (this.$refs.ref_add_subobj)
        this.$refs.ref_add_subobj.disabled = len <= 0;
      if (this.$refs.ref_del_subobj)
        this.$refs.ref_del_subobj.disabled = this.selected_child.length <= 0;
      if (this.$refs.ref_up_subobj)
        this.$refs.ref_up_subobj.disabled = this.selected_child.length <= 0;
      if (this.$refs.ref_down_subobj)
        this.$refs.ref_down_subobj.disabled = this.selected_child.length <= 0;
    }
  }
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
</style>