export default {
    init: (app, barba, barbaRouter, LocomotiveScroll) => {
        barba.init({
            transitions: [{
                name: 'default-transition',
                sync: false, 
                beforeOnce() {},
                once() {},
                afterOnce(data) {
                    $('body').on('loader:end', () => {
                        app.initLocomotiveScroll(LocomotiveScroll);
                    });

                    barbaRouter.load(data.next.namespace);
                },
                beforeLeave() {
                    app.resetLocomotiveScroll();
                    document.body.style.overflow = 'hidden';
                    document.body.classList.add('barba-sync-loaded');
                },
                leave(data) {
                    document.querySelector('html').classList.remove('loaded');
                    const $container = $(data.current.container);
                    const $layer = $('.layer-transition');
                    
                    return new Promise((resolve, reject) => {
                        const timeline  = new TimelineMax({ paused: true, onComplete: () => resolve() });

                        timeline
                            //.to($container, 1, { y: -100, ease: Expo.easeIn }, 'start')
                            //.to($layer, 1, { scaleY: 1, transformOrigin: 'left bottom', ease: Expo.easeInOut }, 'start+=0.4');
                            .to($container, 3, { autoAlpha: 0,  ease: Expo.easeInOut }, 'start')
                            //.to($layer, 2, {autoAlpha: 1, ease: Expo.easeInOut })
                            ;

                        timeline.play()
                    });
                },
                afterLeave() {},
                beforeEnter() {},
                enter(data){
                    barbaRouter.load(data.next.namespace);
                    document.querySelector('html').classList.add('loaded');

                    const $layer = $('.layer-transition');
                    const timeline = new TimelineMax({
                        paused: true, 
                        onComplete: () => {
                            document.body.style.overflow = 'inherit';
                                app.initLocomotiveScroll(LocomotiveScroll);
                        }
                    });

                    timeline
                        //.to($layer, 1, { scaleY: 0, transformOrigin: 'left top', ease: Expo.easeInOut }, 'start')
                        //.from($layer, 2, { opacity: 1, height: "100%", ease: Expo.easeOut }, 'start')
                        .from($container, 3, { autoAlpha: 0,  ease: Expo.easeInOut })
                        .to($container, 3, { autoAlpha: 1,  ease: Expo.easeInOut })
                        //.to($layer, 0, { display: "", ease: Expo.easeInOut })
                        //.to($layer, 0, { autoAlpha: 1, ease: Expo.easeInOut })
                        //.to($layer, 2, { autoAlpha: 0, ease: Expo.easeInOut })
                        //.to($layer, 0, { display: "none", ease: Expo.easeInOut })
                        ;

                timeline.play();
                },
                afterEnter(data) {}
            }],
            views: barbaRouter.getViews(),
            timeout: 10000,
            debug: true
        });
    }
}