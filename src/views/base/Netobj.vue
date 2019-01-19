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
              <b-button class="mr-3" size="sm" type="reset" variant="secondary">Close</b-button>
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
              <b-form-input disabled size="sm" type="text" v-model="form.create_date" required placeholder="Date and time" />
            </b-input-group>
            <b-input-group size="sm" class="mb-2 ">
              <b-input-group-text class="left-side-label" slot="prepend">
                ID
              </b-input-group-text>
              <b-form-input disabled size="sm" type="text" v-model="form.netobj_id" required placeholder="Enter Network object ID" />
            </b-input-group>
            <b-input-group size="sm" class="mb-2" >
              <b-input-group-text class="left-side-label" slot="prepend">
                Name
              </b-input-group-text>
              <b-form-input size="sm" type="text" v-model="form.netobj_name" required placeholder="Enter Network object Name" />
            </b-input-group>
            <b-input-group size="sm" >
              <b-input-group-text class="left-side-label" slot="prepend">
                Description
              </b-input-group-text>
              <b-form-textarea no-resize v-model="form.desc" placeholder="Enter descirption" :rows="3" :max-rows="3"/>
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
              <b-form-radio-group buttons button-variant="outline-primary"  size="sm" v-model="form.network_type" :options="form.network_type_list"/>
            </b-input-group>

              <!-- <b-col sm="2" class="align-self-center text-right col-form-label col-form-label-sm">
                  <label class="col-form-label-sm ">Type:</label>
              </b-col>
              <b-col sm="8">
              <b-form-radio-group id="radios1" buttons button-variant="outline-primary"  size="sm" v-model="form.network_type" :network_type_list="form.network_type_list" name="radioOpenions"/>
              </b-col> -->
            </b-row>

            <b-row v-if="form.network_type === 'netmask'">
              <b-input-group size="sm" class="mb-2" >
                <b-input-group-text class="right-side-label" slot="prepend">
                  IP Address
                </b-input-group-text>
                <b-form-input size="sm" type="text" v-model="form.network_start" required placeholder="Enter Network object ID" />
                <b-col sm="2">
                  <b-form-input size="sm" type="text" v-model="form.netmask" required placeholder="Mask" />
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

            <b-row v-if="form.network_type === 'iprange'">
              <b-input-group size="sm" class="mb-2">
                <b-input-group-text class="right-side-label" slot="prepend">
                  Start IP Address
                </b-input-group-text>
                <b-form-input size="sm" type="text" v-model="form.network_start" required placeholder="Enter Start IP Address" />
              </b-input-group>
              <b-input-group size="sm" class="mb-2">
                <b-input-group-text class="right-side-label" slot="prepend">
                  End IP Address
                </b-input-group-text>
                <b-form-input size="sm" type="text" v-model="form.network_end" required placeholder="Enter End IP Address" />
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
              <b-form-select multiple :select-size="5" v-model="form.selected_child" :options="form.children">
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
export default {
  props: {
    title: String,
    cellData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        netobj_id: 'netobj-6',
        netobj_name: 'WebServer6',
        create_date: '2018-12-31T14:10:10',
        network_type: 'netmask', // range, netmask
        network_start: '', 
        network_end: '', 
        netmask: '', 
        network_type_list: [
          { text: 'Net Mask', value: 'netmask' },
          { text: 'IP Range', value: 'iprange' },
        ],
        selected_child:[],
        children: [
          { value: 'netobj-1', text: 'netobj-1'},
          { value: 'netobj-2', text: 'netobj-2'},
          { value: 'netobj-3', text: 'netobj-3'},
        ]
      },
      show: true,
    };
  },
  computed: {
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
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