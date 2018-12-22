<template>
  
  <!-- <div class="q-table-container q-table-dense">
    <div class="q-table-middle scroll"> -->
    <b-card :header="caption">      
      <table class="table table-sm table-striped table-bordered table-hover table-condensed table-bordered" cellspacing="0" style="width:100%">
        <thead class="black white-text">
          <tr class style="text-align: left;">
            <th class="th-sm">Name</th>
            <th class="th-sm">Description</th>
            <th class="th-sm">Account</th>
            <th class="th-sm">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item ,index)  in (arrayTreeObj)"
            :key="index"
            v-bind:class="[(item.id != selectedRowID.id) ? 'my-label':'text-green bg-light-green-11','']"
            @click="selectedRow(item)"
          >
            <!-- height="10px"           -->
            <td data-th="Name" @click="toggle(item, index)">
              <span class="q-tree-link q-tree-label" v-bind:style="setPadding(item)">
                <!-- <q-icon style="cursor: pointer;" :name="iconName(item)" color="secondary"></q-icon> -->
                <i style="color: blue" :class="iconName(item)"></i>
                {{item.name}}
              </span>
            </td>
            <td data-th="Description">{{item.description}}</td>
            <td width="20%" data-th="Account">{{item.niif_account}}</td>
            <td width="10%" data-th="Actions">
              <!-- <q-btn dense flat color="blue" icon="add_circle"></q-btn> -->
            </td>
          </tr>
        </tbody>
      </table>
    </b-card>      
    <!-- </div>
  </div> -->
 
</template>

<script>
export default {
  name: "TreeTable1",

  
  data: function() {
    return {
      // version: Quasar.version,
      isExpanded: true,
      selectedRowID: {},
      table: [
        {
          children: [
            {
              children: [
                {
                  children: [],
                  leaf: false,
                  level: 1,
                  name: "Sub-Value",
                  niif_account: "36565",
                  parent_id: 2,
                  id: 4,
                  description: "sub-description"
                }
              ],
              leaf: true,
              level: 1,
              name: "Sub-Value 1",
              niff_account: "123567",
              parent_id: 1,
              id: 2,
              description: "sub-description value 1"
            }
          ],
          leaf: false,
          level: 0,
          name: "Value 1",
          niff_account: "",
          parent_id: null,
          expend: null,
          id: 1,
          description: "description value 1"
        },
        {
          children: [],
          leaf: true,
          level: 0,
          name: "Value 2",
          niff_account: "",
          parent_id: null,
          expend: null,
          id: 2,
          description: "description value 2"
        }
      ],
      itemId: null
    };
  },
  methods: {
    notify: function() {
      //this.$q.notify("Running on Quasar v" + this.$q.version);
    },

    recursive(obj, newObj, level, itemId, isExpend) {
      let vm = this;

      obj.forEach(function(o) {
        if (o.children && o.children.length != 0) {
          o.level = level;
          o.leaf = false;
          newObj.push(o);
          if (o.id == itemId) {
            o.expend = isExpend;
          }
          if (o.expend == true) {
            vm.recursive(o.children, newObj, o.level + 1, itemId, isExpend);
          }
        } else {
          o.level = level;
          o.leaf = true;
          newObj.push(o);
          return false;
        }
      });
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
      return "fa fa-angle-right fa-sm"
    },

    toggle(item, index) {
      let vm = this;
      vm.itemId = item.id;

      item.leaf = false;
      //show  sub items after click on + (more)
      if (
        item.leaf == false &&
        item.expend == undefined &&
        item.children != undefined
      ) {
        if (item.children.length != 0) {
          vm.recursive(item.children, [], item.level + 1, item.id, true);
        }
      }

      if (item.expend == true && item.children != undefined) {
        var __subindex = 0;
        item.children.forEach(function(o) {
          o.expend = undefined;
        });

        vm.$set(item, "expend", undefined);
        vm.$set(item, "leaf", false);
        vm.itemId = null;
      }
    },
    setPadding(item) {
      return `padding-left: ${item.level * 30}px;`;
    }
  },
  computed: {
    arrayTreeObj() {
      let vm = this;
      var newObj = [];
      vm.recursive(vm.table, newObj, 0, vm.itemId, vm.isExpanded);
      console.log(newObj);

      return newObj;
    }
  },
  watch: {
    selectedIDRow: function(val) {
      if (this.selectedRowID != null) {
        this.$set(this.selectedRowID, "id", val);
      }
    }
  }
  
  
  /*
  data: () => ({
          columns: [
        {
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: 'name',
          sortable: true
        },
        { name: 'calories', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],

    tableData: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%'
      },
      {
        name: "Larabar",
        category: "Snack",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        sodium: 87,
        calcium: '14%',
        iron: "45%",
        children: false
      }      
    ]
  })
  */

};
</script>