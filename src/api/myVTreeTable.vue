/**
* This component handles rendering a tree view in a data grid
*/

<template>
  <div class="v-tree-data-table">
    <!-- :select-all="selectAll"  -->
    <v-data-table ref="dataTable" 
    class="elevation-1" 
    v-model="selected" 
    :rows-per-page-text="rowsPerPageText" 
    :rows-per-page-items="rowsPerPageItems" 
    :headers="computedHeaders" 
    :items="flattenedNodes" 
    :pagination.sync="internalPagination" 
    :total-items="totalItems" 
    :loading="loading">
      <template slot="no-data">
        <slot name="no-data">
          <tr>
            <td :colspan="headers.length + (selectAll ? 1 : 0)" class="text-xs-center">
              No matching records found
            </td>
          </tr>
        </slot>
      </template>

      <template slot="headers" slot-scope="props1">
        <!-- <slot name="headers" :props="props"> -->
          <tr>
            <th v-if="selectAll" style="width: 1px">
            <!-- <th v-if="selectAll"> -->
              <v-checkbox :input-value="props.all" :indeterminate="props.indeterminate" primary hide-details @click.native="toggleSelectAll"></v-checkbox>
            </th>
            <!-- <template v-for="header in props.headers"> -->
              <!-- <th v-if="header.sortable" :key="header.text" :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '', `text-xs-${header.align || 'left'}`]" @click="changeSort(header.value)"> -->
              <!-- <th v-if="header.sortable" v-for="header in props.headers" 
               :key="header.text" 
               :class="[pagination.descending ? 'desc' : 'asc', `text-xs-${header.align || 'left'}`]" 
               @click="changeSort(header.value)"
               >                
                <v-icon small>arrow_upward</v-icon>
                {{ header.text }}
              </th> -->
              <th v-for="header in props.headers" :key="header.text" :class="`text-xs-${header.align || 'left'}`">
                {{ header.text }}
              </th>
            <!-- </template> -->
          </tr>
        <!-- </slot> -->
      </template>
     <template slot="headers" slot-scope="props">
      <tr>
        <th
          v-for="header in props.headers"
          :key="header.text"
          :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
          @click="changeSort(header.value)"
        >
        <!-- :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']" -->
          <!-- <v-icon small>arrow_upward</v-icon> -->
          {{ header.text }}, {{header.width}}
        </th>
      </tr>
    </template>
      <template slot="items" slot-scope="props">
        <!-- <tr v-if="props.index == 0" class="drop-row inactive" :style="nodeHidden(props.item)" @dragenter.stop.prevent="dragEnterSlot($event)" @dragleave.stop.prevent="dragLeaveSlot($event)" @drop.stop.prevent="dropRow($event)" @dragover.stop="dragOverSlot($event)">
          <td :colspan="computedHeaders.length + (selectAll ? 1 : 0)"></td>
        </tr> -->

        <tr v-if="props.item.leaf" class="leaf" :active="props.selected" @dblclick="(e)=>{$emit('dblclick', e, props.item)}" @contextmenu.prevent="(e)=>{$emit('contextmenu', e, props.item)}" :key="props.item.id" :id="props.item.id" :style="nodeHidden(props.item)" @dragenter.stop.prevent="dragEnterLeaf($event)" @dragleave.stop.prevent="dragLeaveLeaf($event)" @drop.stop.prevent="dropRow($event)" @dragover.stop="dragOverLeaf($event)">
          <td v-if="selectAll">
            <v-checkbox @click="props.selected = !props.selected" :input-value="props.selected" primary hide-details></v-checkbox>
          </td>
          <!-- <td class="px-1" style="width: 0.1%">
            <v-btn style="cursor: move" icon class="sort-handle" @dragstart.stop="dragStart($event)" @dragend.stop.prevent="dragEnd" draggable>
              <v-icon class="fas fa-bars fa-sm"></v-icon>                          
            </v-btn>
          </td> -->
          <td v-if="props.item.leaf" class="expandable-node" style="width: 0.1%" :style="nodeStyle(props.item)">
            <!-- <v-icon>keyboard_arrow_right</v-icon> -->
            <v-icon class="fas fa-network-wired fa-sm"></v-icon>            
          </td>
          <td v-else class="expandable-node" @click="toggleNode(props.item)" style="width: 0.1%" :style="nodeStyle(props.item)">
            <!-- <v-icon>{{expandableIcon(props.item)}}</v-icon> -->
            <v-icon :class="expandableIcon(props.item)"></v-icon>
          </td>
          <slot name="row" v-bind="props"></slot>
          <!-- <td v-for="item in props.item" :key="item"><v-icon class="fas fa-network-wired fa-sm"></v-icon> {{ item }} </td>           -->
        </tr>

        <tr v-if="!props.item.leaf" class="folder" :active="props.selected" @dblclick="(e)=>{$emit('dblclick', e, props.item)}" @contextmenu.prevent="(e)=>{$emit('contextmenu', e, props.item)}" :key="props.item.id" :id="props.item.id" :style="nodeHidden(props.item)" @dragenter.stop.prevent="dragEnterFolder($event)" @dragleave.stop.prevent="dragLeaveFolder($event)" @drop.stop.prevent="dropRow($event)" @dragover.stop="dragOverFolder($event)">
          <td v-if="selectAll">
            <v-checkbox @click="props.selected = !props.selected" :input-value="props.selected" primary hide-details></v-checkbox>
          </td>
          <!-- <td class="px-1" style="width: 0.1%">
            <v-btn style="cursor: move" icon class="sort-handle" @dragstart.stop="dragStart($event)" @dragend.stop.prevent="dragEnd" draggable>
              <v-icon class="fas fa-bars fa-sm"></v-icon>                                        
            </v-btn>
          </td> -->
          <!-- <td v-if="props.item.leaf" class="expandable-node" style="width: 0.1%" :style="nodeStyle(props.item)">
            <v-icon class="fas fa-network-wired fa-lg"></v-icon>                        
          </td> -->
          <td v-else class="expandable-node" @click="toggleNode(props.item)" style="width: 0.1%" :style="nodeStyle(props.item)">
            <!-- <v-icon>{{expandableIcon(props.item)}}</v-icon> -->
            <v-icon  :class="expandableIcon(props.item)"></v-icon>
          </td>
          <slot name="row" v-bind="props"></slot>
        </tr>

        <!-- <tr class="drop-row inactive" :style="nodeHidden(props.item)" @dragenter.stop.prevent="dragEnterSlot($event)" @dragleave.stop.prevent="dragLeaveSlot($event)" @drop.stop.prevent="dropRow($event)" @dragover.stop="dragOverSlot($event)">
          <td :colspan="computedHeaders.length + (selectAll ? 1 : 0)"></td>
        </tr> -->
      </template>
    </v-data-table>
  </div>
