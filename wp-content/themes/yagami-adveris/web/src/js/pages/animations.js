export default {
	init: (app, gsap, ScrollTrigger, CustomEase, Menu, Kira, LocomotiveScroll, Loader, Swiper) => {
		/*
		|
		| Constants
		|-----------
		*/
        const 
            html                    = document.querySelector('html'),
            body                    = document.querySelector('body'),
            scrollContainerSelector = '[data-scroll-container]',
            pageLoader              = document.querySelector('#page-loader'),
            splitItems              = document.querySelectorAll('[data-splittext]'),
            loaderAnimatedSvg       = document.querySelector('#page-loader .item-logo svg:nth-child(2)'),
            loaderLogo              = pageLoader.querySelector('.item-logo'),
            scrollAreas             = document.querySelectorAll('.scroll-area')
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
        splitItems.forEach( item => {
            const type = item.dataset.splittext ? item.dataset.splittext : 'words, chars';
            const split = new SplitText(item, { type: type, linesClass: 'item-line', wordsClass: 'item-word', charsClass: 'item-char' });

            item['split'] = split;
        });
        body.addEventListener('loader:end', () => splitItems.forEach( splitItem => splitItem.classList.add('split-ready') ), false);




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
        let loaderProgress = { percentage: 0 };
        const loader = new Loader(pageLoader, {
            useWindowLoad: false,
            onProgress: () => {},
            onLoad: () => {
                app.dispachEvent(body, 'dom:ready');
            }
        });

        loader.loaderTimeline
            .to(loaderProgress, 1.6, { percentage: 100, ease: 'Power1.easeOut', onUpdate: () => {
                loaderAnimatedSvg.style.clipPath = `polygon(0% 0%, ${loaderProgress.percentage}% 0%, ${loaderProgress.percentage}% 100%, 0% 100%)`;
            } }, 'start')
            .to(loaderLogo, 0.8, { y: -100, ease: 'Power1.easeOut' }, 'logo-=0')
            .to(loaderLogo, 0.4, { opacity: 0, ease: 'Power1.easeOut' }, 'logo-=0')
            .to(pageLoader.querySelector('.layer.above'), 1.6, { scaleY: 0,  ease: 'Expo.easeInOut'}, 'step2-=0.8')
            .to(pageLoader.querySelector('.layer.behind'), 1.6, { scaleY: 0,  ease: 'Expo.easeInOut'}, 'step2-=0.74')
            .call(() => { app.dispachEvent(body, 'loader:end') }, null, 'step2-=0.4')

        loader.init();

        


        /*
		|
		| Handle Locomotive Scroll
		|---------------------------
        */
        window.locomotive = new LocomotiveScroll({
            el: document.querySelector(scrollContainerSelector),
            smooth: true,
            inertia: .7,
            mouseMultiplier: 0.3,
            // tablet: {
            //     smooth: true
            // },
            // smartphone: {
            //     smooth: true
            // }
        });
        
        window.locomotive.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(scrollContainerSelector, {
            scrollTop(value) {
                return arguments.length ? window.locomotive.scrollTo(value, 0, 0) : window.locomotive.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            },
            pinType: document.querySelector(scrollContainerSelector).style.transform ? "transform" : "fixed"
        });
        
        body.addEventListener('dom:ready', () => {
            html.classList.add('loaded');
            app.updateLocomotiveScroll();
            app.dispachEvent(body, 'locomotive:initialized');
        }, false);




        /*
		|
		| Menu
		|-------
        */
        const
            menuWrapper         = document.querySelector('#mobile-menu'),
            menuButton          = document.querySelector('#header .btn-menu'),
            menuBars            = menuButton.querySelectorAll('.item-burger > span'),
            menuStaggerItems    = menuWrapper.querySelectorAll('[data-stagger-item]'),
            menuItemHasChildren = menuWrapper.querySelectorAll('.menu-item-has-children'),
            $menuItems          = $('#mobile-menu .item-menu');
        ;
        const menu = new Menu(menuWrapper, menuButton, { reverseTimeScale: 2 });

        menu.menuTimeline
            .to(menuBars[1], 0.3, { autoAlpha: 0 }, 'start')
			.to(menuBars[0], 0.5, { x: 0, y: 8, rotation: 45, ease: 'Power1.easeOut' }, 'start')
            .to(menuBars[2], 0.5, { x: 0, y: -8, rotation: -45, ease: 'Power1.easeOut' }, 'start')
			.to(menuWrapper, 0.5, { autoAlpha: 1, ease: 'Power1.easeOut' }, 'start+=0.3')
            .staggerFrom(menuStaggerItems, 0.6, { autoAlpha: 0, x: 20, ease: 'Power1.easeOut' }, '0.1', '+=0')
        
        menu.init();

        menuWrapper.addEventListener('menu:open', () => { 
            app.stopLocomotiveScroll();
            body.classList.add('o-h');
        }, false)
        menuWrapper.addEventListener('menu:closed', () => { 
            app.startLocomotiveScroll();
            body.classList.remove('o-h');
        }, false)

        menuItemHasChildren.forEach(item => {
            item.addEventListener('click', li => {
                const $li = $(li);
                const $submenu = $li.find('> .submenu');

                $submenu.slideToggle(600);
            });
        });

        $menuItems.on('click', function(e){
            e.stopPropagation();
            
            const item = $(this);
            const isBack = item.hasClass('back-link');

            console.log('clicked')

            if(item.find('> .submenu').length){
                e.preventDefault();
                gsap.to(item.find('> .submenu'), 0.4, { x: '0%', ease: 'Power1.easeOut' }); 
            }
            
            if(isBack && item.closest('.submenu').length) {
                e.preventDefault();
                gsap.to(item.closest('.submenu'), 0.4, { x: '100%', ease: 'Power1.easeOut' });
            }
        });



        /*
        |
		| Header
		|--------
        */
        const header = document.querySelector('#header');
        const separator = header.querySelector('.item-h-separator');
        const separatorTimeline = gsap.timeline({ paused: true }).to(separator, 1.4, { scaleX: 1, delay: 0.3, ease: 'easeSmooth'})
        const hasChildren = document.querySelectorAll('.item-menu > .menu-item-has-children');

        hasChildren.forEach(item => {
            const timeline = gsap.timeline({ paused: true });
            const submenu = item.querySelector('.submenu-container');
            const submenuLayer = submenu.querySelector('.submenu-layer');
            
            timeline
                .fromTo(submenuLayer, 1.4, { skewX: -55, scaleX: 0 }, { skewX: 0, scaleX: 1.1, ease: 'easeSmooth' }, 'start')
                .staggerFrom(submenu.querySelectorAll('.submenu-col'), 1, { x: 15, opacity: 0, ease: 'Power1.easeOut' }, 0.08, '-=1');

            item.addEventListener('mouseover', () => {
                separatorTimeline.timeScale(1).play()
                submenu.classList.add('active');
                timeline.timeScale(1).play();
            }, false)

            item.addEventListener('mouseleave', () => {
                separatorTimeline.seek(0).pause()
                submenu.classList.remove('active');
                timeline.timeScale(1.5).reverse();
            }, false)
        });



        /*
        |
		| Header: Sticky
		|-----------------
        */
        const headerInner = header.querySelector('#header-inner')
        ScrollTrigger.create({
            trigger: '#header',
            pin: true,
            start: 'top top',
            endTrigger: '#footer',
            pinSpacing: false,
            scroller: scrollContainerSelector
        })
        ScrollTrigger.create({
            trigger: 'body',
            start: () => header.clientHeight,
            endTrigger: '#footer',
            scroller: scrollContainerSelector,
            onEnter: () => {
                gsap.to(headerInner, 0.4, { y: `-100%`, ease: 'Sine.out', onComplete: () => {
                    headerInner.classList.add('sticky')
                    gsap.to(headerInner, 0.3, { y: '0%', ease: 'Sine.out'})
                } })
                
                console.log(headerInner.clientHeight, 'onEnter')
            },
            onLeaveBack: () => {
                gsap.to(headerInner, 0.3, { y: `-100%`, ease: 'Sine.out', onComplete: () => {
                    //gsap.set(headerInner, {y: `-100%`, opacity: 1})
                    headerInner.classList.remove('sticky');
                    gsap.to(headerInner, 0.4, { y: '0%', ease: 'Sine.out', delay: 0.1})
                } })
                
                console.log('onLeaveBack')
            }
        });
        



        /*
        |
		| Kira
		|-----------
        */
        const kira = new Kira({            
            loadEvent: [body, 'loader:end'],
            scrollTrigger: {
                markers: false,
                scroller: scrollContainerSelector,
            },
            tweenParams: {
                start: '-=0.6'
            }
        });

        /*
        | fadeInUp
        |-----------
        */
        kira.add('fadeInUp', (item, timeline, start) => {
            timeline.fromTo(item, 1.3, { y: 50 }, { y: 0, autoAlpha: 1, ease: 'easeSmooth' }, start)
        });

        /*
        | fadeInUp.parallax.sm
        |-----------------------
        */
        kira.add('fadeInUp.parallax', (item, timeline, start) => {
            timeline.fromTo(item, 0.8, { y: 100 }, { y: 0, autoAlpha: 1, ease: 'Sine.easeOut' }, start)
        });

        /*
        | splitline
        |------------
        */
        kira.add('splitline', (item, timeline, start) => {
            const delay = item.dataset.delay ? item.dataset.delay : 0.012;

            item.querySelectorAll('.item-line').forEach( line => {
                timeline.from($(line).find('> div, > em, > span'), 1.35, { y: '101%', ease: 'easeSmooth' }, start)
            } )
        });

        /*
        | splittext.long
        |-----------------
        */
        kira.add('splittext.long', (item, timeline, start) => {
            const delay = item.dataset.delay ? item.dataset.delay : 0.01;

            timeline.staggerFrom(item.split.chars, 0.8, {y: 5, opacity: 0, ease: 'Sine.ease0ut' }, delay, start)
        });

        /*
        | fadeInLeft.parallax.sm
        |-------------------------
        */
        kira.add('fadeInLeft.stagger.sm', ($item, timeline, start) => {
            timeline.staggerFromTo($item.querySelectorAll('[data-stagger-item]'), 0.6, { x: 20 }, { opacity: 1, x: 0, ease: 'Power1.easeOut' }, '0.1', start)
        });

        /*
        | fadeInUp.parallax.sm
        |-------------------------
        */
        kira.add('fadeInUp.stagger.sm', ($item, timeline, start) => {
            timeline.staggerFromTo($item.querySelectorAll('[data-stagger-item]'), 1, { x: 20 }, { opacity: 1, x: 0, ease: 'Power1.easeOut' }, '0.05', start)
        });

        kira.init();
	}
}