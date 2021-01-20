export default {
	init: (app, gsap, Swiper, Plyr) => {
		/*
		|
		| Constants
		|-----------
		*/
        const 
            body = document.querySelector('body')
		;


        /*
		|
		| Swiper Images
		|----------------
        */
        const
            swiperImages = document.querySelectorAll('.swiper-images'),
            swiperImagesInstances = {};
        ;

        swiperImages.forEach(swiper => {
            const id = swiper.id;
            const swiperImagesContainer = swiper.querySelector('.swiper-container');
            const interleaveOffset = swiper.dataset.interleaveOffset ? swiper.dataset.interleaveOffset : 0.7;
            const speed = swiper.dataset.speed ? parseInt(swiper.dataset.speed) : 1000;

            const swiperInstance = new Swiper(swiperImagesContainer, {
                slidesPerView: 1,
                spaceBetween: 0,
                speed: speed,
                pagination: {
                    el: swiper.querySelector('.swiper-images-pagination'),
                    type: 'bullets',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `
                            <span class = "`+ className + `" >
                                <span class="item-bullet"></span>
                                <span class="item-circle"></span>
                            </span>`;
                    }
                },
                navigation: {
                    prevEl: swiper.querySelector('.arrow-left'),
                    nextEl: swiper.querySelector('.arrow-right')
                },
                watchSlidesProgress: true,
                on: {
                    progress: function () {
                        const swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            const slideProgress  = swiper.slides[i].progress;
                            const innerOffset    = swiper.width * interleaveOffset;
                            const innerTranslate = slideProgress * innerOffset;

                            swiper.slides[i].querySelector('.slide-inner').style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
                        }
                    },
                    touchStart: function () {
                        const swiper = this;

                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = '';
                        }
                    },
                    setTransition: function (speed) {
                        const swiper   = this;
                        const cssSpeed = `transform ${speed}ms`;

                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = cssSpeed;
                            swiper.slides[i].querySelector('.slide-inner').style.transition = cssSpeed;
                        }
                    }
                }
            });

            if(id){
                swiperImagesInstances[id] = swiperInstance;
            }
        });

        
        /*
        |
		| Swiper Images : Home
		|-----------------------
        */
        if(swiperImagesInstances.hasOwnProperty('swiper-home')){
            const swiperHome = swiperImagesInstances['swiper-home'];
            const firstSlide = document.querySelector('.item-si-content-0');

            registerSlideTimeline(firstSlide, document.querySelector('#swiper-home .swiper-slide'));

            body.addEventListener('loader:end', () => {
                firstSlide.timeline.play();
            }, false)

            swiperHome.on('slideChange', () => {
                const index = swiperHome.realIndex;
                const slide = swiperHome.slides[index];
                const currentContent = document.querySelector(`.item-si-content-${index}`);

                $(`.item-si-content:not(.item-si-content-${index})`).removeClass('active')
                $(`.item-si-content-${index}`).addClass('active')

                if(currentContent.hasOwnProperty('timeline')){
                    currentContent.timeline.seek(0).pause()
                } else {
                    registerSlideTimeline(currentContent, slide);
                }

                currentContent.timeline.play();
            });

            
            function registerSlideTimeline(selector, slide){
                const timeline = gsap.timeline({ paused: true })
                
                const image = selector.querySelector('.item-title');
                const title = selector.querySelector('.item-title');
                
                timeline
                    .fromTo(slide.querySelector(`.slide-image`), 2.6, { scale: 1.4 }, { scale: 1, ease: 'easeSmooth' }, 'start')
                    .fromTo(title.querySelectorAll(`.item-line > div, .item-line > em, .item-line > span`), 1.35, { y: '101%' }, { y: '0%', ease: 'easeSmooth' }, 'start+=0.5')
                    .fromTo(selector.querySelector(`.item-link`), 1.2, { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: 'easeSmooth' }, 'start+=0.8')

                selector.timeline = timeline;
            }
        }



        /*
        |
		| Swiper Images : Home
		|-----------------------
        */
        if(swiperImagesInstances.hasOwnProperty('swiper-services')){
            const swiperServices = swiperImagesInstances['swiper-services'];
            const servicesItems = document.querySelectorAll('.item-service');
            const counter = document.querySelector('.item-counter span');

            swiperServices.on('slideChange', () => {
                const index = swiperServices.realIndex;
                const slide = swiperServices.slides[index];
                const currentService = document.querySelector(`.item-service-${index}`);

                $(`.item-service:not(.item-service-${index})`).removeClass('active');
                $(`.item-service-${index}`).addClass('active');

                counter.innerHTML = `0${index + 1}`
                // if(currentContent.hasOwnProperty('timeline')){
                //     currentContent.timeline.seek(0).pause()
                // } else {
                //     registerSlideTimeline(currentContent, slide);
                // }

                //currentContent.timeline.play();
            });

            servicesItems.forEach(item => {
                item.addEventListener('click', () => {
                    const index = item.dataset.slideIndex;

                    swiperServices.slideTo(index);
                }, false);
            });
        }



        /*
		|
		| Swiper Categories
		|--------------------
        */
        const
            sectionCategories = document.querySelector('#section-categories'),
            swiperCategories = document.querySelector('.swiper-categories')
        ;

        if(swiperCategories !== null){
            const slidesPerView = swiperCategories.querySelectorAll('.swiper-slide').length > 4 ? 4.2 : 4;

            const swiperInstance = new Swiper('.swiper-categories .swiper-container', {
                slidesPerView: 4.2,
                spaceBetween: 30,
                speed: 600,
                navigation: {
                    prevEl: sectionCategories.querySelector('.arrow-left'),
                    nextEl: sectionCategories.querySelector('.arrow-right')
                },
                breakpoints: {
                    1: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    520: {
                        slidesPerView: 1.8,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: 30,
                    },
                    992: {
                        slidesPerView: 3.5,
                        spaceBetween: 30,
                    },
                    1400: {
                        slidesPerView: slidesPerView,
                        spaceBetween: 30,
                    }
                }
            })
        }




        /*
		|
		| Swiper Team
		|--------------
        */
        const
            sectionTeam = document.querySelector('#section-team'),
            swiperTeam = document.querySelector('.swiper-team')
        ;

        if(swiperTeam !== null){
            const initialSlide = swiperTeam.querySelectorAll('.swiper-slide').length > 1 ? 1 : 0;

            const swiperInstance = new Swiper('.swiper-team .swiper-container', {
                slidesPerView: 2.6,
                initialSlide: initialSlide,
                spaceBetween: 30,
                centeredSlides: true,
                speed: 600,
                pagination: {
                    el: swiperTeam.querySelector('.swiper-images-pagination'),
                    type: 'bullets',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `
                            <span class = "`+ className + `" >
                                <span class="item-bullet"></span>
                                <span class="item-circle"></span>
                            </span>`;
                    }
                },
                breakpoints: {
                    1: {
                        slidesPerView: 1.2,
                        spaceBetween: 15,
                    },
                    520: {
                        slidesPerView: 1.8,
                        spaceBetween: 30,
                    },
                    992: {
                        slidesPerView: 2.6,
                        spaceBetween: 30,
                    },
                }
            });
        }

 


        /*
		|
		| UI Accordion
		|---------------
        */
        const accordionToggle = document.querySelectorAll('.ui-accordion .item-a-heading');

        accordionToggle.forEach(toggle => {
            const item    = toggle.closest('.item-a');
            const content = item.querySelector('.item-a-content');

            toggle.addEventListener('click', () => {
                item.classList.toggle('a-active');

                if(!item.classList.contains('active')){
                    item.classList.add('active');
                }
                
                if(!item.hasOwnProperty('timeline')){
                    const timeline = gsap.timeline({ 
                        paused: true, 
                        onComplete: () => app.updateLocomotiveScroll(),
                        onReverseComplete: () => app.updateLocomotiveScroll()
                    });
                    
                    timeline
                        .fromTo(content, 0.8, { height: 0 }, { height: content.offsetHeight, ease: 'easeCustom' })
                        .from(content.querySelector('.item-a-inner'), 0.6, { opacity: 0, x: 10, ease: 'Sine.easeOut' }, '-=0.4')

                    item.timeline = timeline
                }

                if(item.timeline.totalProgress() > 0){
                    item.timeline.timeScale(2).reverse();
                } else {
                    item.timeline.timeScale(1).play();
                }
            }, false);
        });


        


        /*
		|
		| Videos
		|---------
        */
        const $customPlyrVideo = $('.custom-plyr-video');
        $.each($customPlyrVideo, function (){
            const $video       = $(this);
            const $videoPoster = $video.find('.item-poster');
            const $videoIcon   = $video.find('.item-play-icon');
            const videoId      = $video.data('id');
            const type         = $video.data('type');
            let player = new Plyr(`#${videoId}`);

            // const player = new Plyr(`#${videoId}`, {
            //     autoplay: true
            // });
            // player.volume = 0;

            $(`#${videoId}`).addClass('custom-plyr-video');

            const timeline = gsap.timeline({
                paused: true,
                onStart: () => {

                },
                onComplete: () => {
                    $videoIcon.addClass('pe-n');
                    $videoPoster.addClass('pe-n');
                },
                onReverseComplete: () => {
                    $videoIcon.removeClass('pe-n');
                    $videoPoster.removeClass('pe-n');
                }
            });

            timeline
                .to($videoIcon.find('.item-icon'), 0.4, { opacity: 0, scale: 0.5, ease: 'Power0.easeNone' }, 'start')
                .to($videoPoster, 0.6, { opacity: 0, ease: 'Power1.easeOut' }, '-=0')


            $videoIcon.on('click', () => {
                if (timeline.totalProgress() > 0) {
                    player.pause();
                } else {
                    player.play();
                }
            });

            if (type == "file"){
                timeline.play();
            }

            player.on('play', () => { timeline.timeScale(1).play(); });
            player.on('pause', () => { timeline.timeScale(1.2).reverse(); });
        });
	}
}