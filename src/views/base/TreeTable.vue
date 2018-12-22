<template>
  <b-card header-tag="header">
    <h3 slot="header" class="mb-0">{{caption}}</h3>

    <dx-tree-list
      id="tasks"
      :data-source="dataSource"
      :show-borders="true"
      :show-row-lines="true"
      :column-auto-width="true"
      :word-wrap-enabled="true"
      :expanded-row-keys="expandedRowKeys"
      :selected-row-keys="selectedRowKeys"
      :focused-row-enabled="true"
      :hoverStateEnabled="true"
      key-expr="Task_ID"
      parent-id-expr="Task_Parent_ID"
      :onCellClick="onCellClick"
      :onContextMenuPreparing="onContextMenuPreparing"
      @editor-preparing="onEditorPreparing"
    >
      <dx-search-panel :visible="true" :width="250"/>
      <dx-header-filter :visible="false"/>
      <dx-selection mode="multiple"/>
      <dx-column-chooser :enabled="false"/>
      <dx-editing :allow-updating="true" :allow-deleting="true" :allow-adding="true" mode="row"/>

      <dx-column :visible="true" :allow-sorting="true" :width="300" data-field="Task_Subject"/>
      <dx-column
        :allow-sorting="false"
        :min-width="200"
        data-field="Task_Assigned_Employee_ID"
        caption="Assigned"
        cell-template="employeeTemplate"
      >
        <dx-lookup
          :allow-sorting="false"
          :data-source="employees"
          value-expr="ID"
          display-expr="Name"
        />
      </dx-column>
      <dx-column 
      :min-width="100" 
      data-field="Task_Status" 
      caption="Status"
      cell-template="statustemplate"
      >
        <!-- <dx-lookup :data-source="statuses"/> -->
      </dx-column>

      <div slot="statustemplate" slot-scope="options" :cell-data="options.data">
          <!-- {{options.data.Task_Status}} -->
          <!-- <i style="color: blue" :class="iconName(options.data.Task_Status)"></i> -->
          <b-button />
      </div>

      <dx-column :visible="false" data-field="Task_Priority" caption="Priority">
        <dx-lookup :data-source="priorities" value-expr="id" display-expr="value"/>
      </dx-column>
      <dx-column
        :min-width="100"
        :customize-text="customizeTaskCompletionText"
        :visible="false"
        data-field="Task_Completion"
        caption="% Completed"
      />
      <dx-column data-field="Task_Start_Date" caption="Start Date" data-type="date"/>
      <dx-column data-field="Task_Due_Date" caption="Due Date" data-type="date"/>

      <employee-cell slot="employeeTemplate" slot-scope="options" :cell-data="options.data"/>
    </dx-tree-list>
  </b-card>
</template>
<script>
import {
  DxTreeList,
  DxColumn,
  DxColumnChooser,
  DxHeaderFilter,
  DxSearchPanel,
  DxSelection,
  DxEditing,
  DxLookup
} from "devextreme-vue/tree-list";
import DxButton from "devextreme-vue/button";
import "devextreme/dist/css/dx.common.css";
// import 'devextreme/dist/css/dx.light.compact.css';
import "devextreme/dist/css/dx.softblue.css";

import { tasks, employees, priorities } from "./data.js";
import EmployeeCell from "./EmployeeCell.vue";

const statuses = [
  "Not Started",
  "Need Assistance",
  "In Progress",
  "Deferred",
  "Completed"
];

export default {
  name: "TreeTable",

  components: {
    DxTreeList,
    DxColumn,
    DxColumnChooser,
    DxHeaderFilter,
    DxSearchPanel,
    DxSelection,
    DxLookup,
    DxButton,
    DxEditing,
    EmployeeCell
  },
  data() {
    return {
      caption: "Network Objects",
      expandedRowKeys: [1, 2],
      selectedRowKeys: [1, 29, 42],
      employees,
      priorities,
      statuses,
      onCellClick: cell => {
        console.log(
          "on cell click: [" + cell.rowIndex + "," + cell.columnIndex + "]"
        );
      },
      onContextMenuPreparing: function(e) {
        console.log("run context menu" + e.target + "," + e.items);

        if (e.target == "header" && e.columnIndex == 0) {
          e.items.push({
            text: "Item Text",
            onItemClick: function() {
              console.log("click header item text");
            }
          });
        } else if (e.target == "content" && e.columnIndex == 0) {
          e.items = [
            {
              text: "Item Text",
              onItemClick: function() {
                console.log("click content item text");
              }
            },
            {
              text: "Item Text1",
              onItemClick: function() {
                console.log("click content item text");
              }
            }
          ];
        }
      }
    };
  },
  computed: {
    dataSource() {
      return tasks.map(function(task) {
        employees.forEach(function(employee) {
          if (task.Task_Assigned_Employee_ID === employee.ID) {
            task.Task_Assigned_Employee = employee;
          }
        });
        return task;
      });
    }
  },
  methods: {
    customizeTaskCompletionText(cellInfo) {
      return `${cellInfo.valueText}%`;
    },
    onEditorPreparing(e) {
      if (e.dataField === "Head_ID" && e.row.data.ID === 1) {
        e.cancel = true;
      }
    },
    iconName(item) {
      if (item.expend == true) {
        // return "remove_circle_outline";
        return "fa fa-minus-square-o fa-sm"
      }

      if (item.children && item.children.length > 0) {
        //return "control_point";
        return "fa fa-plus-square-o fa-sm"        
      }

      // return "done";
      return "fa fa-check fa-sm"
    },

  }
};
</script>
<style>
#tasks {
  /* max-height: 540px; */
  max-height: 100%;
}
.dx-treelist-headers {
  color: #107bda;
  background-color: #c7c9ca;
  font-weight: normal;
  -ms-touch-action: pinch-zoom;
  touch-action: pinch-zoom;
  border-bottom: 1px solid #e8eaeb;
}

#tasks .dx-treelist-rowsview td {
  vertical-align: middle;
}
</style>
