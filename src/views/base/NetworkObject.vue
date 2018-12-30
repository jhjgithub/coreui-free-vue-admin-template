<template>
  <b-card header-tag="header">
    <h3 slot="header" class="mb-0">{{caption}}</h3>

    <dx-tree-list
      id="netobjs"
      :data-source="netobjs"
      :show-borders="true"
      :show-row-lines="true"
      :column-auto-width="true"
      :word-wrap-enabled="true"
      :expanded-row-keys="expandedRowKeys"
      :selected-row-keys="selectedRowKeys"
      :focused-row-enabled="true"
      :hoverStateEnabled="true"
      key-expr="netobj_id"
      parent-id-expr="parent_id"
      :onCellClick="onCellClick"
      :onContextMenuPreparing="onContextMenuPreparing"
      @editor-preparing="onEditorPreparing"
      :columnHidingEnabled="true"
      :columns="columns"
    >


      <dx-search-panel :visible="true" :width="250"/>
      <dx-header-filter :visible="false"/>
      <dx-selection mode="multiple"/>
      <dx-column-chooser :enabled="false"/>
      <dx-editing :allow-updating="true" :allow-deleting="true" :allow-adding="true" mode="form"/>

      <!-- column header -->
      <!--       
      <dx-column :allow-sorting="true" :width="150" data-field="netobj_id" caption="ID"/>
      <dx-column :allow-sorting="true" :width="200" data-field="netobj_name" caption="Name" cell-template="nametemplate"/>
      <dx-column :allow-sorting="true" :width="100" data-field="network_type" caption="Type"/>
      <dx-column :allow-sorting="true" :width="100" data-field="network_start" caption="Start Address"/>
      <dx-column :allow-sorting="true" :width="100" data-field="network_end" caption="End Address"/>
      <dx-column :allow-sorting="true" :width="100" data-field="netmask" caption="Netmask"/>
      <dx-column :allow-sorting="true" data-field="create_date" caption="Date" data-type="datetime" date-serialization-format="yyyy-MM-ddTHH:mm:ss"/>
      -->

         <!-- type: "buttons",
          buttons: [{
              name: "edit",
              icon: "edit"
          }] -->

      <!-- custom slot -->
      <div slot="name_cell" slot-scope="cell_info">
        <div>{{cell_info.data.netobj_name}}</div>
        <!-- <div class="desc">{{cell_info.data.desc}} </div> -->
          <!-- <i style="color: blue" :class="iconName(options.data.Task_Status)"></i> -->
          <!-- <b-button /> -->
      </div>
      <div slot="name_header" slot-scope="header_info">
        <div>{{header_info.column.caption}} </div>
        <!-- <div>Desc</div> -->
        <!-- <div class="desc">{{options.data.desc}} </div> -->
          <!-- <i style="color: blue" :class="iconName(options.data.Task_Status)"></i> -->
          <!-- <b-button /> -->
      </div>


      <!--
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
      -->
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

import { netobjs } from "./netobj_data.js";
// import EmployeeCell from "./EmployeeCell.vue";

const statuses = [
  "Not Started",
  "Need Assistance",
  "In Progress",
  "Deferred",
  "Completed"
];

export default {
  name: "NetworkObject",

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
    // EmployeeCell
  },

  //  <dx-column :allow-sorting="true" :width="150" data-field="netobj_id" caption="ID"/>
  //     <dx-column :allow-sorting="true" :width="200" data-field="netobj_name" caption="Name" cell-template="nametemplate"/>
  //     <dx-column :allow-sorting="true" :width="100" data-field="network_type" caption="Type"/>
  //     <dx-column :allow-sorting="true" :width="100" data-field="network_start" caption="Start Address"/>
  //     <dx-column :allow-sorting="true" :width="100" data-field="network_end" caption="End Address"/>
  //     <dx-column :allow-sorting="true" :width="100" data-field="netmask" caption="Netmask"/>
  //     <dx-column :allow-sorting="true" data-field="create_date" caption="Date" data-type="datetime" date-serialization-format="yyyy-MM-ddTHH:mm:ss"/>
  //     -->

  //        <!-- type: "buttons",
  //         buttons: [{
  //             name: "edit",
  //             icon: "edit"
  //         }] -->

  data() {
    return {
      caption: "Network Objects",
      expandedRowKeys: [],
      selectedRowKeys: [],
      netobjs,
      columns: [
        {
          caption: "ID",
          dataField: "netobj_id",
          width: "200px",
          hidingPriority: 7,
        },
        {
          caption: "Name",
          dataField: "netobj_name",
          width: "200px",
          cellTemplate: "name_cell",
          headerCellTemplate: "name_header",
          hidingPriority: 6,
        },
        {
          caption: "Type",
          dataField: "network_type",
          width: "100px",
          hidingPriority: 5,
        },
        {
          caption: "Start Address",
          dataField: "network_start",
          width: "150px",
          hidingPriority: 4,
        },
        {
          caption: "End Address",
          dataField: "network_end",
          width: "150px",
          hidingPriority: 3,
        },
        {
          caption: "Netmask",
          dataField: "netmask",
          width: "100px",
          hidingPriority: 2,
        },
        {
          caption: "Created Date",
          dataField: "create_date",
          // width: "200px",
          dataType: "datetime",
          hidingPriority: 1,
        },
        {
          caption: "Desc",
          dataField: "desc",
          hidingPriority: 0,
          // width: "200px",
        },
        {
          caption: "...",
          type: "adaptive",
          width: "50px"
        },
        {
          type: "buttons",
          buttons: [
            {
              name: "add",
              icon: "plus"
            },
            {
              name: "edit",
              icon: "edit"
            },
            {
              name: "delete",
              icon: "trash"
            }
          ]
        }
      ],
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
    /*
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
    */
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

#desc {
  background-color: red;
}
.dx-treelist-headers {
  color: #107bda;
  background-color: #c7c9ca;
  /* font-weight: normal; */
  font-weight: 700;
  /* font-size: 20px; */
  -ms-touch-action: pinch-zoom;
  touch-action: pinch-zoom;
  border-bottom: 1px solid #e8eaeb;
}

#tasks .dx-treelist-rowsview td {
  vertical-align: middle;
}
</style>
