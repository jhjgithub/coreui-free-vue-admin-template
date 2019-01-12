import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import { 
  faUser, 
  faInfoCircle,
  faAngleRight, 
  faAngleDown,
  faPlus, faEdit, faClone, faTrashAlt,
  faSortUp, faSortDown,
  faSortAmountDown, faSortAmountUp,
  faSearch,  
  faIdBadge,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser, 
  faInfoCircle,
  faAngleRight, 
  faAngleDown,
  faPlus, faEdit, faClone, faTrashAlt,
  faSortUp, faSortDown,
  faSortAmountDown, faSortAmountUp,
  faSearch,
  faIdBadge,
);

import { 
  faClone as faCloneR,
  faTrashAlt as faTrashAltR,
  faArrowAltCircleRight as faArrowAltCircleRightR,
} from '@fortawesome/free-regular-svg-icons'

library.add(
  faCloneR,
  faTrashAltR,
  faArrowAltCircleRightR,
);


Vue.component('font-awesome-icon', FontAwesomeIcon); // registered globally

