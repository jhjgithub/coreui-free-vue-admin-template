 <template>

  <b-card header-tag="header">
    <h3 slot="header" class="mb-0">{{caption}}</h3>

    <b-container class="toolbar-box" fluid>      
      <b-row>
        <b-col cols="2" class="search-box">
          <b-input-group size="sm">
            <b-input-group-text slot="prepend">
              <!-- <span class="fa fa-search text-black"/> -->
              <font-awesome-icon  icon="search"  size="sm" />
            </b-input-group-text>
            <b-form-input type="search" v-model.lazy="search_keyword"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col cols="10"  class="d-flex justify-content-end toolbtn-box">
          <span>
              <b-button-group size="sm">
                <b-btn @click.stop="onNew" v-b-tooltip.hover title="New item">
                  <!-- <i class="fas fa-plus fa-lg"></i> -->
                  <font-awesome-icon  icon="plus"  size="lg" />
                </b-btn>
                <b-btn @click.stop="onEdit" v-b-tooltip.hover title="Edit item">
                  <!-- <i class="fa fa-edit fa-lg"></i>  -->
                  <font-awesome-icon  icon="edit"  size="lg" />
                  </b-btn>
                <b-btn @click.stop="onClone" v-b-tooltip.hover title="Clone item">
                  <!-- <i class="fa fa-clone fa-lg"></i>  -->
                  <font-awesome-icon :icon="['far', 'clone']"  size="lg" />
                  </b-btn>              
                <b-btn @click.stop="onDelete" v-b-tooltip.hover title="Delete item">
                  <!-- <i class="fa fa-trash fa-lg"></i>  -->
                  <font-awesome-icon :icon="['far', 'trash-alt']"  size="lg" />
                  </b-btn>              
              </b-button-group>
          </span>
        </b-col>
      </b-row>
    </b-container>

    <b-table striped hover small fixed show-empty 
      :filter="search_keyword"
      :items="getItems(items)" 
      :fields="fields" 
      :sort-by.sync="sort_by"
      :sort-desc.sync="sort_desc"      
      :sort-direction="sort_dir"
      @sort-changed="sortingChanged"
      :current-page="currentPage"
      :per-page="perPage"
      thead-class="table-text"
      class="table-area" 
      @filtered="onFiltered"
      >

      <!-- Checkbox column of the Table Header -->
      <template slot="HEAD_selected" slot-scope="row">
        <b-form-checkbox 
          @click.native.stop
          v-model="selectAll"
          :indeterminate="indeterminate"
          @change="toggleSelectAll"                  
        />
      </template>
      <template slot="HEAD_netobj_id" slot-scope="row">
        <!-- <i v-if="row.field.icon" :class="row.field.icon" /> -->
        <font-awesome-icon :icon="row.field.icon"  size="sm"  />
        {{row.label}} 
        <span v-if="get_sort_by() == row.column">
          <font-awesome-icon :icon="sort_icon" size="sm" :style="{ color: 'red' }"/>
        </span>
      </template>
      <template slot="HEAD_details" slot-scope="row">
        ...
      </template>

      <!-- Checkbox column of the rows -->
      <template slot="selected" slot-scope="row">
        <b-form-checkbox @click.native.stop v-model="row.item.selected" @change="selectRow(row.item)" />
      </template>

      <!-- <template slot="netobj_id" slot-scope="row" :tbody-tr-class="hide-col">         -->
      <template slot="netobj_id" slot-scope="row">
        <div :style="get_left_padding(row.item)">
          <!-- :tbody-tr-class="rowClass" -->
          <!-- :filter="filterGrid"         -->
          <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
          <span>
            <!-- <i style="cursor:pointer" class="row-expand-btn fa fa-chevron-right" @click.stop="toggleShowChild(row.item)"/> -->
            <!-- have-children -->
            <font-awesome-icon 
            :style="get_child_style(row.item)" 
            @click.stop="toggleShowChild(row.item)" 
            :icon="get_child_icon(row.item)"
            size="lg" />
          </span>
          <span>
            {{row.item.netobj_id}}        
          </span>
        </div>
      </template>

      <template slot="details" slot-scope="row">
        <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
        <!-- <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}}
        </b-button> -->
        <font-awesome-icon style="cursor:pointer" @click.stop="row.toggleDetails" icon="info-circle"  size="lg" />

        <!-- In some circumstances you may need to use @click.native.stop instead -->
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <!-- <b-form-checkbox  @click.native.stop @change="row.toggleDetails" v-model="row.detailsShowing">
          Details via check
        </b-form-checkbox> -->
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="2" class="text-sm-right">
              <b>Desc:</b>
            </b-col>
            <b-col>{{ row.item.desc }}</b-col>
          </b-row>
          <!--           
          <b-row class="mb-2">
            <b-col sm="2" class="text-sm-right">
              <b>Is Active:</b>
            </b-col>
            <b-col>{{ row.item.isActive }}</b-col>
          </b-row> -->
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

