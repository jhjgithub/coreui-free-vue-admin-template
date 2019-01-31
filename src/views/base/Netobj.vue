<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="showMe">
      <b-card header-tag="header" border-variant="light">
        <template slot="header">
          <b-row>
            <b-col class="card-header-text align-self-center">
              <h5 slot="header" class="my-0">{{title}}</h5>
            </b-col>
            <b-col class="text-right mx-0">
              <b-button class="mr-1" size="sm" type="submit">
                적용
                <font-awesome-icon class="top_btn" icon="check"  size="lg" />
              </b-button>
              <b-button class="mr-1" size="sm" type="reset" >
                리셋
                <font-awesome-icon  class="top_btn" icon="eraser"  size="lg" />
                </b-button>
              <b-button class="mr-1" size="sm" @click="onClose">
                닫기
                <font-awesome-icon class="top_btn" icon="times" size="lg"/>
              </b-button>               

            </b-col>
          </b-row>
        </template>

        <!-- ID & Name  -->
        <b-row class="my-1 mx-3">
          <b-col sm="5" class="align-self-top">
            <b-input-group size="sm" class="mb-2 ">
              <b-input-group-text class="left-side-label" slot="prepend">
                <!-- <strong>Date</strong> -->
                Date
              </b-input-group-text>
              <b-form-input disabled size="sm" type="text" v-model="netobj.create_date" :formatter="date_format"/>
            </b-input-group>
            <b-input-group size="sm" class="mb-2 ">
              <b-input-group-text class="left-side-label" slot="prepend">
                ID
              </b-input-group-text>
              <b-form-input disabled size="sm" type="text" v-model="netobj.netobj_id" />
            </b-input-group>
            <b-input-group size="sm" class="mb-2" >
              <b-input-group-text class="left-side-label" slot="prepend">
                Name
              </b-input-group-text>
              <b-form-input size="sm" type="text" v-model="netobj.netobj_name" required placeholder="Enter Network object Name" />
            </b-input-group>
            <b-input-group size="sm" >
              <b-input-group-text class="left-side-label" slot="prepend">
                Description
              </b-input-group-text>
              <b-form-textarea no-resize v-model="netobj.desc" placeholder="Enter descirption" :rows="3" :max-rows="3"/>
            </b-input-group>
          </b-col>

          <b-col sm="7" class="align-self-top">
            <b-row>
              <b-input-group size="sm" class="mb-2">
                <b-input-group-text class="right-side-label" slot="prepend">
                  Address Type
                </b-input-group-text>
                <b-form-radio-group buttons button-variant="outline-secondary" class="ml-1" size="sm" v-model="netobj.ipaddr_type" :options="ipaddr_type_list"/>
                <b-form-radio-group v-if="netobj.ipaddr_type != 'group'" class="ml-1" buttons button-variant="outline-secondary"  size="sm" v-model="netobj.ipaddr_ver" :options="ipaddr_ver_list"/>
              </b-input-group>
            </b-row>

            <b-row >
              <b-input-group size="sm" class="mb-2" >
                <b-input-group-text class="right-side-label" slot="prepend">
                  IP Address
                </b-input-group-text>
                <b-form-input :disabled="netobj.ipaddr_type == 'group'" class="ip_addr" size="sm" type="text" v-model="netobj.ipaddr_start" required placeholder="Enter IP address"  
                :formatter="ip_formatter" />
                <b-form-input v-if="netobj.ipaddr_type === 'netmask'" class="ip_mask ml-1" size="sm" type="text" v-model="netobj.netmask" required placeholder="Netmask" />

                <b-form-input v-if="netobj.ipaddr_type === 'iprange'" class="ip_addr ml-1" size="sm" type="text" v-model="netobj.netmask" required placeholder="End IP address" />
              </b-input-group>
            </b-row>

            <b-row>
            <b-input-group size="sm" class="mb-2">
              <b-input-group-text class="right-side-label" slot="prepend">
                Subobject
              </b-input-group-text>
              <b-form-select ref="subobj" multiple :select-size="5" v-model="selected_child" :options="netobj.children"/>
              <b-col sm="2" class="align-self-center">
                <div>
                <b-button ref="add_subobj" @click="onAddSubobj" class="mb-1 subobj-btn" size="sm" variant="secondary">
                  <!-- 추가 -->
                  <font-awesome-icon  icon="plus"  size="sm" />
                  </b-button>
                </div>
                <div>
                <b-button ref="del_subobj" @click="onDelSubobj" class="my-0 subobj-btn" size="sm" variant="secondary">
                  <!-- 삭제 -->
                  <font-awesome-icon  icon="minus"  size="sm" />
                  </b-button>
                </div>
              </b-col>
            </b-input-group>
            </b-row>
          </b-col>
        </b-row>

        <!-- <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button> -->

      </b-card>
    </b-form>
  </div>
</template>

<script>
import { format_ipv4_address, } from "./nodeHelper.js";

