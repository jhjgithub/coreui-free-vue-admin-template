 <template>

  <b-card header-tag="header">
    <h3 slot="header" class="mb-0">{{caption}}</h3>

    <b-container class="toolbar-box" fluid>      
      <b-row>
        <b-col cols="2" class="search-box">
          <b-input-group size="sm">
            <b-input-group-text slot="prepend">
              <font-awesome-icon  icon="search"  size="sm" />
            </b-input-group-text>
            <b-form-input type="search" v-model.lazy="search_keyword"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col cols="10"  class="d-flex justify-content-end toolbtn-box">
          <span>
              <b-button-group size="sm">
                <b-btn class="toolbar" ref="btn_add"  @click.stop="on_new" v-b-tooltip.hover title="New item" >
                  <font-awesome-icon  icon="plus"  size="lg" />
                </b-btn>
                <b-btn class="toolbar" ref="btn_edit" @click.stop="on_edit" v-b-tooltip.hover title="Edit item">
                  <font-awesome-icon  icon="edit"  size="lg" />
                  </b-btn>
                <b-btn class="toolbar" ref="btn_clone"  @click.stop="on_clone" v-b-tooltip.hover title="Clone item">
                  <font-awesome-icon :icon="['far', 'clone']"  size="lg" />
                  </b-btn>              
                <b-btn class="toolbar" ref="btn_del"  @click.stop="on_delete" v-b-tooltip.hover title="Delete item">
                  <font-awesome-icon :icon="['far', 'trash-alt']"  size="lg" />
                  </b-btn>              
              </b-button-group>
          </span>
        </b-col>
      </b-row>
    </b-container>

    <!-- Subobject List -->
    <div class="row justify-content-center align-items-center">
      <!-- <net-ip-obj-input style="width: 600px" ref="net_ip_obj"/> -->
      <net-ip-obj-input 
      ref="ref_netipobj_input" 
      style="width: 90%" 
      :show="show_netipobj_input" 
      :selected_items="selected_items"
      :netipobj="last_selected_item" 
      @eventSubmitNetIpObjInput="on_submit_netipobj_input" 
      @eventCloseNetIpObjInput="on_close_netipobj_input" 
      @eventResetSelect="on_reset_select"/>
    </div>

    <b-table striped hover small fixed show-empty 
      ref="net_ip_obj_table"
      :items="get_items" 
      :fields="fields" 
      :sort-by.sync="sort_by"
      :sort-desc.sync="sort_desc"      
      :sort-direction="sort_dir"
      @sort-changed="sorting_changed"
      :current-page="current_page"
      :per-page="per_page"
      thead-class="table-text"
      class="table-area" 
      :filter="search_keyword"
      @filtered="on_filtered"
      :no-provider-paging=true
      :no-provider-filtering=true
      >
      <!-- :no-local-sorting=true -->
      <!-- :tbody-tr-class="row_class" -->
      
      <!-- Checkbox column of the Table Header -->
      <template slot="HEAD__selected" slot-scope="row">
        <b-form-checkbox 
          @click.native.stop
          v-model="select_all"
          :indeterminate="indeterminate"
          @change="toggle_select_all"                  
        />
      </template>
      <template slot="HEAD_obj_id" slot-scope="row">
        <font-awesome-icon v-if="row.field.icon" :icon="row.field.icon"  size="sm"  />
          {{row.label}} 
        <span v-if="get_sort_by() == row.column">
          <font-awesome-icon :icon="sort_icon" size="sm" class="sort-icon"/>
        </span>
      </template>

      <template slot="HEAD_obj_name" slot-scope="row">
        <font-awesome-icon v-if="row.field.icon" :icon="row.field.icon"  size="sm"  />
          {{row.label}} 
        <span v-if="get_sort_by() == row.column">
          <font-awesome-icon :icon="sort_icon" size="sm" class="sort-icon"/>
        </span>
      </template>

      <template slot="HEAD_network_type" slot-scope="row">
        <font-awesome-icon v-if="row.field.icon" :icon="row.field.icon"  size="sm"  />
          {{row.label}} 
        <span v-if="get_sort_by() == row.column">
          <font-awesome-icon :icon="sort_icon" size="sm" class="sort-icon"/>
        </span>
      </template>

      <template slot="HEAD_network_start" slot-scope="row">
        <font-awesome-icon v-if="row.field.icon" :icon="row.field.icon"  size="sm"  />
          {{row.label}} 
        <span v-if="get_sort_by() == row.column">
          <font-awesome-icon :icon="sort_icon" size="sm" class="sort-icon"/>
        </span>
      </template>

      <template slot="HEAD_network_end" slot-scope="row">
        <font-awesome-icon v-if="row.field.icon" :icon="row.field.icon"  size="sm"  />
          {{row.label}} 
        <span v-if="get_sort_by() == row.column">
          <font-awesome-icon :icon="sort_icon" size="sm" class="sort-icon"/>
        </span>
      </template>

      <template slot="HEAD_netmask" slot-scope="row">
        <font-awesome-icon v-if="row.field.icon" :icon="row.field.icon"  size="sm"  />
          {{row.label}} 
        <span v-if="get_sort_by() == row.column">
          <font-awesome-icon :icon="sort_icon" size="sm" class="sort-icon"/>
        </span>
      </template>

      <template slot="HEAD_create_date" slot-scope="row">
        <font-awesome-icon v-if="row.field.icon" :icon="row.field.icon"  size="sm"  />
          {{row.label}} 
        <span v-if="get_sort_by() == row.column">
          <font-awesome-icon :icon="sort_icon" size="sm" class="sort-icon"/>
        </span>
      </template>

      <template slot="HEAD_details" slot-scope="row">
        ...
      </template>

      <!-- Checkbox column of the rows -->
      <template slot="_selected" slot-scope="row">
        <b-form-checkbox @click.native.stop v-model="row.item._selected" @change="select_row(row.item)" />
      </template>

      <!-- <template slot="obj_id" slot-scope="row" :tbody-tr-class="hide-col"> -->
      <template slot="obj_id" slot-scope="row">
        <div :style="get_left_padding(row.item)">
          <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
          <!-- <span style="width: 20px"> -->
          <span>
            <font-awesome-icon 
            :class="get_expand_icon_class(row.item)"
            @click.stop="toggle_show_child(row.item)" 
            :icon="get_expand_icon(row.item)"
            size="lg" />
          </span>
          <span>
            {{row.item.obj_id}}        
          </span>
        </div>
      </template>

      <template slot="details" slot-scope="row">
        <font-awesome-icon style="cursor:pointer" @click.stop="row.toggleDetails" icon="info-circle"  size="lg" />
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

    <b-pagination 
    align="center" 
    size="sm" 
    :total-rows="total_rows" 
    :per-page="per_page" 
    v-model="current_page" 
    class="page-nav" 
    />
  
  </b-card>

