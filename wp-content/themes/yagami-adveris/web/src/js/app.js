/*
|
| Importing Libs 
|------------------
*/

//import Swiper from 'swiper/js/swiper.min';
import { TweenMax } from "gsap/TweenMax";
import DrawSVGPlugin from "@lib/gsap-pro/DrawSVGPlugin";
import SplitText from "@lib/gsap-pro/SplitText";
import CustomEase from "@lib/gsap-pro/CustomEase";
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
import 'scrollmagic/scrollmagic/uncompressed/plugins/jquery.ScrollMagic.js';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';
import ScrollMagic from 'scrollmagic';
import LocomotiveScroll from 'locomotive-scroll';
import barba from '@barba/core';

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
import Loader from '@components/loader.js';


/*
|
| Importing App files
|----------------------
*/
import * as app from '@components/global.js';
import main from '@pages/main.js';
import animations from '@pages/animations.js';
import home from '@pages/home.js';
import contact from '@pages/contact.js';
import news from '@pages/news.js';
import immersions from '@pages/immersions.js';


/*
|
| Barba
|---------
*/
import BarbaRouter from './barba/router.js';
import Home from './barba/views/home.js';
import barbaManager from './barba/manager.js';


/*
|
| barbaRouter
|--------------
*/
const barbaRouter = new BarbaRouter({
    global: [
        {
            'file': animations,
            'dependencies': [app, Loader, Menu, Kira, ScrollMagic, CustomEase, DrawSVGPlugin, TweenMax]
        }, {
            'file': main,
            'dependencies': [app, CookieManager]
        },
    ],

    routes: [
        {
            'namespace': 'pages_page-home',
            'file': home,
            'dependencies': [app, Kira],
            'view': Home
        },
        {
            'namespace': 'templates_contact',
            'file': contact,
            'dependencies': [app, MaterializeForm, customGoogleMap],
        },
        {
            'namespace': 'immersions_single',
            'file': immersions,
            'dependencies': [app],
        },
        {
            'namespace': 'news_archive',
            'file': news,
            'dependencies': [app],
        }
    ]
});

barbaManager.init(app, barba, barbaRouter, LocomotiveScroll);