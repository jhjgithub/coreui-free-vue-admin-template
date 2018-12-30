<template>
  <b-card header-tag="header">
    <h3 slot="header" class="mb-0">{{caption}}</h3>

    <JqxTreeGrid
      ref="myTreeGrid"
      @rowClick="rowClick($event)"
      :width="width"
      :sortable="true"
      :icons="true"
      :ready="ready"
      :filterable="true"
      :filterMode="'simple'"
      :columns="columns"
      :columnGroups="columnGroups"
      :source="dataAdapter"
      :rowDetails="true"
      :rowDetailsRenderer="rowDetailsRenderer"
      :checkboxes="false"
      :hierarchicalCheckboxes="false"
      :altRows="true"
      :autoRowHeight="true"
      :editSettings="editSettings"
      :rendered="rendered"
      :selectionMode="'multipleRows'"
    ></JqxTreeGrid>
  </b-card>
</template>

<script>
import JqxTreeGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxtreegrid.vue";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import { netobj_data_field, netobj_data, netobj_columns } from "./netobj_data_jqxtreegrid.js";

export default {
  components: {
    JqxTreeGrid
  },

  data: function() {
    return {
      caption: "Network Objects",
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
      columns: netobj_columns,
      columnGroups: [{ text: "Name", name: "Name" }]
    };
  },

  beforeCreate: function() {
    // prepare the data
    this.data_field = netobj_data_field;
    this.data_field.localData = netobj_data;
    this.rowKey = -1;
  },
  methods: {
    ready: function() {
      // this.$refs.myTreeGrid.expandRow(2);
    },
    rowDetailsRenderer: function(rowKey, row) {
      if (row.FirstName != "Nancy") {
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
    rendered: function() {
      let uglyEditButtons = jqwidgets.createInstance(
        ".editButton",
        "jqxButton",
        { width: 60, height: 24, value: "Edit" }
      );
      let flattenEditButtons = flatten(uglyEditButtons);
      let uglyCancelButtons = jqwidgets.createInstance(
        ".cancelButton",
        "jqxButton",
        { width: 60, height: 24, value: "Cancel" }
      );
      let flattenCancelButtons = flatten(uglyCancelButtons);
      function flatten(arr) {
        if (arr.length) {
          return arr.reduce((flat, toFlatten) => {
            return flat.concat(
              Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
            );
          }, []);
        }
      }
      if (flattenEditButtons) {
        for (let i = 0; i < flattenEditButtons.length; i++) {
          flattenEditButtons[i].addEventHandler("click", event => {
            this.editClick(event);
          });
        }
      }
      if (flattenCancelButtons) {
        for (let i = 0; i < flattenCancelButtons.length; i++) {
          flattenCancelButtons[i].addEventHandler("click", event => {
            let rowKey = event.target.getAttribute("data-row");
            this.$refs.myTreeGrid.endRowEdit(rowKey, true);
          });
        }
      }
    },
    rowClick: function(event) {
      this.rowKey = event.args.key;
    },
    editClick: function(event) {
      let editButtonsContainers = document.getElementsByClassName("editButton");
      let cancelButtonsContainers = document.getElementsByClassName(
        "cancelButton"
      );
      let value = event.target.innerText;
      if (value === "Edit") {
        this.$refs.myTreeGrid.beginRowEdit(this.rowKey.toString());
        for (let i = 0; i < editButtonsContainers.length; i++) {
          editButtonsContainers[i].style.marginLeft = "4em";
          cancelButtonsContainers[i].style.display = "none";
        }
        editButtonsContainers[this.rowKey - 1].innerText = "Save";
        editButtonsContainers[this.rowKey - 1].style.marginLeft = "1em";
        cancelButtonsContainers[this.rowKey - 1].style.display = "inline-block";
      } else {
        editButtonsContainers[this.rowKey - 1].innerText = "Edit";
        editButtonsContainers[this.rowKey - 1].style.marginLeft = "4em";
        cancelButtonsContainers[this.rowKey - 1].style.display = "none";
        this.$refs.myTreeGrid.endRowEdit(this.rowKey.toString());
      }
    }
  }
};
</script>


<style>
</style>


