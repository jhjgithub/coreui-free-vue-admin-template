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

    <!-- Subobject List -->
    <div class="row justify-content-center align-items-center">
      <ipobj-input ref="ref_ipobj_input" style="width: 90%" :show="ipobj_input_show" 
        :selected_ipobjs="selected_item" :sub_ipobjs="subobj_list"
        :ipobj="last_selected_item" @eventSubmitIpObjInput="on_submit_ipobj_input" @eventCloseIpObjInput="on_close_ipobj_input"
        @eventResetSelect="on_reset_select" />
    </div>

    <b-table striped hover small fixed show-empty ref="ref_ipobj_table" :items="get_items" :fields="fields"  
    :sort-by.sync="sort_by" :sort-desc.sync="sort_desc" :sort-direction="sort_dir" 
    @sort-changed="sorting_changed" :current-page="current_page"
    :per-page="per_page" thead-class="table-head" class="table-area" :filter="search_keyword" 
    @filtered="on_filtered" :no-provider-paging=false :no-provider-filtering=true :busy=isbusy 
    >
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle" />
        <strong>Loading...</strong>
      </div>

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

      <template slot="id" slot-scope="row">
        <div :style="get_left_padding(row.item)">
          <span>
            <font-awesome-icon :class="get_expand_icon_class(row.item)" @click.stop="toggle_show_child(row.item)" :icon="get_expand_icon(row.item)" size="lg" />
          </span>
          <span> {{row.item.id}} </span>
        </div>
      </template>

      <template slot="type" slot-scope="row">
        {{iptype_list[row.item.type].text}}
      </template>

      <template slot="ipaddr_ver" slot-scope="row">
        {{ipver_list[row.item.ipaddr_ver].text}}
      </template>

      <template slot="details" slot-scope="row">
        <font-awesome-icon style="cursor:pointer" @click.stop="row.toggleDetails" icon="info-circle" size="lg" />
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
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

    <b-modal title="Do you really DELETE object(s) ?" class="modal-danger" centered  v-model="show_ipobjdel_confirm" @ok="on_delete_confirmed" ok-variant="danger" :no-close-on-backdrop=false >
      <template v-for="(f, idx) in selected_item.items">
        <b-container fluid :key="idx">
        <b-row class="mb-1 text-center justify-content-md-center" :key="idx">{{f.id}} </b-row>
        </b-container>
      </template>

    </b-modal>

  </b-card>
</template>


<script>
import { mapGetters } from 'vuex'

import * as ipobj from "../../nslib/ipobj";
import * as ipobjview from "../../nslib/ipobjView";
import * as objset from  "../../nslib/objset";
import * as misc from "../../nslib/misc.js";
import { ipobj_fields } from "./objfields.js";

import restHelper from "../../api/restHelper";

import "../../fa-config.js";
import IpobjInput from "./IpobjInput";

