<template>
  <b-card header-tag="header">
    <h3 slot="header" class="mb-0">{{caption}}</h3>

    <!-- custom search box does not effect because APIs is not enough -->
    <JqxTreeGrid
      ref="NetobjGrid"
      @rowClick="onRowClick($event)"
      :width="width"
      :sortable="true"
      :icons="true"
      :ready="ready"
      :columns="columns"
      :source="dataAdapter"
      :rowDetails="true"
      :rowDetailsRenderer="rowDetailsRenderer"
      :altRows="true"
      :autoRowHeight="true"
      :selectionMode="'multipleRows'"
      :theme="'material'"
      :filterable="true"
      :filterMode="'simple'"
      :rendered="rendered"
    ></JqxTreeGrid>

    <!-- 
      :filterHeight="0"        
      :filterMode="'default'"              
      :rendered="rendered"                  
      :checkboxes="false"
      :hierarchicalCheckboxes="false"
      :editSettings="editSettings"        
      :filterable="true"
      :filterMode="'simple'"
    -->
  </b-card>
</template>


<script>
import Vue from "vue";
import JqxTreeGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxtreegrid.vue";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
// import "jqwidgets-scripts/jqwidgets/styles/jqx.energyblue.css";
// import "jqwidgets-scripts/jqwidgets/styles/jqx.material.css";

import {
  netobj_data_field,
  netobj_data,
  column_icons
} from "./netobj_data_jqxtreegrid.js";

export default {
  components: {
    JqxTreeGrid,
  },

  data: function() {
    return {
      caption: "Network Objects",
      search_keyword: "",
      editSettings: {
        saveOnPageChange: true,
        saveOnBlur: true,
        saveOnSelectionChange: false,
        cancelOnEsc: true,
        saveOnEnter: true,
        editOnDoubleClick: false,
        editOnF2: false
      },
      width: "100%",
      dataAdapter: new jqx.dataAdapter(this.data_field),
      columns: [
        {
          text: "ID",
          dataField: "netobj_id",
          filterable: true,
          cellsRenderer: this.cellsRenderer,
          renderer: this.custom_header_icon,
          width: 200
        },
        {
          text: "Name",
          dataField: "netobj_name",
          filterable: true,
          renderer: this.custom_header_icon,
          width: 200
        },
        {
          text: "Type",
          dataField: "network_type",
          filterable: true,
          width: 70
        },
        { text: "Start Address", dataField: "network_start", width: 160 },
        { text: "End Address", dataField: "network_end", width: 160 },
        { text: "Mask", dataField: "netmask", width: 50 },
        {
          text: "Created Date",
          dataField: "create_date",
          cellsFormat: "d",
          width: 120
        },
        { text: "Desc", dataField: "desc" /*width: 200*/ }
      ]
    };
  },

  beforeCreate: function() {
    // prepare the data
    this.data_field = netobj_data_field;
    this.data_field.localData = netobj_data;
    this.rowKey = -1;
  },
  watch: {
    search_keyword: function(value) {
      console.log("value:[" + value + "]");

      this.$refs.NetobjGrid.clearFilters();

      if (value == "") {
        return;
      }

      var filtertype = "stringfilter";
      // create a new group of filters.
      var filtergroup = new $.jqx.filter();
      // var filter_or_operator = 0;
      var filter_or_operator = 1;
      var filtervalue = value;
      var filtercondition = "contains"; // equal, contains, starts_with
      var filter = filtergroup.createfilter(
        filtertype,
        filtervalue,
        filtercondition
      );
      filtergroup.addfilter(filter_or_operator, filter);

      this.$refs.NetobjGrid.addFilter("netobj_id", filtergroup);
      // this.$refs.NetobjGrid.applyFilters();
    }
  },
  mounted: function() {
    var d = document.getElementsByClassName("jqx-grid-toolbar");
    // console.log(d);
  },
  methods: {
    ready: function() {
      // this.$refs.NetobjGrid.expandRow(2);
    },
    rendered: function() {
      // var d = document.getElementsByClassName('jqx-grid-toolbar');
      // console.log(d);
    },

    custom_header_icon: function(text, align, height) {
      var icon_name = column_icons[text];
      // console.log("text=" + text + " ,icon=" + icon_name)

      if (icon_name) {
        return (
          "<div style='margin: 5px; margin-top: 7px;'><i class='" +
          icon_name +
          "'/>" +
          "<span style='margin-left: 4px;'>" +
          text +
          "</span><div style='clear: both;'></div></div>"
        );
      }

      return "";
    },

    cellsRenderer: function(
      row,
      dataField,
      cellValueInternal,
      rowData,
      cellText
    ) {
      // console.log("cell renderer:" + row);
    },

    rowDetailsRenderer: function(rowKey, row) {
      // console.log(row);

      if (!row.showDesc) {
        return "";
      }

      let indent = (1 + row.level) * 30;
      let details =
        // "<table style='margin: 1px; min-height: 1px; height: 5px; margin-left: " + indent + "px;'>" +
        // "<tr>" +
        // "<td>" + "<img style='max-width:60px;' height='60' src='" + row.icon + "'/></td>" +
        // "<td>" + row.Address + "</td>" +
        // "</tr> </table>";
        "<div style='margin-left: " + indent + "px;'>" + row.Address + "</div>";
      return details;
    },
    onRowClick: function(event) {
      this.rowKey = event.args.key;
      console.log("rowClick:" + event.args.key);
    }
  }
};
</script>


<style>
.jqx-grid-column-header {
  background: rgb(236, 236, 236);
  color: rgb(109, 109, 109);
}

.jqx-grid-cell-alt {
  background: rgb(248, 248, 248);
}

.jqx-grid-cell-hover {
  background-color: #d3d3d3;
}

.jqx-grid-cell-selected,
.jqx-grid-cell-selected-material,
.jqx-fill-state-pressed,
.jqx-fill-state-pressed-material,
.jqx-fill-state-pressed {
  /* border: 3px solid transparent; */
  background-color: #d3eef8e0;
  /* color: #202020; */
  text-shadow: none;
  border-color: transparent;
  /* opacity: 0.5; */
  /* filter: alpha(opacity=50); */
}

::-ms-clear {
  display: none;
}

.form-control-clear {
  z-index: 10;
  pointer-events: auto;
  cursor: pointer;
}

/* .jqx-grid-toolbar {
  background-color: #59b2d3e0;
} */
</style>


