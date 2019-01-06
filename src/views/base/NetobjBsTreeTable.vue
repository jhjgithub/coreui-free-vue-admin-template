<template>

  <b-card header-tag="header">
    <h3 slot="header" class="mb-0">{{caption}}</h3>

    <b-container>      
      <b-row>
        <b-col cols="4">
          <b-input-group size="sm" class="search-box">
            <b-input-group-text slot="prepend">
              <span class="fa fa-search text-black"/>
            </b-input-group-text>
            <b-form-input type="search" v-model.lazy="search_keyword"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col cols="8"  class="d-flex justify-content-end">
          <span>
              <b-button-group size="sm" class="toolbar-box">
                <b-btn @click.stop="onNew" v-b-tooltip.hover title="New item"><i class="fa fa-plus fa-lg"></i> </b-btn>              
                <b-btn @click.stop="onEdit" v-b-tooltip.hover title="Edit item"><i class="fa fa-edit fa-lg"></i> </b-btn>
                <b-btn @click.stop="onClone" v-b-tooltip.hover title="Clone item"><i class="fa fa-clone fa-lg"></i> </b-btn>              
                <b-btn @click.stop="onDelete" v-b-tooltip.hover title="Delete item"><i class="fa fa-trash fa-lg"></i> </b-btn>              
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
      >

      <template slot="HEAD_selected" slot-scope="col">
        <b-form-checkbox 
          @click.native.stop
          v-model="selectAll"
          :indeterminate="indeterminate"
          @change="toggleSelectAll"                  
        />
      </template>

      <template slot="selected" slot-scope="col">
        <b-form-checkbox 
          @click.native.stop
          v-model="col.item.selected"
          @change="selectRow(col.item)"
        />

      </template>

      <template slot="first_name" slot-scope="col">
        <!-- :tbody-tr-class="rowClass" -->
        <!-- :filter="filterGrid"         -->
        <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
        <span>
        <i style="cursor:pointer" class="row-expand-btn fa fa-chevron-right" @click.stop="toggleShowChild(col.item)"></i>
        </span>
        {{col.item.first_name}}        
      </template>
      <template slot="show_details" slot-scope="col">
        <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
        <b-button size="sm" @click.stop="col.toggleDetails" class="mr-2">
          {{ col.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>
        <!-- In some circumstances you may need to use @click.native.stop instead -->
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <!-- <b-form-checkbox  @click.native.stop @change="row.toggleDetails" v-model="row.detailsShowing">
          Details via check
        </b-form-checkbox> -->
      </template>
      <template slot="row-details" slot-scope="col">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Age:</b>
            </b-col>
            <b-col>{{ col.item.age }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Is Active:</b>
            </b-col>
            <b-col>{{ col.item.isActive }}</b-col>
          </b-row>
          <b-button size="sm" @click="col.toggleDetails">Hide Details</b-button>
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
  netobj_data
} from "./netobj_data_bstreetable.js";

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

      fields: netobj_fields,
      items: netobj_data,
      currentPage: 1,
      perPage: 2,
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

      // console.log(this.sort_changed + ": cur by: " + this.sort_by + ", cur desc: " + this.sort_desc);
    },

    rowClass( item, type ) {
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/1795
      // https://github.com/bootstrap-vue/bootstrap-vue/pull/1797
      // if ( !item )
      //   return;
      // if ( item.status === 'awesome' )
      //   return 'table-success';
    },
    
    toggleShowChild: function(item) {
      // console.log("clicked first_name:" + item.first_name);
      // this.items.splice(2, 1);

      if (item) {
        item.showChild = !item.showChild;
      }
      /*
      for (var i = 0, item; (item = this.items[i]); i++) {
        if (item.id == id) {
          item.showChild = false;
        }
      */
    },

    getItems(items) {
      var ii = [];
      
      return items;
      
      // <b-table :row-class="(row, index) => row.id === 1 ? 'is-hidden' : ''"> .... </b-table>
      for (var i = 0, item; (item = items[i]); i++) {
        // console.log(item);
        if (item.showChild) {
          ii.push(item);
        }
      }

      return ii;
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

    /* bottom: 0; */
    /* top: 0.25em; */
    right: 0.75em;
    display: block;
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

.row-expand-btn {
  color: rgba(0, 0, 0, 0.753);
  /* font-size: 10px; */
  font-style: normal;
  /* text-align: justify; */
  /* display: table-cell; */
  /* vertical-align:middle; */
  /* text-align: center; */
}

.custom-control, .custom-checkbox, .custom-control-inline, .options-column {
  padding-top: 0.15em;
  /* padding-left: 2em; */
}

.search-box {
  width: 100%; 
  padding: 5px 0px;
}

.toolbar-box {
  width: 100%;
  padding: 5px 0px;
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


