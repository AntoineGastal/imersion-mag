import { library, dom } from '@fortawesome/fontawesome-svg-core/index';
import { 
    faWordpress,
    faFacebookF,
    faTwitter
 } from '@fortawesome/free-brands-svg-icons'; // prefix: fab
//import { faFire as fasFaFire } from '@fortawesome/pro-solid-svg-icons'; // prefix: fas
//import { faFire as farFaFire } from '@fortawesome/pro-regular-svg-icons'; // prefix: far
import { 
    faTimes as falTimes,
    faMicrophone as falMicrophone,
    faToggleOn as falToggleOn,
    faToggleOff as falToggleOff,
    faEye as falEye,
    faEyeSlash as falEyeSlash,
    faPlus as falPlus,
    faMinus as falMinus,
    faLongArrowRight as falLongArrowRight,
    faExternalLink as falExternalLink


} from '@fortawesome/pro-light-svg-icons'; // prefix: fal

library.add(
    falMicrophone,
    falEye,
    falEyeSlash,
    falPlus,
    falMinus,
    falToggleOn,
    falToggleOff,
    falLongArrowRight,
    falExternalLink, 
    faWordpress,
    falTimes,
    faFacebookF,
    faTwitter
)
dom.watch();