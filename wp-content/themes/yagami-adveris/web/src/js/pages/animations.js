export default {
	init: (app, Loader, Menu, Kira, ScrollMagic, CustomEase, DrawSVGPlugin) => {
		/*
		|
		| Constants
		|-----------
		*/
        const 
            $body             = $('body'),
            $siteContainer = $('.site-container'),
            $pageLoader       = $('.page-loader'),
            $loaderLogo       = $pageLoader.find('.item-logo'),
            $loaderCircle     = $pageLoader.find('.loader-circle'),
            $loaderCircleSvg  = $loaderCircle.find('circle'),
            $loadertext       = $pageLoader.find('.item-percentage span'),
            $menuWrapper      = $('#mobile-menu'),
            $menuButton       = $('#header .btn-menu'),
            $menuBars         = $menuButton.find('.item-burger > span'),
            $menuStaggerItems = $menuWrapper.find('[data-stagger-item]')
		;
		

		/*
		|
		| Easings
		|----------
        */
		CustomEase.create("easeCustom", "M0,0 C0.4,0 0.2,1 1,1")
		CustomEase.create("easeSmooth", "M0,0 C0.19,1 0.22,1 1,1")
		CustomEase.create("easeCustomPower1", "M0,0 C0.165,0.84 0.44,1 1,1")

        
        /*
		|
		| Loader
		|---------
        */
        if(!$body.hasClass('barba-sync-loaded')){
            const logoCircleHeight = ($loaderCircle.outerHeight() + parseInt($loaderCircle.css('margin-bottom'))) / 2;
            TweenMax.set($loaderCircleSvg, { drawSVG: "0% 0%", ease: Linear.easeOut });
            $loaderCircleSvg.addClass('ready');
            
            const loader = new Loader($pageLoader, {
                useWindowLoad: false,
                onProgress: progress => {
                    const roundProgress = Math.round(progress);

                    TweenMax.to($loaderCircleSvg, 0.3, { drawSVG: `0% ${roundProgress}%`, ease: Power0.easeNone });
                    $loadertext.text(roundProgress)
                }, 
                onLoad: () => {
                    $loadertext.text(100);
                }
            });

            loader.loaderTimeline
                .to($loaderCircleSvg, 0.8, { drawSVG: "0% 100%", ease: Power1.easeOut })
                .to($loaderCircle, 0.4, { y: -logoCircleHeight, autoAlpha: 0, ease: Power1.easeOut }, 'step1')
                .to($loaderLogo, 0.4, { y: -logoCircleHeight, opacity: 1, ease: Power1.easeOut }, 'step1')
                .to($loaderLogo, 0.4, { y: '-=80', opacity: 0, ease: Power1.easeOut }, '-=0')
                .to($pageLoader, 1, {scaleY: 0, ease: Expo.easeInOut}, 'step2-=0.3')
                .from($siteContainer, 1, { y: 100, ease: Expo.easeOut }, 'step2+=0.1')
                .addCallback(() => { app.dispachEvent($body, 'loader:end'); $('html').addClass('loaded') }, 'step1')
                .to($pageLoader, 0.8, { autoAlpha: 0, ease: Power1.easeOut }, '-=0')

            loader.init();
        }


        /*
		|
		| Menu
		|-------
        */
        const menu = new Menu($menuWrapper, $menuButton, {
            reverseTimeScale: 2
        });

        menu.menuTimeline
            .to($menuBars.eq(1), 0.4, { autoAlpha: 0 }, 'start')
			.to($menuBars.eq(0), 0.5, { x: 0, y: 8, rotation: 45, ease: Power1.easeOut }, 'start')
            .to($menuBars.eq(2), 0.5, { x: 0, y: -8, rotation: -45, ease: Power1.easeOut }, 'start')
			.to($menuWrapper, 0.5, { autoAlpha: 1, ease: Power1.easeOut }, 'start+=0.3')
            .staggerFrom($menuStaggerItems, 0.6, { autoAlpha: 0, x: 20, ease: Power1.easeOut }, '0.1', '+=0')
        
        menu.init();

        /*
		|
		| Kira
		|-------
        */
        const kira = new Kira(ScrollMagic, {
            debug: false,
            loadEvent: {
                domElement: $body,
                eventName: 'loaderEnd'
            },
            optimize: true,
            options: {
                start: '-=0.6',
                triggerHook: 'onEnter'
            }
        });

        /*
		| fadeInUp.parallax.sm
		|-----------------------
        */
        kira.add('fadeInUp', ($item, timeline, start) => {
            timeline.from($item, 0.8, { y: 30, autoAlpha: 0, ease: Power1.easeOut }, start)
        });
        
        /*
		| fadeInUp.parallax.sm
		|-----------------------
        */
        kira.add('fadeInUp.parallax.sm', ($item, timeline, start) => {
            timeline.from($item, 0.8, { y: 100, autoAlpha: 0, ease: Sine.easeOut }, start)
        });

        /*
		| fadeInUp.parallax
		|--------------------
        */
        kira.add('fadeInUp.parallax', ($item, timeline, start) => {
            timeline.from($item, 1, { y: 80, autoAlpha: 0, ease: Power1.easeOut }, start)
        });

        /*
		| fadeInUp.parallax.sm
		|-----------------------
        */
        kira.add('fadeInLeft.stagger.sm', ($item, timeline, start) => {
            timeline.staggerFrom($item.find('[data-stagger-item]'), 0.6, { autoAlpha: 0, x: 20, ease: Power1.easeOut }, '0.1', start)
        });

        kira.add('fadeInUp.stagger.sm', ($item, timeline, start) => {
            timeline.staggerFrom($item.find('[data-stagger-item]'), 0.6, { autoAlpha: 0, y: 20, ease: Power1.easeOut }, '0.1', start)
        });

        /*
		| fadeInUp.parallax
		|--------------------
        */
        kira.add('scaleX', ($item, timeline, start) => {
            timeline.from($item, 1, { scaleX: 0, transformOrigin: 'left top', ease: Expo.easeInOut }, start)
        });

        kira.init();
	}
}