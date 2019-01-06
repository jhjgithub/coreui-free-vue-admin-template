import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import { 
  faUser, faAngleRight, faCaretRight, faInfoCircle,
  faPlus, faEdit, faClone, faTrashAlt,
  faSortUp, faSortDown,
  faSortAmountDown, faSortAmountUp,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faAngleRight,
  faCaretRight,
  faInfoCircle,
  faPlus,faEdit, faClone, faTrashAlt,
  faSortUp, faSortDown,
  faSortAmountDown, faSortAmountUp,
);

import { 
  faClone as faCloneR,
  faTrashAlt as faTrashAltR

} from '@fortawesome/free-regular-svg-icons'
library.add(
  faCloneR,
  faTrashAltR,
);


Vue.component('font-awesome-icon', FontAwesomeIcon); // registered globally

