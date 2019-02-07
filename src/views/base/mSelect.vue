
<script>
import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select';

// <template>
//   <b-form-select multiple v-model="selected" :select-size="5" :options="options" :state="state" />
// </template>
export default {
  name: 'mSelect',
  extends: bFormSelect,
  created: function () {
    this.$on('input', function (child) {
      console.log('got input event')
      console.log(child);
      this.updateValue();
    })
    // this.$on('change', function (child) {
    //   console.log('got change event')
    //   this.updateValue();
    // })
  },
  // props: {
  //   selectSize: {
  //     type: Number,
  //     default:  0,
  //   },
  //   options: {
  //     type: Array,
  //     default: function () { return [] },
  //   },
  //   selected: {
  //     type: Array,
  //     default: function () { return [] },
  //   },
  //   select: {
  //     type: Array,
  //     default: function () { return [] },
  //   },
  //   state: {
  //     type: String,
  //     default: function() { return null;},
  //   },

  // },

  $_veeValidate: {
    value() {
      let l = this.options.length;
      console.log("Call value: %d ", l);
      return l;
    },

    // component name getter
    name () {
      console.log("Call name ");
      return 'children'
    }
  },

  // method: {
  //   size() {
  //     return this.selected.length;
  //   }
  // },
  methods: {
    updateValue(e) {
      let l = this.options.length;
      console.log("len=%d", l);
      // this.$emit("input", this.options);
    }
  },
}
</script>
