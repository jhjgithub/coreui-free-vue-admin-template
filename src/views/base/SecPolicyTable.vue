 <template>
  <b-card header-tag="header">
    <h3 slot="header" class="mb-0">{{caption}}</h3>
    <b-container class="toolbar-box" fluid>
      <b-row>
        <b-col cols="2" class="search-box">
          <b-input-group size="sm">
            <b-input-group-text slot="prepend">
              <font-awesome-icon icon="search" size="sm" />
            </b-input-group-text>
            <b-form-input type="search" v-model.lazy="search_keyword"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col cols="10" class="d-flex justify-content-end toolbtn-box">
          <span>
            <b-button-group size="sm">
              <b-btn class="toolbar" ref="btn_add" @click.stop="on_new" v-b-tooltip.hover title="New item">
                <font-awesome-icon icon="plus" size="lg" />
              </b-btn>
              <b-btn class="toolbar" ref="btn_edit" @click.stop="on_edit" v-b-tooltip.hover title="Edit item">
                <font-awesome-icon icon="edit" size="lg" />
              </b-btn>
              <b-btn class="toolbar" ref="btn_clone" @click.stop="on_clone" v-b-tooltip.hover title="Clone item">
                <font-awesome-icon :icon="['far', 'clone']" size="lg" />
              </b-btn>
              <b-btn class="toolbar" ref="btn_del" @click.stop="on_delete" v-b-tooltip.hover title="Delete item">
                <font-awesome-icon :icon="['far', 'trash-alt']" size="lg" />
              </b-btn>
            </b-button-group>
          </span>
        </b-col>
      </b-row>
    </b-container>

    <b-table striped hover small fixed show-empty ref="ref_spocliy_table" :items="get_items" :fields="fields"  
    :sort-by.sync="sort_by" :sort-desc.sync="sort_desc" :sort-direction="sort_dir" 
    @sort-changed="sorting_changed" :current-page="current_page"
    :per-page="per_page" thead-class="spolicy-table-head" class="spolicy-table-area" :filter="search_keyword" :tbody-tr-class="show_row" 
    @filtered="on_filtered" :no-provider-paging=false :no-provider-filtering=true>
      <!-- Table Header -->
      <template v-for="(f, idx) in fields" :slot="'HEAD_' + f.key" slot-scope="row">
        <!-- Checkbox column -->
        <template v-if="f.key =='_selected'">
          <b-form-checkbox :key="'col_chk_' + idx" @click.native.stop v-model="select_all" 
          :indeterminate="indeterminate" @change="toggle_select_all" />
        </template>
        <template v-else-if="f.key == 'details'">
            ...
        </template>
        <template v-else>
          <font-awesome-icon :key="'col_com_' + idx" v-if="row.field.icon" :icon="row.field.icon" size="sm" />
          {{row.label}}
          <span :key="'col_sort_' + idx" v-if="get_sort_by() == row.column">
            <font-awesome-icon :icon="sort_icon" size="sm" class="sort-icon" />
          </span>
        </template>
      </template>

      <!-- Table Data -->
      <!-- Checkbox column of the rows -->
      
      <template slot="_selected" slot-scope="row">
        <b-form-checkbox @click.native.stop v-model="row.item._selected" @change="select_row(row.item)" />
      </template>

      <template slot="action" slot-scope="row">
        <!-- {{show_action(row)}} -->
        <span v-for="(item, index) in show_action(row)" :key="'act_' + index">
            <font-awesome-icon :icon="item" size="lg"/>
        </span>
      </template>

      <template slot="nics" slot-scope="row">
        <!-- {{show_nic(row)}} -->
        {{row.item.innic}}
        <span>
          <font-awesome-icon icon="caret-right" size="lg"/>
        </span>
        {{row.item.outnic}}
      </template>

      <template slot="srcnet" slot-scope="row">
        {{show_srcnet(row)}}
      </template>

      <template slot="dstnet" slot-scope="row">
        {{show_dstnet(row)}}
      </template>

      <template slot="options" slot-scope="row">
        <span v-for="(item, index) in show_options(row)" :key="'opt_' + index">
            <font-awesome-icon :key="'opt_' + index" :icon="item" size="lg"/>
        </span>
      </template>

      <!-- the rest of fields has the formatters -->


      <template slot="details" slot-scope="row">
        <font-awesome-icon style="cursor:pointer" @click.stop="row.toggleDetails" icon="info-circle" size="lg" />
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card class="details-margin">
          <b-row class="mb-2">
            <b-col sm="2" class="text-sm-right">
              <b>Desc:</b>
            </b-col>
            <b-col>{{ row.item.desc }}</b-col>
          </b-row>
          <b-row align-h="end">
            <b-col cols="1">
              <b-button size="sm" @click="row.toggleDetails">Hide</b-button>
            </b-col>
          </b-row>
        </b-card>
      </template>
     
    </b-table>

    <b-pagination align="center" size="sm" :total-rows="total_rows" :per-page="per_page" v-model="current_page" class="page-nav" />

    <b-modal title="Do you really DELETE object(s) ?" class="modal-danger" centered  v-model="show_spolicy_del_confirm" @ok="on_delete_confirmed" ok-variant="danger" :no-close-on-backdrop=false >
      <template v-for="(f, idx) in selected_item.items">
        <b-container fluid :key="idx">
        <b-row class="mb-1 text-center justify-content-md-center" :key="idx">{{f.id}} </b-row>
        </b-container>
      </template>

    </b-modal>

  </b-card>