</template>


<script>
// import Vue from "vue";
// import BInputGroup from "bootstrap-vue/es/components/input-group/input-group";

import { normalize_items, toggle_child, sort_data, empty_array, print_json } from "./nodeHelper.js";
import { netobj_fields, netobj_data, } from "./netobj_data_bstreetable.js";

import "../../fa-config.js";
import NetIpObjInput from "./NetIpObjInput";

export default {
  components: {
    NetIpObjInput,
    // NetObj1,
    // BInputGroup
  },

  data: function() {
    return {
      caption: "Network Objects",
      search_keyword: "",
      sort_by: null,
      sort_desc: false,
      sort_dir: 'last',
      sort_changed: 0,

      show_netipobj_input: false,

      selected_items: { sel_items:[]},
      last_selected_item:null,
      select_all: false,
      indeterminate: false,
      sort_icon: "sort-up",

      fields: netobj_fields,
      items: netobj_data,
      current_page: 2,
      per_page: 3,
      total_rows: 0,      
      page_options: [ 5, 10, 15 ],
    };
  },

  watch: {
  },

  mounted: function() {
    // console.log(d);
    this.total_rows = this.items.length;
    normalize_items(this.items);
    this.update_btn_state();
  },
  computed: {
  },
  methods: {
    get_sort_by() {
      return this.sort_by;
    },

    update_btn_state() {
      let len = this.selected_items.sel_items.length;

      if (this.show_netipobj_input) {
        this.$refs.btn_add.disabled = true;
        this.$refs.btn_edit.disabled = true;
        this.$refs.btn_clone.disabled = true;
        this.$refs.btn_del.disabled = true;
      }
      else if (this.last_selected_item) {
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

    change_netobj_box(is_show) {
      this.show_netipobj_input = is_show;
      this.update_btn_state();
    },

    on_new() {
      this.indeterminate = false;
      this.toggle_select_all(false);

      this.$root.$emit('bv::hide::tooltip');
      this.change_netobj_box(true);
    },

    on_edit() {
      console.log("click edit");

      this.$root.$emit('bv::hide::tooltip');
      this.change_netobj_box(true);
    },

    on_clone() {
      console.log("click clone");
    },
    on_delete() {
      console.log("click delete");
    },
    on_submit_netipobj_input(obj) {
      console.log("submit netobj: %s", JSON.stringify(obj));
    },
    on_close_netipobj_input() {
      //console.log("close netobj");
      // todo reset contexts in child

      this.indeterminate = false;
      this.toggle_select_all(false);
      this.change_netobj_box(false);
    },
    on_reset_select() {
      this.indeterminate = false;
      this.toggle_select_all(false);
    },

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
      item._selected = !item._selected;

      if (item._selected) {
        this.last_selected_item = item;
        var all = true;
        for (var i = 0; i < this.items.length; i++) {
          if (!this.items[i]._selected)
            all = false;
        }

        if (all) {
          this.select_all = true;
          this.indeterminate = false;                    
        }
        else {
          this.select_all = false;
          this.indeterminate = true;
        }

        if (this.selected_items.sel_items.indexOf(item) == -1) {
          this.selected_items.sel_items.push(item);
        }
      } 
      else {
        this.last_selected_item = null;

        // change color to show status
        // item._rowVariant = "default";
        var all = false;
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i]._selected)
            all = true;
        }

        if (!all) {
          this.select_all = false;
          this.indeterminate = false;
        }
        else {
          this.select_all = false;
          this.indeterminate = true;
        }

        let idx = this.selected_items.sel_items.indexOf(item);
        if (idx >= 0) {
          this.selected_items.sel_items.splice(idx, 1);
        }
      }

      this.update_btn_state();
      // console.log(this.selected_items);
    },

    toggle_select_all(checked) {
      this.select_all = checked;
      if (this.select_all) {
        for (var i = 0; i < this.items.length; i++) {
          let item = this.items[i];
          item._selected = true;

          if (this.last_selected_item == null) {
            this.last_selected_item = item;
          }

          if (this.selected_items.sel_items.indexOf(item) == -1) {
            this.selected_items.sel_items.push(item);
          }
        }
      } 
      else {
        this.last_selected_item = null;
        for (var i = 0; i < this.items.length; i++) {
          let item = this.items[i];
          item._selected = false;

          let idx = this.selected_items.sel_items.indexOf(item);
          if (idx >= 0) {
            this.selected_items.sel_items.splice(idx, 1);
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
      if (item._visible_child === 'none') {
        return "no-children";        
      }
      
      return "have-children";   
    },
 
    get_expand_icon(item) {
      if (item._visible_child === 'show') {
        return "angle-down"
      }

      return "angle-right"
    },

    toggle_show_child(item) {
      // console.log("clicked first_name:" + item.obj_id);
      toggle_child(this.items, item.obj_id);
      this.$refs.net_ip_obj_table.refresh();
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

        sort_data(this.items, null, false);

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

        this.sort_changed ++;
      }
      else {
        this.sort_changed = 1;
        this.sort_desc = false;
        this.sort_by = ctx.sortBy;
      }

      if (this.sort_desc)
        this.sort_icon = "sort-amount-down";
      else
        this.sort_icon = "sort-amount-up";        

      sort_data(this.items, this.sort_by, this.sort_desc);
    },

    get_items(ctx, callback) {
      this.total_rows = this.items.length;
      return this.items;
    },
  }
};

</script>


<style>
.card-body {
  padding: 5px;
}

/* for table header */
.table-text {
  padding: 0;
  margin: 0;
  color: rgba(29, 28, 28, 0.753);
  font-size: 16px;
  font-style: normal;
  text-align: justify; 
  vertical-align:middle;
}

/* for table header text */
.table thead th {
  vertical-align: middle;
}

/* hide default sort icon */
table.b-table > thead > tr > th.sorting::before,
table.b-table > thead > tr > th.sorting::after,
table.b-table > tfoot > tr > th.sorting::before,
table.b-table > tfoot > tr > th.sorting::after {
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
  cursor:pointer; 
  color: rgb(15, 128, 235);
}

.no-children {
  color: rgb(196, 194, 194);
}


.custom-control, .custom-checkbox, .custom-control-inline, .options-column {
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
  vertical-align:middle;
  text-align: center;
}

.table-area {
  /* padding-bottom: 0px; */
  margin: 0;
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

/* 
.toolbar {
  background-color: rgb(190, 190, 190);
} 
*/

</style>





