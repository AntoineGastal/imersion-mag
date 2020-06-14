import { library, dom } from '@fortawesome/fontawesome-svg-core/index';
import { 
    faWordpress,
    faFacebookF,
    faTwitter
 } from '@fortawesome/free-brands-svg-icons'; // prefix: fab
//import { faFire as fasFaFire } from '@fortawesome/pro-solid-svg-icons'; // prefix: fas
//import { faFire as farFaFire } from '@fortawesome/pro-regular-svg-icons'; // prefix: far
import { faTimes as falTimes, faPlusCircle as falPlusCircle,faMinusCircle as falMinusCircle } from '@fortawesome/pro-light-svg-icons'; // prefix: fal

library.add(
    faWordpress,
    falTimes,
    falPlusCircle,
    falMinusCircle,
    faFacebookF,
    faTwitter
)
dom.watch();