export default {
  components: {
    IpobjInput,
  },

  data: function () {
    return {
      caption: "Network Objects",
      search_keyword: "",
      sort_by: null,
      sort_desc: false,
      sort_dir: 'last',
      sort_changed: 0,

      ipobj_input_show: false,
      subobj_list: [],

      iptype_list: ipobj.iptype_list,
      ipver_list: ipobj.ipver_list,

      selected_item: { items: [] },
      last_selected_item: null,
      select_all: false,
      indeterminate: false,
      sort_icon: "sort-amount-up",

      fields: ipobj_fields,
      ipobjset: new objset.objset(),
      // items: [],
      isbusy: false,
      current_page: 2,
      per_page: 10,
      total_rows: 0,
      page_options: [5, 10, 15],

      show_ipobjdel_confirm: false,
      show_ipobjdel_contents: "",
      transProps: {
        name: 'flip-list'
      },
    };
  },

  watch: {
  },

  mounted: function () {
    this.isbusy = true;

    var l = this.$store.state.ipobjstore.elements;
    if (l && l.length > 0) {
      var l = this.$store.state.ipobjstore.elements;

      this.ipobjset.set_items(l);
      this.total_rows = this.ipobjset.length;
      this.isbusy = false;
      this.$refs.ref_ipobj_table.refresh();
      this.update_btn_state();
    }
    else {
      console.log("Refresh ipobj at IpobjTable !");

      this.$store.dispatch('refresh_ipobj_async').then(res => {
        var l = this.$store.state.ipobjstore.elements;

        this.ipobjset.set_items(l);
        this.total_rows = this.ipobjset.length;
        this.isbusy = false;

        this.$nextTick(function () {
          this.$refs.ref_ipobj_table.refresh();
          this.update_btn_state();
        });

      });
    }

  },

  computed: {
    ...mapGetters([
      'get_ipobj'
    ]),
  },

  methods: {
    get_items(ctx, callback) {
      this.total_rows = this.ipobjset.length;
      return this.ipobjset.elements;
    },

    get_sort_by() {
      return this.sort_by;
    },

    update_btn_state() {
      let len = this.selected_item.items.length;

      if (this.ipobj_input_show) {
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

    change_ipobj_dlg(is_show) {
      this.ipobj_input_show = is_show;
      this.update_btn_state();
    },

    on_new() {
      this.indeterminate = false;
      this.toggle_select_all(false);

      this.$root.$emit('bv::hide::tooltip');
      this.change_ipobj_dlg(true);
    },

    on_edit() {
      this.$root.$emit('bv::hide::tooltip');
      if (this.last_selected_item && this.last_selected_item.children.length > 0) {
        let c = this.last_selected_item.children;
        this.subobj_list = [];
        c.forEach(i => {
          let node = this.ipobjset.get_root_node(i);
          let info = {
            value: node.id,
            // text: node.name
          };

          this.subobj_list.push(info);
        });
      }

      this.change_ipobj_dlg(true);
    },

    on_clone() {
      this.selected_item.items.forEach(item => {
        if (item._depth == 0) {
          this.ipobjset.clone_item(item);
        }
      });

      this.$refs.ref_ipobj_table.refresh();
    },

    on_delete() {
      this.selected_item.items.forEach(item => {
        if (item._depth == 0) {
          this.show_ipobjdel_contents += item.id;
        }
      });

      this.show_ipobjdel_confirm = true;
    },

    on_delete_confirmed() {
      this.show_ipobjdel_confirm = false;
      this.selected_item.items.forEach(item => {
        if (item._depth == 0) {
          this.ipobjset.remove_item(item);
        }
        else {
          // subitem은 edit에서 편집해야 한다.
          // this.ipobjset.remove_child_item(item);
        }
      });

      this.$refs.ref_ipobj_table.refresh();
    },

    on_submit_ipobj_input(new_ipobj) {
      misc.print_json(ipobj, "submitted ipobj:");
      this.ipobjset.apply_obj(new_ipobj);
      this.$refs.ref_ipobj_table.refresh();
    },

    on_close_ipobj_input() {
      //console.log("close ipobj");
      // todo reset contexts in child

      this.indeterminate = false;
      this.toggle_select_all(false);
      this.change_ipobj_dlg(false);
    },
    on_reset_select() {
      this.indeterminate = false;
      this.toggle_select_all(false);
    },

    get_selected_items() {
      /*
      let items = this.ipobjset.elements;

      for (var i = 0; i < this.ipobjset.length; i++) {
        item = items[i];
        if (item._selected) {
          return item;
        }
      }
      */

      return null;
    },

    select_row(item) {
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
      for (var i = 0; i < this.ipobjset.length; i++) {
        if (this.ipobjset.elements[i]._selected) {
          selcnt ++;
        }
      }

      if (selcnt == 0) {
        this.select_all = false;
        this.indeterminate = false;
      }
      else if (selcnt == this.ipobjset.length) {
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
        for (var i = 0; i < this.ipobjset.length; i++) {
          let item = this.ipobjset.elements[i];
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
        for (var i = 0; i < this.ipobjset.length; i++) {
          let item = this.ipobjset.elements[i];
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
      // console.log(this.ipobjset);
      // console.log("clicked first_name:" + item.id);
      // toggle_child(this.ipobjset, item.obj_id);
      this.ipobjset.toggle_child(item);
      this.$refs.ref_ipobj_table.refresh();
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

        this.ipobjset.sort_data(null, false);
        // sort_data(this.ipobjset, null, false);

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

      this.ipobjset.sort_data(this.sort_by, this.sort_desc);
      // sort_data(this.ipobjset, this.sort_by, this.sort_desc);
    },

    show_datetime(value) {
      let v = Number(value);
      let d = new Date(v);
      let s = d.toLocaleString();

      return s;
    },
  }
};

</script>


<style>
.card-body {
  padding: 5px;
}

/* for table header */
.table-head {
  padding: 0;
  margin: 0;
  color: rgba(29, 28, 28, 0.753);
  font-size: 16px;
  font-style: normal;
  text-align: justify;
  vertical-align: middle;
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

.table-area {
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