</template>


<script>

import { spolicy_fields } from "./objfields.js";
import * as spolicy from "../../nslib/spolicy.js";
import * as spolicyset from  "../../nslib/spolicyset.js";
import "../../fa-config.js";
// import IpobjInput from "./IpobjInput";

export default {
  components: {
    // IpobjInput,
  },

  data: function () {
    return {
      caption: "Firewall Policies",
      search_keyword: "",
      sort_by: null,
      sort_desc: false,
      sort_dir: 'last',
      sort_changed: 0,

      spolicy_input_show: false,
      // ipobj_subobj_list: [],
      spolicy_act_fw: spolicy.spolicy_act_fw,

      selected_item: { items: [] },
      last_selected_item: null,
      select_all: false,
      indeterminate: false,
      sort_icon: "sort-amount-up",

      fields: spolicy_fields,
      items: [],
      spolicyset: new spolicyset.SecurityPolicySet,
      current_page: 1,
      per_page: 10,
      total_rows: 0,
      page_options: [5, 10, 15],

      show_spolicy_del_confirm: false,
      show_spolicy_del_contents: "",
      transProps: {
        name: 'flip-list'
      },
    };
  },

  watch: {
  },

  mounted: function () {
    // nsrule.init_sample_nsruleset();
    this.isbusy = true;

    var l = this.$store.state.spolicystore.elements;
    if (l && l.length > 0) {
      var l = this.$store.state.spolicystore.elements;

      this.spolicyset.set_spolicy_items(l);
      this.total_rows = this.spolicyset.spolicy_length;
      this.isbusy = false;
      this.$refs.ref_spocliy_table.refresh();
      this.update_btn_state();
      // console.log(this.spolicyset);
    }
    else {
      console.log("Refresh spolicy !");

      this.$store.dispatch('refresh_spolicy_async').then(res => {
        var l = this.$store.state.spolicystore.elements;

        this.spolicyset.set_spolicy_items(l);
        this.total_rows = this.spolicyset.spolicy_length;
        this.isbusy = false;

        this.$nextTick(function () {
          this.$refs.ref_spocliy_table.refresh();
          this.update_btn_state();
          // console.log(this.spolicyset);
        });

      });
    }
  },

  computed: {
  },

  methods: {
    update_btn_state() {
      let len = this.selected_item.items.length;

      if (this.spolicy_input_show) {
        this.$refs.btn_add.disabled = true;
        this.$refs.btn_edit.disabled = true;
        this.$refs.btn_clone.disabled = true;
        this.$refs.btn_del.disabled = true;
      }
      else if (len > 0) {
        this.$refs.btn_add.disabled = false;
        this.$refs.btn_edit.disabled = false;
        this.$refs.btn_clone.disabled = false;
        this.$refs.btn_del.disabled = false;
      }
      else {
        this.$refs.btn_add.disabled = false;
        this.$refs.btn_edit.disabled = true;
        this.$refs.btn_clone.disabled = true;
        this.$refs.btn_del.disabled = true;
      }
    },

    change_spolicy_dlg(is_show) {
      this.spolicy_input_show = is_show;
      this.update_btn_state();
    },

    on_new() {
      this.indeterminate = false;
      this.toggle_select_all(false);

      this.$root.$emit('bv::hide::tooltip');
      // this.change_spolicy_dlg(true);
      console.log("OnNew for spolicy");
    },

    on_edit() {
      console.log("OnEdit for spolicy");
      /*
      this.$root.$emit('bv::hide::tooltip');
      if (this.last_selected_item && this.last_selected_item.children.length > 0) {
        let c = this.last_selected_item.children;

        c.forEach(i => {
          let node = this.items.get_root_node(i);
          let info = {
            value: node.id,
            // text: node.name
          };

          // this.ipobj_subobj_list.push(info);
        });
      }

      this.change_spolicy_dlg(true);
      */
    },

    on_clone() {
      /*
      this.selected_item.items.forEach(item => {
        if (item._depth == 0) {
          this.items.clone_item(item);
        }
      });
      */
      console.log("OnClone for spolicy");

      this.$refs.ref_spocliy_table.refresh();
    },

    on_delete() {
      /*
      this.selected_item.items.forEach(item => {
        if (item._depth == 0) {
          this.show_spolicy_del_contents += item.id;
        }
      });
      */
      console.log("OnDelete for spolicy");

      this.show_spolicy_del_confirm = true;
    },

    on_delete_confirmed() {
      this.show_spolicy_del_confirm = false;
      this.selected_item.items.forEach(item => {
        if (item._depth == 0) {
          this.items.remove_item(item);
        }
        else {
          // subitem은 edit에서 편집해야 한다.
          // this.items.remove_child_item(item);
        }
      });

      this.$refs.ref_spocliy_table.refresh();
    },

    /*
    on_submit_ipobj_input(ipobj) {
      // utils.print_json(ipobj, "submitted ipobj:");
      this.items.apply_obj(ipobj);
      this.$refs.ref_spocliy_table.refresh();
    },

    on_close_ipobj_input() {
      //console.log("close objclass");
      // todo reset contexts in child

      this.indeterminate = false;
      this.toggle_select_all(false);
      this.change_spolicy_dlg(false);
    },

    on_reset_select() {
      this.indeterminate = false;
      this.toggle_select_all(false);
    },
    */

    get_selected_items() {
      for (var i = 0; i < this.items.length; i++) {
        item = items[i];
        if (item._selected) {
          return item;
        }
      }

      return null;
    },

    select_row(item) {
      console.log(item);
      item._selected = !item._selected;
      let idx = this.selected_item.items.indexOf(item);

      if (item._selected) {
        this.last_selected_item = item;
        if (idx == -1) {
          this.selected_item.items.push(item);
        }
      }
      else {
        let len = this.selected_item.items.length;
        if (len > 0) {
          this.last_selected_item = this.selected_item.items[len-1];
        }
        else {
          this.last_selected_item = null;
        }

        if (idx >= 0) {
          this.selected_item.items.splice(idx, 1);
        }
      }

      let selcnt = 0;
      for (var i = 0; i < this.items.length; i++) {
        if (this.items.elements[i]._selected) {
          selcnt ++;
        }
      }

      if (selcnt == 0) {
        this.select_all = false;
        this.indeterminate = false;
      }
      else if (selcnt == this.items.length) {
        this.select_all = true;
        this.indeterminate = false;
      }
      else {
        this.select_all = false;
        this.indeterminate = true;
      }

      this.update_btn_state();
    },

    toggle_select_all(checked) {
      this.select_all = checked;
      if (this.select_all) {
        for (var i = 0; i < this.items.length; i++) {
          let item = this.items.elements[i];
          item._selected = true;

          if (this.last_selected_item == null) {
            this.last_selected_item = item;
          }

          if (this.selected_item.items.indexOf(item) == -1) {
            this.selected_item.items.push(item);
          }
        }
      }
      else {
        this.last_selected_item = null;
        for (var i = 0; i < this.items.length; i++) {
          let item = this.items.elements[i];
          item._selected = false;

          let idx = this.selected_item.items.indexOf(item);
          if (idx >= 0) {
            this.selected_item.items.splice(idx, 1);
          }
        }
      }

      this.update_btn_state();
    },

    get_left_padding(item) {
      // 'padding-left': (1 + this.column.collapseIcon * this.row.countParents() * 1.5) + 'rem'
      return { 'padding-left': (item._depth * 0.8) + 'rem' };
    },

    get_expand_icon_class(item) {
      if (item.children.length == 0) {
        return "no-children";
      }

      return "have-children";
    },

    get_expand_icon(item) {
      if (item._visible_child.length > 0) {
        return "angle-down"
      }

      return "angle-right"
    },

    toggle_show_child(item) {
      // console.log(this.items);
      // console.log("clicked first_name:" + item.id);
      // toggle_child(this.items, item.obj_id);
      this.items.toggle_child(item);
      this.$refs.ref_spocliy_table.refresh();
    },

    on_filtered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.total_rows = filteredItems.length;
      this.current_page = 1;
    },

    sorting_changed(ctx) {
      // console.log("by: " + ctx.sortBy + ", Desc: " + ctx.sortDesc);      
      // ctx.sortBy   ==> Field key for sorting by (or null for no sorting)
      // ctx.sortDesc ==> true if sorting descending, false otherwise

      // console.log("%s", JSON.stringify(this.current_items, null, 2));

      if (ctx.sortBy == null) {
        this.sort_changed = 0;
        this.sort_desc = false;
        this.sort_by = null;

        this.items.sort_data(null, false);
        // sort_data(this.items, null, false);

        return
      }

      // we have 3 state of asc, desc, none
      if (ctx.sortBy == this.sort_by) {
        if (this.sort_changed == 0) {
          this.sort_desc = false;
        }
        else if (this.sort_changed == 1) {
          this.sort_desc = true;
        }
        else {
          this.sort_by = null;
          this.sort_desc = false;
        }

        this.sort_changed++;
      }
      else {
        this.sort_changed = 1;
        this.sort_desc = false;
        this.sort_by = ctx.sortBy;
      }

      if (this.sort_desc) {
        this.sort_icon = "sort-amount-down";
      }
      else {
        this.sort_icon = "sort-amount-up";
      }

      this.items.sort_data(this.sort_by, this.sort_desc);
      // sort_data(this.items, this.sort_by, this.sort_desc);
    },

    get_items(ctx, callback) {
      this.items = this.spolicyset.spolicy;
      this.total_rows = this.spolicyset.spolicy_length;
      return this.items;
    },

    get_sort_by() {
      return this.sort_by;
    },

    ////////////////
    /// formatter
    show_srcnet(row) {
      let item = row.item;
      let sp = item.srcport.toString();

      if (item.srcport == 65536) {
        sp = "Any";
      }

      // let ipaddr = this.$store.getters.get_ipobj_ip_address(item.srcnet);
      let ipaddr = item.srcnet;
      return ipaddr + ":" + sp;
    },

    show_dstnet(row) {
      let item = row.item;
      let dp = item.dstport.toString();

      if (item.dstport == 65536) {
        dp = "any";
      }

      // let ipaddr = this.$store.getters.get_ipobj_ip_address(item.dstnet);
      let ipaddr = item.dstnet;
      return ipaddr + ":" + dp;
    },

    show_nic(row) {
      if (!row) {
        return
      }

      return row.item.innic + "->" + row.item.outnic;
    },
    
    show_action(row) {
      let iname = [];
      if (row.item.actions[0] == 0) 
        iname.push("eye");
      else if (row.item.actions[0] == 1) 
        iname.push("ban");

      return iname;
      // return spolicy.spolicy_act_fw[row.item.actions[0]];
    },

    show_options(row) {
      let opt = [];
      let item = row.item;

      if (item.options[0] == spolicy.spolicy_options.log) {
        opt.push("save");
      }

      if (item.schedule) {
        opt.push("clock");
      }

      return opt;
    },

    show_row(item, type) {
      if (!item) 
        return

      if (!item.enable)
        return 'table-inactive'
    },

    /* 
    show_schedule(value, key, row) {
      if (value) {
        return "Timer";
      }
      else {
        return "N/A";
      }
    },

    show_log(value, key, row) {
      if (row.options[0] == spolicy.spolicy_options.log) {
        return "On";
      }
      else {
        return "Off";
      }
    },
    */
    
    show_datetime(value) {
      let v = Number(value);
      let d = new Date(v);
      let s = d.toLocaleString();

      return s;
    },
    ////////////////
  }
};