import {
  netobj_fields,
  netobj_field_icons,
  netobj_data,
  netobj_data1,
} from "./netobj_data_bstreetable.js";

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
      currentPage: 1,
      perPage: 5,
      totalRows: 0,      
      pageOptions: [ 5, 10, 15 ],
    };
  },

  beforeCreate: function() {},
  watch: {
  },
  mounted: function() {
    // console.log(d);
    this.totalRows = this.items.length;
  },
  methods: {
    ready: function() {
      // this.$refs.NetobjGrid.expandRow(2);
    },

    get_sort_by() {
      // console.log("get sort by: " + this.sort_by);
      return this.sort_by;

      // if (this.sort_desc) {
      //   console.log("sort_down");
      //   return "sort_down";
      // }

      // console.log("sort_up");
      // return "sort_up";
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
      item.selected = !item.selected;
      if (item.selected) {
        var all = true;
        for (var i = 0; i < this.items.length; i++) {
          if (!this.items[i].selected)
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
          if (this.items[i].selected)
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
          this.items[i].selected = true;
          // this.items[i]._rowVariant = "info";
        }
      } 
      else {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].selected = false;
          // this.items[i]._rowVariant = "default";
        }
      }
    },

    sortingChanged (ctx) {
      // console.log("by: " + ctx.sortBy + ", Desc: " + ctx.sortDesc);      
      // ctx.sortBy   ==> Field key for sorting by (or null for no sorting)
      // ctx.sortDesc ==> true if sorting descending, false otherwise

      if (ctx.sortBy == null) {
        this.sort_changed = 0;
        this.sort_desc = false;
        this.sort_by = null;
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

      console.log("sort by: " + this.sort_by + ", sort desc: " + this.sort_desc);
      // console.log(this.sort_changed + ": cur by: " + this.sort_by + ", cur desc: " + this.sort_desc);
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
    
    get_tdclass(value, key, item) {
      // console.log("key=" + key + ',value=' + value + ", item=" + JSON.stringify(item));

      /*
      if (item.parent_id == null || !item.children || item.children.length() == 0) {
        return null;
      }
      else if (0){

      }

      return 'hide-col';
      */      
    },

    get_left_padding(item) {
      // 'padding-left': (1 + this.column.collapseIcon * this.row.countParents() * 1.5) + 'rem'
      return { 'padding-left': (item.depth * 0.8) + 'rem' };
    },

    get_child_style(item) {
      if (item.children && item.children.length > 0) {
        return { 
          'cursor': 'pointer',
          'color': 'black'
        };
      }

      return {'color': '#cccccc'}
    },
 
    get_child_icon(item) {
      if (item.children && item.children.length > 0) {
        if (item.show_child) {
          return "angle-down"
        }

        return "angle-right"
      }

      return "angle-right"
    },

    toggleShowChild: function(item) {
      // console.log("clicked first_name:" + item.netobj_id);
      // this.items.splice(2, 1);

      if (item) {
        item.show_child = !item.show_child;
      }
      /*
      for (var i = 0, item; (item = this.items[i]); i++) {
        if (item.id == id) {
          item.showChild = false;
        }
      */
    },

    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    getItems(all_items) {
      var show_items = [];
      var depth = 0;
      
      function recursive_get_items(all_show_items, cur_items, depth) {

        for (var i = 0, item; (item = cur_items[i]); i++) {
          // console.log(item);
          item.depth = depth;
          all_show_items.push(item);

          if (item.show_child && item.children && item.children.length > 0) {
            all_show_items = recursive_get_items(all_show_items, item.children, depth + 1);
          }
        }

        return all_show_items;
      }

      show_items = recursive_get_items(show_items, all_items, depth);
      
      return show_items;
    },
  }
};
</script>


<style>
.card-body {
  padding: 5px;
}

.table-text {
  padding: 0;
  margin: 0;
  color: rgba(29, 28, 28, 0.753);
  font-size: 16px;
  font-style: normal;
  text-align: justify; 
  /* display: table-cell; */
  vertical-align:middle;
  /* text-align: center; */
}

table.b-table > thead > tr > th.sorting::before,
table.b-table > thead > tr > th.sorting::after,
table.b-table > tfoot > tr > th.sorting::before,
table.b-table > tfoot > tr > th.sorting::after {
    position: absolute;
    /* position: relative; */

    /* bottom: 0; */
    /* top: 0.25em; */
    right: 0.75em;
    /* display: block; */
    display: none;
    opacity: 0.4;
    padding-bottom: inherit;
    font-size: inherit;
    /* line-height: 180%;  */
}

table.b-table > thead > tr > th.sorting::before,
table.b-table > tfoot > tr > th.sorting::before {
    /* top: 0.23em; */
    content: '\f0de'; 
    font-family: FontAwesome;
    text-align: left;
}

table.b-table > thead > tr > th.sorting::after,
table.b-table > tfoot > tr > th.sorting::after {
    /* top: 0.23em; */
    content: '\f0dd';
    font-family: FontAwesome;
    /* background-color: red; */
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

.have-children {
  cursor:pointer; 
  color: rgb(24, 23, 23);
}

.no-children {
  /* cursor:pointer;  */
  color: rgb(175, 175, 175);
}

/* .row-expand-btn { */
  /* color: rgba(0, 0, 0, 0.753); */
  /* font-size: 10px; */
  /* font-style: normal; */
  /* text-align: justify; */
  /* display: table-cell; */
  /* vertical-align:middle; */
  /* text-align: center; */
/* } */

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

.hide-col {
  display: none;
}
</style>


