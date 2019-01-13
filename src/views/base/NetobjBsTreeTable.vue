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
                <b-btn @click.stop="onNew" v-b-tooltip.hover title="New item">
                  <font-awesome-icon  icon="plus"  size="lg" />
                </b-btn>
                <b-btn @click.stop="onEdit" v-b-tooltip.hover title="Edit item">
                  <font-awesome-icon  icon="edit"  size="lg" />
                  </b-btn>
                <b-btn @click.stop="onClone" v-b-tooltip.hover title="Clone item">
                  <font-awesome-icon :icon="['far', 'clone']"  size="lg" />
                  </b-btn>              
                <b-btn @click.stop="onDelete" v-b-tooltip.hover title="Delete item">
                  <font-awesome-icon :icon="['far', 'trash-alt']"  size="lg" />
                  </b-btn>              
              </b-button-group>
          </span>
        </b-col>
      </b-row>
    </b-container>

    <b-table striped hover small fixed show-empty 
      ref="netobj_table"
      :items="getItems" 
      :fields="fields" 
      :sort-by.sync="sort_by"
      :sort-desc.sync="sort_desc"      
      :sort-direction="sort_dir"
      @sort-changed="sortingChanged"
      :current-page="currentPage"
      :per-page="perPage"
      thead-class="table-text"
      class="table-area" 
      :filter="search_keyword"
      @filtered="onFiltered"
      :no-provider-paging=true
      :no-provider-filtering=true
      >
      <!-- :no-local-sorting=true -->
      <!-- :tbody-tr-class="rowClass" -->
      
      <!-- Checkbox column of the Table Header -->
      <template slot="HEAD__selected" slot-scope="row">
        <b-form-checkbox 
          @click.native.stop
          v-model="selectAll"
          :indeterminate="indeterminate"
          @change="toggleSelectAll"                  
        />
      </template>
      <template slot="HEAD_netobj_id" slot-scope="row">
        <font-awesome-icon v-if="row.field.icon" :icon="row.field.icon"  size="sm"  />
          {{row.label}} 
        <span v-if="get_sort_by() == row.column">
          <font-awesome-icon :icon="sort_icon" size="sm" class="sort-icon"/>
        </span>
      </template>

      <template slot="HEAD_netobj_name" slot-scope="row">
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
        <b-form-checkbox @click.native.stop v-model="row.item._selected" @change="selectRow(row.item)" />
      </template>

      <!-- <template slot="netobj_id" slot-scope="row" :tbody-tr-class="hide-col"> -->
      <template slot="netobj_id" slot-scope="row">
        <div :style="get_left_padding(row.item)">
          <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
          <span>
            <font-awesome-icon 
            :class="get_expand_icon_class(row.item)"
            @click.stop="toggleShowChild(row.item)" 
            :icon="get_expand_icon(row.item)"
            size="lg" />
          </span>
          <span>
            {{row.item.netobj_id}}        
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
    :total-rows="totalRows" 
    :per-page="perPage" 
    v-model="currentPage" 
    class="page-nav" 
    />
  
  </b-card>

</template>


<script>
// import Vue from "vue";
// import BInputGroup from "bootstrap-vue/es/components/input-group/input-group";

import { normalize_items, toggle_child, sort_data, empty_array, print_json, deep_copy } from "./nodeHelper.js";
import { netobj_fields, netobj_data, } from "./netobj_data_bstreetable.js";

import "../../fa-config.js";

export default {
  components: {
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

      selectedItems: [],
      selectAll: false,
      indeterminate: false,
      sort_icon: "sort-up",

      fields: netobj_fields,
      items: netobj_data,
      org_items: [],
      currentPage: 2,
      perPage: 3,
      totalRows: 0,      
      pageOptions: [ 5, 10, 15 ],
    };
  },

  watch: {
  },

  mounted: function() {
    // console.log(d);
    this.totalRows = this.items.length;
    normalize_items(this.items);
    print_json(this.items);
  },
  computed: {

  },
  methods: {
    ready: function() {
      // this.$refs.NetobjGrid.expandRow(2);
    },

    /*
    calc_depth() {
      var depth = 0;
      function recursive_get_items(cur_items, depth) {

        for (var i = 0, item; (item = cur_items[i]); i++) {
          // console.log(item);
          item.depth = depth;
          item._visible_child = 'none';

          if (item.children && item.children.length > 0) {
            item._visible_child = 'hide';
            recursive_get_items(item.children, depth + 1);
          }
        }
      }

      recursive_get_items(this.items, depth);
    },
    */
    
    get_sort_by() {
      // console.log("get sort by: " + this.sort_by);
      return this.sort_by;
    },

    onNew() {
      console.log("click edit");
    },
    onEdit() {
      console.log("click edit");
    },
    onClone() {
      console.log("click edit");
    },
    onDelete() {
      console.log("click edit");
    },

    selectRow(item) {
      item._selected = !item._selected;
      if (item._selected) {
        var all = true;
        for (var i = 0; i < this.items.length; i++) {
          if (!this.items[i]._selected)
            all = false;
        }

        if (all) {
          this.selectAll = true;
          this.indeterminate = false;                    
        }
        else {
          this.selectAll = false;
          this.indeterminate = true;
        }
      } else {
        // change color to show status
        // item._rowVariant = "default";
        var all = false;
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i]._selected)
            all = true;
        }

        if (!all) {
          this.selectAll = false;
          this.indeterminate = false;
        }
        else {
          this.selectAll = false;
          this.indeterminate = true;
        }
      }
    },

    toggleSelectAll(checked) {
      this.selectAll = checked;
      if (this.selectAll) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i]._selected = true;
          // this.items[i]._rowVariant = "info";
        }
      } 
      else {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i]._selected = false;
          // this.items[i]._rowVariant = "default";
        }
      }
    },

    rowClass( item, type ) {
      console.log("item:" + item);
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/1795
      // https://github.com/bootstrap-vue/bootstrap-vue/pull/1797
      // if ( !item )
      //   return;
      // if ( item.status === 'awesome' )
      //   return 'table-success';
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

    toggleShowChild(item) {
      // console.log("clicked first_name:" + item.netobj_id);
      toggle_child(this.items, item.netobj_id);
      this.$refs.netobj_table.refresh();
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    sortingChanged(ctx) {
      // console.log("by: " + ctx.sortBy + ", Desc: " + ctx.sortDesc);      
      // ctx.sortBy   ==> Field key for sorting by (or null for no sorting)
      // ctx.sortDesc ==> true if sorting descending, false otherwise

      // console.log("%s", JSON.stringify(this.current_items, null, 2));

      if (ctx.sortBy == null) {
        this.sort_changed = 0;
        this.sort_desc = false;
        this.sort_by = null;

        this.items = this.org_items;
        empty_array(this.org_items);

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

      if (this.sort_by) {
        if (this.org_items.length == 0) {
          this.org_items = deep_copy(this.items);
        }

        sort_data(this.items, this.org_items, this.sort_by, this.sort_desc);
      }
      else {
        empty_array(this.items);
        this.items = deep_copy(this.org_items);
        empty_array(this.org_items);
      }
    },

    getItems(ctx, callback) {
      //let params = '?page=' + ctx.currentPage + '&size=' + ctx.perPage

      //console.log(ctx);
      // console.log("Called getItems: page=%d, perPage=%d", ctx.currentPage, ctx.perPage);

      this.totalRows = this.items.length;
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

</style>





