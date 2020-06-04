/*
|
| Importing Libs 
|------------------
*/ 
require('@lib/iziModal/js/iziModal.js')($); //désolé
//import Swiper from 'swiper/js/swiper.min';
import { TweenMax } from "gsap/TweenMax";
import SplitText from "@lib/gsap-pro/SplitText";
import ScrollTo from "gsap/ScrollToPlugin";
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
import 'scrollmagic/scrollmagic/uncompressed/plugins/jquery.ScrollMagic.js';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';
import ScrollMagic from 'scrollmagic';
import Scrollbar from 'smooth-scrollbar';
import LocomotiveScroll from 'locomotive-scroll';
//import * as THREE from 'three'; 

/*
|
| Importing Components
|-----------------------
*/
import CookieManager from '@components/cookie-manager';
import customGoogleMap from '@components/custom-google-map.js';
import MaterializeForm from '@components/materialize-form.js';
import Kira from '@components/kira.js';
import Menu from '@components/menu.js';
import MobileDetect from '@components/mobile-detect.js';

/*
|
| Importing Utils
|-------------------
*/
import '@utils/fa';
import Router from '@utils/router.js';

/*
|
| Importing App files
|----------------------
*/
import * as app from '@components/global.js';
import detection from '@pages/detection.js';
import main from '@pages/main.js';
import news from '@pages/news.js';
//import sample from '@pages/sample.js';
import contact from '@pages/contact.js';
import animations from '@pages/animations.js';

/*
|
| Routing
|---------- 
*/
const routes = new Router([
	{
		'file': main, 
		'dependencies': [app, CookieManager, TweenMax, LocomotiveScroll]
    },
    {
		'file': news, 
		'dependencies': [app],
		'resolve': '#page-news-archive'
    },
    {
      'file': detection, 
      'dependencies': [app, TweenMax, MobileDetect]
      },
    //{ 
		//'file': sample, 
		//'dependencies': [app],
		//'resolve': '#page-sample'
    //},
    { 
      'file': animations,
      'dependencies': [app, Menu, Kira, ScrollMagic, TweenMax, LocomotiveScroll, Scrollbar]
  },
    {
        'file': contact,
        'dependencies': [app, MaterializeForm, customGoogleMap],
        'resolve': '#page-contact'
    }
]);

/*
|
| Run
|------
*/
(($) => { routes.load() })(jQuery);
