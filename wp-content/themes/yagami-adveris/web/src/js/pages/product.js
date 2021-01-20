export default {
    init: (app, gsap, ScrollTrigger) => {

        /*
        |
        | Constants
        |------------
        */
        const
            body = document.querySelector('body'),
            addToCart = document.querySelectorAll('.single_add_to_cart_button'),
            scrollContainerSelector = '[data-scroll-container]'
        ;
        
        /*
        |
        | Added To Cart: Watcher
        |-------------------------
        */
        let addedToCartIntervalId = null;

        addToCart.forEach(button => {
            button.addEventListener('click', () => {
                if(!button.classList.contains('disabled')){
                    if(document.querySelector('.cart .added_to_cart') !== null){
                        document.querySelector('.cart .added_to_cart').remove();
                    }

                    addedToCartIntervalId = setInterval(() => {
                        if(document.querySelector('.cart .added_to_cart') !== null){
                            clearInterval(addedToCartIntervalId);
                            app.dispachEvent(body, 'addedToCart');
                        } 
                    }, 500);
                }
                
            }, false);
        })

        


        /*
        |
        | Added To Cart: Handling
        |--------------------------
        */
        const notification = document.querySelector('.added-to-cart-notification');
        const notificationClose = document.querySelector('.item-atcn-close');
        const timelineNotification = gsap.timeline({ paused: true, onReverseComplete: () => notification.classList.remove('active') });

        timelineNotification.fromTo(notification, 1, { x: 100 }, { x: 0, opacity: 1, ease: 'easeSmooth' });

        body.addEventListener('addedToCart' , () => {
            notification.classList.add('active');
            timelineNotification.timeScale(1).play();
        }, false);

        notificationClose.addEventListener('click', () => { console.log('e'); timelineNotification.timeScale(2).reverse() }, false);


        /*
        |
        | Added To Cart: Fixed
        |-------------------------
        */
        const fixedAddToCart = document.querySelector('#section-fixed-add-to-cart');
        const btnToggleCart = fixedAddToCart.querySelector('.btn-toggle-cart');
        const toggleTimeline = gsap.timeline({ paused: true });

        toggleTimeline.to(fixedAddToCart, 0.8, { y: 0, ease: 'easeSmooth' });

        if (fixedAddToCart !== null) {
            const y = window.innerWidth > 992 ? 0 : '-=60px';

            gsap.to(fixedAddToCart, 0.4, { y: y, ease: 'Power1.easeOut', scrollTrigger: {
                trigger: '#trigger-fixed-add-to-cart',
                start: 'bottom top',
                toggleActions: 'play none none reverse',
                scroller: scrollContainerSelector,
                onLeaveBack: ({progress, direction, isActive}) => { 
                    toggleTimeline.seek(0).pause();
                    btnToggleCart.classList.remove('active');
                    btnToggleCart.innerHTML = btnToggleCart.dataset.showText;
                }
            } });

            btnToggleCart.addEventListener('click', () => {
                btnToggleCart.classList.toggle('active');

                btnToggleCart.innerHTML = btnToggleCart.classList.contains('active') ? btnToggleCart.dataset.hideText : btnToggleCart.dataset.showText;

                if(toggleTimeline.totalProgress() > 0){
                    toggleTimeline.reverse();
                } else {
                    toggleTimeline.play();
                }
                
            }, false);
        }
    }
}