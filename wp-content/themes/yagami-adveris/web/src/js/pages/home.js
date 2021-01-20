export default {
    init: (app, gsap, ScrollTrigger, MaterializeForm) => {
        /*
        |
        | Constants
        |------------
        */
        const
            body                    = document.querySelector('body'),
            $contactForm            = $('.contact-form'),
            scrollContainerSelector = '[data-scroll-container]'
        ;


        /*
        |
        | Marquee
        |----------
        */
        const brandsMarquee = document.querySelector('.brands-markee');

        if(brandsMarquee !== null){
            const inner = brandsMarquee.querySelector('.bm-inner');
            const speed = inner.clientWidth / 150;

            const timeline = gsap.timeline({
                onComplete: () => {
                    timeline.restart();
                },
                scrollTrigger: {
                    trigger: '.brands-markee',
                    start: 'top bottom',
                    toggleActions: 'play pause resume reset',
                    scroller: scrollContainerSelector
                    //markers: true
                }
            });

            timeline.to(inner, speed, { x: -1 * (inner.clientWidth - window.innerWidth), ease: 'none' });

            brandsMarquee.querySelectorAll('.item').forEach(item => {
                item.addEventListener('mouseover', () => {
                    console.log('over')
                    timeline.pause()
                }, false);
                item.addEventListener('mouseout', () => {
                    console.log('out')
                    timeline.play()
                }, false);
            });
        }


        /*
        |
        | Brands list
        |--------------
        */
        const
            brandsList       = document.querySelector('.brands-list'),
            toggleBrandsList = document.querySelector('.toggle-brands-list'),
            brandsSeparator  = document.querySelector('.brands-separator')
        ;

        if(brandsList !== null){
            const timeline = gsap.timeline({ 
                paused: true, 
                onComplete: () => app.updateLocomotiveScroll(),
                onReverseComplete: () => app.updateLocomotiveScroll()
            });

            timeline
                .from(brandsSeparator, 0.8, { height: 0, ease: 'Power1.out' }, 'start')
                .from(brandsList, 1, { height: 0, ease: 'Expo.easeInOut' }, '-=0.8')
                .from(brandsList.querySelector('.item-row'), 1, { opacity: 0, x: 10, ease: 'Power1.easeOut' }, '-=0.4')


            toggleBrandsList.addEventListener('click', () => {
                if(timeline.totalProgress() > 0){
                    timeline.timeScale(1).reverse();
                } else {
                    timeline.timeScale(1).play();
                }
            }, false);
        }


        /*
		|
		| Materialize form
		|-------------------
        */
        new MaterializeForm($contactForm, {
            selectors: {
                group: '.gfield',
                label: '.gfield_label',
                input: '.ginput_container_text input, .ginput_container_email input'
            },
            labelEffect: {
                duration: 0.3,
                ease: 'Power1.out'
            }
        });
        
    }
}