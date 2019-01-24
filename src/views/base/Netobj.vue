<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-card header-tag="header" border-variant="light">
        <template slot="header">
          <b-row>
            <b-col class="card-header-text align-self-center">
              <h5 slot="header" class="my-0">{{title}}</h5>
            </b-col>
            <b-col class="text-right mx-0">
              <b-button class="mr-1" size="sm" type="submit" variant="primary">추가</b-button>
              <b-button class="mr-1" size="sm" type="reset" variant="danger">Reset</b-button>
              <b-button class="mr-3" size="sm" variant="secondary" @click="onClose">Close</b-button>
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

                <!-- <b-form-group horizontal label-size="sm"  :label-cols="2" label-text-align="right" id="netobj_id" label="ID:" label-for="netobj_id" >
                  <b-form-input id="netobj_id" size="sm" type="text" v-model="form.id" required placeholder="Enter Network object ID" />
                </b-form-group>

            <b-form-group
              horizontal label-size="sm" class="mr-0" :label-cols="2" label-text-align="right" id="netobj_name" label="Name:" label-for="netobj_name" >
              <b-form-input id="netobj_name" size="sm" type="text" v-model="form.name" required placeholder="Enter Network object name" />
            </b-form-group> -->
          </b-col>

          <b-col sm="7" class="align-self-top">
            <b-row>
            <b-input-group size="sm" class="mb-2">
              <b-input-group-text class="right-side-label" slot="prepend">
                Address Type
              </b-input-group-text>
              <b-form-radio-group buttons button-variant="outline-primary"  size="sm" v-model="netobj.network_type" :options="network_type_list"/>
            </b-input-group>

              <!-- <b-col sm="2" class="align-self-center text-right col-form-label col-form-label-sm">
                  <label class="col-form-label-sm ">Type:</label>
              </b-col>
              <b-col sm="8">
              <b-form-radio-group id="radios1" buttons button-variant="outline-primary"  size="sm" v-model="form.network_type" :network_type_list="form.network_type_list" name="radioOpenions"/>
              </b-col> -->
            </b-row>

            <b-row v-if="netobj.network_type === 'netmask'">
              <b-input-group size="sm" class="mb-2" >
                <b-input-group-text class="right-side-label" slot="prepend">
                  IP Address
                </b-input-group-text>
                <b-form-input size="sm" type="text" v-model="netobj.network_start" required placeholder="Enter Network object ID"  :formatter="ip_formatter" />
                <b-col sm="2">
                  <b-form-input size="sm" type="text" v-model="netobj.netmask" required placeholder="Mask" />
                </b-col>
              </b-input-group>

              <!-- <b-col sm="2" class="align-self-center text-right">
                  <label class="col-form-label-sm">IP Address:</label>
              </b-col>

              <b-col sm="5">
              <b-form-input id="netobj_name" size="sm" type="text" v-model="form.name" required placeholder="IP Address" />
              </b-col>

              <b-col sm="2">
              <b-form-input id="netobj_name" size="sm" type="text" v-model="form.name" required placeholder="Mask" />
              </b-col> -->
            </b-row>

            <b-row v-if="netobj.network_type === 'iprange'">
              <b-input-group size="sm" class="mb-2">
                <b-input-group-text class="right-side-label" slot="prepend">
                  Start IP Address
                </b-input-group-text>
                <b-form-input size="sm" type="text" v-model="netobj.network_start" required placeholder="Enter Start IP Address" />
              </b-input-group>
              <b-input-group size="sm" class="mb-2">
                <b-input-group-text class="right-side-label" slot="prepend">
                  End IP Address
                </b-input-group-text>
                <b-form-input size="sm" type="text" v-model="netobj.network_end" required placeholder="Enter End IP Address" />
              </b-input-group>

              <!-- <b-col cols="2" class="align-self-center text-right">
                <label class="col-form-label-sm">IP Address:</label>
              </b-col>

              <b-col cols="8">
              <b-form-input id="netobj_name" size="sm" type="text" v-model="form.name" required placeholder="Mask" />
              </b-col>
            </b-row>

            <b-row v-if="form.network_type === 'range'">
              <b-col cols="2" class="align-self-center text-right">
                <label class="col-form-label-sm">IP Address:</label>
              </b-col>

              <b-col cols="8">
              <b-form-input id="netobj_name" size="sm" type="text" v-model="form.name" required placeholder="Mask" />
              </b-col> -->
            </b-row>

            <b-row>
            <b-input-group size="sm" class="mb-2">
              <b-input-group-text class="right-side-label" slot="prepend">
                Subobject
              </b-input-group-text>
              <b-form-select multiple :select-size="5" v-model="selected_child" :options="netobj.children">
              </b-form-select>
              <b-col sm="2" class="align-self-center">
                <div>
                <b-button class="my-1 subobj-btn" size="sm" variant="secondary">추가</b-button>
                </div>
                <div>
                <b-button class="my-1 subobj-btn" size="sm" variant="secondary">삭제</b-button>
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
    props_netobj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      netobj: {
        netobj_id: '',
        netobj_name: '',
        create_date: '',
        network_type: '',
        network_start: '', 
        network_end: '', 
        netmask: '', 
        desc: '',
        children: [],
      },
      show: false,
      title: "New Network Object",
      selected_child:[],
      network_type_list: [
        { text: 'Net Mask', value: 'netmask' },
        { text: 'IP Range', value: 'iprange' },
      ],
    };
  },
  mounted: function() {
  },
  watch: {
    show: function () {
      if (this.show) {
        this.$nextTick(function() {
          // show myself
          if (this.props_netobj) {
            this.title = "Edit Network Object";
            this.initNetobj(this.props_netobj);
          }
          else {
            this.initNetobj(null);
          }
        });
      } else {
        // hide myself
        this.initNetobj(null);
      }
    }
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
        this.netobj.network_type = obj.network_type;
        this.netobj.network_start = obj.network_start;
        this.netobj.network_end = obj.network_end;
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
        this.netobj.network_type = 'netmask'; // range, netmask
        this.netobj.network_start = ''; 
        this.netobj.network_end = ''; 
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

    onReset(evt) {
      evt.preventDefault();
      this.initNetobj(null);

      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
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
    ip_formatter(vlaue, event) {
      return format_ipv4_address(vlaue);
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

.subobj-btn {
  padding: 2px;
  /* height: 30px; */
}
</style>