export default {
  props: {
    netAddrObj: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean,
      default: false,
    },
    selectedItems: {
      type: Object,
      default: () => {}
    },
    subobj: [],

  },
  data() {
    return {
      netobj: {
        netobj_id: '',
        netobj_name: '',
        create_date: '',
        ipaddr_type: '',
        ipaddr_ver: '',
        ipaddr_start: '', 
        netmask: '', 
        desc: '',
        children: [],
      },
      selItems: this.selectedItems.selItems,
      showMe: false,
      title: "New Network Object",
      selected_child:[],
      ipaddr_type_list: [
        { text: 'Group', value: 'group' },
        { text: 'Netmask', value: 'netmask' },
        { text: 'IP Range', value: 'iprange' },
      ],
      ipaddr_ver_list: [
        { text: 'IPv4', value: '4' },
        { text: 'IPv6', value: '6' },
      ],
    };
  },
  mounted: function() {
    this.$nextTick(function () {
      // console.log("run updated!!!!!");
      // this.resetSelect();
    })
  },
  watch: {
    showMe() {
      if (this.showMe) {
        this.$nextTick(function() {
          // showMe myself
          if (this.netAddrObj) {
            this.title = "Edit Network Object";
            this.initNetobj(this.netAddrObj);
            this.resetSelect();
          }
          else {
            this.initNetobj(null);
          }

          this.update_subobj_btn_state();
        });
      } else {
        // hide myself
        this.initNetobj(null);
      }
    },
    show(newVal, oldVal) {
      this.showMe = this.show;
    },
    selectedItems: {
      // immediate: true, 
      deep: true,
      handler(newVal, oldVal) {
        this.update_subobj_btn_state();
      }
    },
    selected_child(newVal, oldVal) {
      this.update_subobj_btn_state();
    },
    // subobj: function() {
    //   console.log(this.subobj);
    // },
  },
  computed: {
  },
  methods: {
    initNetobj(obj) {
      if (obj) {
        // edit
        this.netobj.netobj_id = obj.netobj_id;
        this.netobj.netobj_name = obj.netobj_name;
        this.netobj.create_date = obj.create_date;
        this.netobj.ipaddr_type = obj.ipaddr_type;
        this.netobj.ipaddr_ver = obj.ipaddr_ver;
        this.netobj.ipaddr_start = obj.ipaddr_start;
        this.netobj.netmask = obj.netmask;
        this.netobj.desc = obj.desc;
        this.netobj.children = obj.children;
      }
      else {
        // new
        let id = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
        this.netobj.netobj_id = "netobj-" + id.toString();
        this.netobj.netobj_name = '';
        // this.netobj.create_date = d.toLocaleString();
        this.netobj.create_date = new Date();
        this.netobj.ipaddr_type = 'netmask'; // goup, iprange, netmask
        this.netobj.ipaddr_ver = '4'; // 4 or 6
        this.netobj.ipaddr_start = ''; 
        this.netobj.netmask = ''; 
        this.netobj.desc = ''; 
        this.netobj.children = [];
          // { value: 'netobj-1', text: 'netobj-1'},
          // { value: 'netobj-2', text: 'netobj-2'},
          // { value: 'netobj-3', text: 'netobj-3'},
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.netobj));

      this.$emit('submitNetobj', this.netobj);
    },

    resetSelect() {
      this.$emit('resetSelect');
    },

    onReset(evt) {
      evt.preventDefault();
      this.initNetobj(null);

      /* Trick to reset/clear native browser form validation state */
      this.showMe = false;
      this.$nextTick(() => {
        this.showMe = true;
      });
    },
    onAddSubobj() {
      let len = Object.keys(this.selItems).length;
      for (let i = 0; i < len; i++) {
        let name = this.selItems[i].netobj_name;

        if (this.netobj.children.indexOf(name) == -1) {
          this.netobj.children.push(name);
        }
      }

      this.resetSelect();
    },
    onDelSubobj() {
      let len = this.selected_child.length;
      for (let i = 0; i < len; i++) {
        let name = this.selected_child[i];
        let idx = this.netobj.children.indexOf(name);
        if (idx != -1) {
          this.netobj.children.splice(idx, 1);
        }
      }

      this.selected_child = [];
      this.update_subobj_btn_state();
    },
    onClose(evt) {
      this.$emit('closeNetobj');
    },
    date_format(value, event) {
      if (value) {
        return value.toLocaleString();
      }
      return '';
    },
    ip_formatter(value, event) {
      return value;
    },
    update_subobj_btn_state() {
      if (!this.showMe) {
        return
      }
      let len = Object.keys(this.selItems).length;

      this.$refs.add_subobj.disabled = len <= 0;
      this.$refs.del_subobj.disabled = this.selected_child.length <= 0;
    },

  }
};
</script>

<style>
.card-btn {
  /* width:190px; */
  /* display:flex; */
  /* flex-direction:row; */
  justify-content:space-between;
  align-items:center;
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
  vertical-align:middle;
  text-align: right;
  display:inline-block;
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
  display:inline-block;
  width: 100px;
}

.ip_addr {
  max-width: 200px;
}

.ip_mask {
  max-width: 70px;
}

.btn-sm, .btn-group-sm > .btn {
    border-radius: 0.5rem;
}

/*
.ipadd_type.btn-group-toggle.btn-group.btn-group-sm {
  background-color: red;
} 
*/

.subobj-btn {
  padding: 5px;
}

.top_btn {
  /* background-color: rgb(190, 190, 190); */
  color: rgb(80, 80, 80);
} 
</style>