</script>


<style>
.card-body {
  padding: 5px;
}

.details-margin {
    margin-bottom: 0rem;
    margin-left: 20px;
}

/* for table header */
.spolicy-table-head {
  padding: 0;
  margin: 0;
  color: rgba(29, 28, 28, 0.753);
  font-size: 16px;
  font-style: normal;
  text-align: justify;
  vertical-align: middle;
}

.table-inactive td {
    /* background-color: #ececec; */
    color: #b9b9b9;
}

/* for table header text */
.table thead th {
  vertical-align: middle;
}

/* hide default sort icon */
/* 
table.b-table > thead > tr > th.sorting::before,
table.b-table > thead > tr > th.sorting::after,
table.b-table > tfoot > tr > th.sorting::before,
table.b-table > tfoot > tr > th.sorting::after { 
*/
.b-table.table > thead > tr > th[aria-sort]::after, .b-table.table > tfoot > tr > th[aria-sort]::after {
  position: absolute;
  right: 0.75em;
  display: none;
  opacity: 0.4;
  padding-bottom: inherit;
  font-size: inherit;
}

/*
table.b-table > thead > tr > th.sorting::before,
table.b-table > tfoot > tr > th.sorting::before {
    content: '\f0de'; 
    font-family: FontAwesome;
    text-align: left;
}

table.b-table > thead > tr > th.sorting::after,
table.b-table > tfoot > tr > th.sorting::after {
    content: '\f0dd';
    font-family: FontAwesome;
}

table.b-table > thead > tr > th.sorting_asc::after,
table.b-table > thead > tr > th.sorting_desc::before,
table.b-table > tfoot > tr > th.sorting_asc::after,
table.b-table > tfoot > tr > th.sorting_desc::before {
    opacity: 1;
    color: rgb(0, 162, 255);
}


.table thead th {
  vertical-align: middle;
}

.table td {
  vertical-align: middle;
  border-bottom: 1px solid #c8ced3;  
}

.custom-control {
    padding-left: 2rem;
}
*/

