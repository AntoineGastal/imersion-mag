/*
|
| Importing Libs 
|------------------

//import Swiper from 'swiper/js/swiper.min';
import { gsap } from "gsap";
import CustomEase from "@lib/gsap-pro/CustomEase";
//import DrawSVGPlugin from "@lib/gsap-pro/DrawSVGPlugin";
import SplitText from "@lib/gsap-pro/SplitText";
import Plyr from 'plyr/src/js/plyr';
//import ScrollTrigger from "gsap/ScrollTrigger";
//import LocomotiveScroll from '@lib/locomotive-scroll/src/locomotive-scroll';
import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { CustomEase } from "gsap/CustomEase";
//import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger);
//gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
*/
import Swiper from 'swiper/js/swiper.min';
import gsap from "gsap";
//import CustomEase from "gsap/CustomEase";
//import DrawSVGPlugin from "@lib/gsap-pro/DrawSVGPlugin";
import SplitText from "@lib/gsap-pro/SplitText";
import Plyr from 'plyr/src/js/plyr';
import ScrollTrigger from "gsap/ScrollTrigger";
//import LocomotiveScroll from '@lib/locomotive-scroll/src/locomotive-scroll';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);


/*
|
| Importing Components
|-----------------------
*/
import customGoogleMap from '@components/custom-google-map.js';
import MaterializeForm from '@components/materialize-form.js';
import Kira from '@components/kira.js';
import Menu from '@components/menu.js';
import Loader from '@components/loader.js';

/*
|
| Importing Utils
|-------------------
*/
import Router from '@utils/router.js';

/*
|
| Importing App files
|----------------------
*/
import * as app from '@components/global.js';
import main from '@pages/main.js';
//import home from '@pages/home.js';
import news from '@pages/news.js';
import animations from '@pages/animations.js';
import contact from '@pages/contact.js';

/*
|
| Routing
|----------
*/
const routes = new Router([
    {
        'file': animations,
        'dependencies': [app, gsap, ScrollTrigger, CustomEase, Menu, Kira,  Loader, Swiper]
    },
	{
		'file': main, 
		'dependencies': [app, gsap, Swiper, Plyr]
    },
    {
		'file': home, 
        'dependencies': [app, gsap, ScrollTrigger, MaterializeForm],
        'resolve': '#page-home'
    },
    {
		'file': product, 
		'dependencies': [app, gsap, ScrollTrigger],
		'resolve': '#page-product'
    },
    {
		'file': news, 
		'dependencies': [app],
		'resolve': '#page-news-archive'
    }
]);

/*
|
| Run
|------
*/
(($) => { routes.load() })(jQuery);
