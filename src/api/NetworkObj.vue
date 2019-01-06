<template>
  <div id="networkobj" class="m-6">
    <div class="mb-6">
      <vue-ads-table-tree
        :columns="columns"
        :rows="rows"
        :filter="filterValue"
        :page="0"
        :classes="classes"
      >
        <template slot="title">
          <h4 class="leading-loose font-bold uppercase">Belgium</h4>
        </template>

        <!-- <template slot="filter">
          <h6 class="inline pr-2">Filter:</h6>
          <input
            v-model="filterValue"
            class="appearance-none border py-2 px-3"
            type="text"
            placeholder="Filter..."
          >
        </template>-->
        <template slot="selected" slot-scope="props">
          <v-icon style="width: 10 rem " class="fas fa-plus-square" @click="props.row.selected = !props.row.selected"> </v-icon>
        </template>
        <template slot="firstName" slot-scope="props">
         {{ props.row.firstName }}
        </template>
        <template slot="lastName" slot-scope="props">
          {{ props.row.lastName }}
        </template>

        <template slot="filter">
          <h4>
            <label>
              Filter:
              <input type="text" placeholder="Filter..." @input="debounceFilter($event)">
            </label>
          </h4>
        </template>
        <template slot="pagination" slot-scope="props">
          <vue-ads-pagination
            :total-items="props.total"
            :page="page"
            :loading="props.loading"
            :items-per-page="5"
            @page-change="props.pageChange"
          >
            <template slot-scope="props">
              <div
                class="vue-ads-pr-3 vue-ads-leading-loose"
              >
              {{ props.start }} - {{ props.end }} / {{ props.total }}</div>
            </template>
            <template slot="buttons" slot-scope="props">
              <vue-ads-page-button
                v-for="(button, key) in props.buttons"
                :key="key"
                v-bind="button"
                :class="{'bg-yellow-dark': button.active}"
                @page-change="page = button.page"
              />
            </template>
          </vue-ads-pagination>
        </template>
      </vue-ads-table-tree>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../../node_modules/vue-ads-table-tree/dist/vue-ads-table-tree.css";
import VueAdsPagination from "vue-ads-pagination";
import { VueAdsPageButton } from "vue-ads-pagination";
import VueAdsTableTree from "vue-ads-table-tree";

Vue.use(VueAdsTableTree);
Vue.use(VueAdsPagination);
Vue.use(VueAdsPageButton);

export default {
  name: "networkobj",

  components: {
    VueAdsTableTree,
    VueAdsPagination,
    VueAdsPageButton
  },
  data() {
    return {
      page: 0,
      filterValue: "",
      classes: {
        table: {
          "vue-ads-border": true,
          "vue-ads-w-full": true
        },
        info: {
          "vue-ads-text-center": true,
          "vue-ads-py-6": true,
          "vue-ads-text-sm": true
        },
        "all/": {
          "hover:vue-ads-bg-grey-lighter": true
        },
        "even/": {
          "vue-ads-bg-grey-lightest": true
        },
        "odd/": {
          "vue-ads-bg-white": true
        },
        "0/": {
          "vue-ads-bg-grey-lightest": false,
          "hover:vue-ads-bg-grey-lighter": false
        },
        "0_-1/": {
          "vue-ads-border-b": true
        },
        "/0_-1": {
          "vue-ads-border-r": true
        }
      },
      columns: [
        {
          property: "selected",
          title: "Select",
          sortable: false,
          filterable: false,
          collapseIcon: false,
        },

        {
          property: "firstName",
          title: "First Name",
          sortable: true,
          filterable: true,
          collapseIcon: true,
        },
        {
          property: "lastName",
          title: "Last Name",
          filterable: true,
          sortable: true
        }
      ],
      rows: [
        {
          firstName: "Josephine",
          lastName: "Astrid",
          selected: false
        },
        {
          firstName: "Boudewijn",
          lastName: "Van Brabandt",
          selected: false
        },
        {
          firstName: "Albert II",
          lastName: "Van Belgie",
          selected: false,
          children: [
            {
              firstName: "Filip",
              lastName: "Van Belgie",
              children: [
                {
                  firstName: "Elisabeth",
                  lastName: "Van Brabant"
                },
                {
                  firstName: "Gabriel",
                  lastName: "Boudwijn"
                },
                {
                  firstName: "Emmanuel",
                  lastName: "Van Belgie"
                },
                {
                  firstName: "Eleonore",
                  lastName: "Boudwijn",
                  hasChildren: false
                }
              ]
            },
            {
              firstName: "Astrid",
              lastName: "Van Belgie"
            },
            {
              firstName: "Laurent",
              lastName: "Van Belgie"
            }
          ]
        },
        {
          firstName: "Alexander",
          lastName: "Van Belgie",
          selected: false
        },
        {
          firstName: "Marie-Christine",
          lastName: "Leopoldine",
          selected: false
        }
      ]
    };
  },
  methods: {
    filter(rows, filter) {
      if (!filter) {
        return rows;
      }

      let regex = new RegExp(filter, "i");

      return rows.filter(row => {
        return regex.test(row.firstName) || regex.test(row.lastName);
      });
    }
  }
};
</script>