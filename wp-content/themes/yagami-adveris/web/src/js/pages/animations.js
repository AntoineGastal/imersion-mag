export default {
	init: (app, Menu, Kira, ScrollMagic, CustomEase) => {
		/*
		|
		| Constants
		|-----------
		*/
        const 
            $body             = $('body'),
            $pageLoader       = $('.page-loader'),
            scrollAreas       = document.querySelectorAll('.scroll-area'),
            $splitItems       = $body.find('[data-splittext]'),
            $menuWrapper      = $('#mobile-menu'),
            $menuButton       = $('#header .btn-menu'),
            $menuBars         = $menuButton.find('.item-burger > span'),
            $menuClose        = $menuWrapper.find('.item-close'),
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
        CustomEase.create("easeExpo", "M0, 0 C1, 0 0, 1 1, 1")

        /*
		|
		| SplitText
		|------------
        */
        $.each($splitItems, function() {
            const $item = $(this);
            const type = $item.data('splittext') ? $item.data('splittext') : 'words, chars';
            const split = new SplitText($item, { type: type, linesClass: 'item-line', wordsClass: 'item-word', charsClass: 'item-char' });

            $item[0]['split'] = split;
        });

        $body.on('loaderEnd', () => {
            $splitItems.addClass('split-ready')
        } )
		

		/*
        |
        | Scroll Areas
        |---------------
        */
		Array.prototype.forEach.call(scrollAreas, element => {
			Scrollbar.init(element);
		});


        /*
		|
		| Loader
		|---------
        */
        if (sessionStorage.getItem('loaded_once') === null) {
            sessionStorage.setItem('loaded_once', 'loaded_once');
        } 
        
        if ($pageLoader.hasClass('active')){
            const loaderTl = gsap.timeline({ paused: true, /*onComplete: () => $pageLoader.remove()*/ });

            loaderTl.to($pageLoader.find('.item-loadbar-inner'), 0.4, { scaleX: 1, ease: Power0.easeNone }, 'start')
            loaderTl.to($pageLoader.find('.item-content'), 0.8, { autoAlpha: 0, ease: Power1.easeOut }, '-=0')
            loaderTl.addCallback(() => { app.dispachEvent($body, 'loaderEnd'); })
            loaderTl.to($pageLoader, 0.8, { autoAlpha: 0, ease: Power1.easeOut }, '-=0')

            $(window).on('load', function () {
                loaderTl.play();
            });
        } else {
            $(window).on('load', function(){
                app.dispachEvent($body, 'loaderEnd');
            })
            
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
            .to($menuBars.eq(1), 0.3, { autoAlpha: 0 }, 'start')
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
		| fadeInUp
		|-----------
        */
        kira.add('fadeInUp', ($item, timeline, start) => {
            timeline.fromTo($item, 1.3, { y: 50 }, { y: 0, autoAlpha: 1, ease: 'easeSmooth' }, start)
        });

        /*
		| fadeInUp.parallax.sm
		|-----------------------
        */
        kira.add('fadeInUp.parallax', ($item, timeline, start) => {
            timeline.fromTo($item, 0.8, { y: 100 }, { y: 0, autoAlpha: 1, ease: Sine.easeOut }, start)
        });

        /*
		| splitline
		|---------------
        */
        kira.add('splitline', ($item, timeline, start) => {
            const delay = $item.data('delay') ? $item.data('delay') : 0.012;

            $.each($item.find('.item-line'), function (key, value) {
                timeline.from($(this).find('> div, > em, > span'), 1.35, { y: '101%', ease: 'easeSmooth' }, start)
            });
        });

        /*
		| splittext.long
		|--------------------
        */
        kira.add('splittext.long', ($item, timeline, start) => {
            const delay = $item.data('delay') ? $item.data('delay') : 0.01;

            timeline.staggerFrom($item[0].split.chars, 0.8, {y: 5, opacity: 0, ease: Sine.ease0ut }, delay, start)
        });

        

        /*
		| fadeInUp.parallax.sm
		|-----------------------
        */
        kira.add('fadeInLeft.stagger.sm', ($item, timeline, start) => {
            timeline.staggerFromTo($item.find('[data-stagger-item]'), 0.6, {x: 20}, { autoAlpha: 1, x: 0, ease: Power1.easeOut }, '0.1', start)
        });

        kira.add('fadeInUp.stagger.sm', ($item, timeline, start) => {
            timeline.staggerFromTo($item.find('[data-stagger-item]'), 0.6, {y: 20}, { autoAlpha: 1, y: 0, ease: Power1.easeOut }, '0.1', start)
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