</template>

<script>
import nodeHelper from "@/api/nodeHelper";

export default {
  props: {
    headers: {
      type: Array,
      default: [],
      required: true
    },
    items: {
      type: Array,
      default: [],
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    rowsPerPageItems: {
      type: Array,
      default: () => {
        return [
          5,
          10,
          25,
          { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
        ];
      }
    },
    rowsPerPageText: {
      type: String,
      default: `$vuetify.dataTable.rowsPerPageText`
    },
    selectAll: {
      type: [Boolean, String],
      default: undefined
    },
    value: {
      type: Array,
      default: undefined
    },
    validDrop: {
      type: Function,
      default: undefined
    }
  },

  mounted: function() {
    this.setupDragGhosts();
  },

  data: function() {
    return {
      internalPagination: {},
      flattenedNodes: [],

      overFolder: null,
      draggedNode: null,
      newParentNode: null,
      selected: []
    };
  },

  watch: {
    internalPagination() {
      // when pagination is changed emit a load
      this.$emit("load", this.internalPagination);
    },
    items() {
      this.flattenNodes();
    },
    value() {
      this.selected = this.value;
    },
    selected() {
      this.$emit("input", this.selected);
    }
  },

  computed: {
    computedHeaders() {
      let headers = this.headers;

      headers.unshift({
        text: "",
        value: "expanded",
        width: "5%",
        sortable: false
      });

      // headers.unshift({
      //   text: " ",
      //   value: "sortable",
      //   sortable: false
      // });

      return headers;
    }
  },

  methods: {
    /**
     * Fired when select all is toggled
     */
    toggleSelectAll() {
      if (this.selected.length > 0) {
        this.selected = [];
      } else {
        this.selected = this.items;
      }
    },
    changeSort (column) {
      // if (this.pagination.sortBy === column) {
      //   this.pagination.descending = !this.pagination.descending
      // } else {
      //   this.pagination.sortBy = column
      //   this.pagination.descending = false
      //conosle.log("click soft column");
    },

    /**
     * Find the node in items
     * @param {String | Number} nodeId The Node
     * @return {Object} the Node
     */
    findNode(nodeId) {
      nodeHelper.findNode(nodeId, this.items);
    },

    /**
     * Get the icon for the node
     * @param {Object} node The Node
     */
    expandableIcon(node) {
      if (node.expanded) {
        // return "folder_open";
        // return "expand_less";
        return "fas fa-angle-up fa-lg"
      } else {
        // return "folder";
        // return "expand_more";
        return "fas fa-angle-down fa-lg"        
      }
    },

    /**
     * Get the style padding for the node
     * @param {Object} node The Node
     */
    nodeStyle(node) {
      return {
        paddingLeft: 8 + 12 * node.depth + "px"
      };
    },

    /**
     * Flatten nested nodes
     */
    flattenNodes(nodes) {
      nodes = nodes || this.items;

      this.flattenedNodes = nodeHelper.flattenNodes(nodes);
    },

    /**
     * UnFlatten flattend nodes
     */
    unFlattenNodes() {
      return nodeHelper.unFlattenNodes(this.flattenedNodes);
    },

    /**
     * Determine if a node should be hidden
     * @param {Object} node The Node
     */
    nodeHidden(node) {
      if (!node.parentNode) {
        return null;
      } else if (node.parentNode.expanded) {
        return null;
      } else {
        return "display:none;";
      }
    },

    /**
     * Toggle node from expanded
     * @param {Object} node The Node
     */
    toggleNode(node) {
      this.$set(node, "expanded", !node.expanded);

      if (!node.expanded) this.collapseChildren(node);

      this.$emit("node-toggle", node);
    },

    /**
     * Collapse all nodes children
     * @param {Object} node The Node
     */
    collapseChildren(node) {
      let vm = this;

      this.$set(node, "expanded", false);

      if (node.children) {
        node.children.forEach(child => {
          vm.collapseChildren(child);
        });
      }
    },

    /*
    * Helpers
    */

    /**
     * Clear any active classes
     */
    clearActive() {
      $(this.$el)
        .find(".active")
        .removeClass("active");
    }
  }
};
</script>

<style>
.v-tree-data-table .folder {
  cursor: pointer;
}
.v-tree-data-table .drag * {
  pointer-events: none;
}
.v-tree-data-table .inactive {
  border: none !important;
  height: 10px;
  background-color: transparent !important;
}
.v-tree-data-table .inactive td {
  height: 10px !important;
}
.v-tree-data-table .active {
  background-color: green !important;
  height: 1px;
}
.v-tree-data-table .active td {
  height: 10px !important;
}
.v-tree-data-table .sort-handle {
  cursor: move;
}
  .v-tree-data-table .tbody th {
    height: 10px;
    background-color:red !important;    
  }
  
</style>