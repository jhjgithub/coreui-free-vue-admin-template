import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import { 
  faUser, 
  faInfoCircle,
  faAngleRight, 
  faAngleDown,
  faAngleUp,
  faPlus, faEdit, faClone, faTrashAlt,
  faSortUp, faSortDown,
  faSortAmountDown, faSortAmountUp,
  faSearch,  
  faIdBadge,
  faTimesCircle,
  faCheckCircle,
  faEraser,
  faCheck,
  faTimes,
  faMinus,
  faCaretDown,
  faCaretUp,
  faCaretRight,
  faClock,
  faSave,
  faBan,
  faEye,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser, 
  faInfoCircle,
  faAngleRight, 
  faAngleDown,
  faAngleUp,
  faPlus, faEdit, faClone, faTrashAlt,
  faSortUp, faSortDown,
  faSortAmountDown, faSortAmountUp,
  faSearch,
  faIdBadge,
  faTimesCircle,
  faCheckCircle,
  faEraser,
  faCheck,
  faTimes,
  faMinus,
  faCaretDown,
  faCaretUp,
  faCaretRight,
  faClock,
  faSave,
  faBan,
  faEye,
  faChevronRight,
);

import { 
  faClone as faCloneR,
  faTrashAlt as faTrashAltR,
  faArrowAltCircleRight as faArrowAltCircleRightR,
  faTimesCircle as faTimesCircleR,
  faCheckCircle as faCheckCircleR,
} from '@fortawesome/free-regular-svg-icons'

library.add(
  faCloneR,
  faTrashAltR,
  faArrowAltCircleRightR,
  faTimesCircleR,
  faCheckCircleR,
);


Vue.component('font-awesome-icon', FontAwesomeIcon); // registered globally