.have-children {
  cursor: pointer;
  color: rgb(15, 128, 235);
}

.no-children {
  color: rgb(196, 194, 194);
}

.custom-control,
.custom-checkbox,
.custom-control-inline,
.options-column {
  padding-top: 0.15em;
  /* padding-left: 2em; */
}

.toolbar-box.container-fluid {
  padding: 0 1em;
  /* padding-left: 1em; */
  /* margin: 0; */
  /* width: 100%;  */
  /* background-color: rgb(121, 240, 116);   */
}

.search-box {
  /* padding: 0; */
  /* width: 10%;  */
  padding: 5px 0px 5px 10px;
  /* background-color: brown;   */
}

.toolbtn-box {
  width: 100%;
  padding: 5px 10px 5px 0px;
  /* background-color: brown; */
  /* color: rgba(184, 34, 34, 0.753); */
  /* font-size: 10px; */
  font-style: normal;
  text-align: justify;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.spolicy-table-area {
  /* padding-bottom: 0px; */
  margin: 0;
}

.table td {
  vertical-align: middle;
}

.page-nav {
  padding: 0px;
  padding-top: 5px;
  margin: 0px;
}

.sort-icon {
  color: red;
  padding: 0;
  margin: 0;
}

table#table-transition-example .flip-list-move {
  transition: transform 1s;
}

/* 
.toolbar {
  background-color: rgb(190, 190, 190);
} 
*/

.hide_row {
  display: none;
}

</style>





