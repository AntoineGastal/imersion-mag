export default {
    init: (app, TweenMax, Howl, Howler) => {

		/*
		|
		| Constants
		|-----------
		*/
        const 
            $play = $('#play'),
            $open = $('#open'),
            $close = $('#close')
        ;
        console.log('immersion.js vue');  

             /*
		|
		| Player Audio
		|-----------------
		*/
        var sound = new Howl({
            src: ['https://www.imersion.io/wp-content/themes/yagami-adveris/web/src/img/global/1.mp3'],
            html5: true, // A live stream can only be played through HTML5 Audio.
            format: ['mp3', 'aac']
        });
        var testPlay = new Audio().play();
        if (testPlay && typeof Promise !== 'undefined' && (testPlay instanceof Promise || typeof testPlay.then === 'function')) {
            testPlay.catch(function() {
            console.warn('HTML5 Audio pool exhausted, returning potentially locked audio object.');
            });
        }
        
        //$( document ).ready(function() {
        $play.on('click', () => {
        sound.play();
        console.log('Sound play ok!');
        });
        
        document.body.style.overflow = "scroll";
        

        /*
		|
		| Panel Imersion info animations
		|-----------------
        */
        
        // Open button 
        $open.on('click', () => {
            console.log('clic open');        
            var tlopen = new TimelineLite();
            tlopen
            .to("#title", 0, {display: "none"})
            .to("#immersion-info", 0, {display: ""})
            .to("#immersion-info", 1, {height: "300", ease: Power4.easeInOuteaseInOut})
            .to(".infos", 0.5, {opacity: 1})
            .to("#open", 0, {display: "none"})
            .to("#close", 0, {display:"" })
            ;
        });
        // Close button 
        $close.on('click', () => {
            console.log('clic open');        
            var tlopen = new TimelineLite();
            tlopen
            .to(".infos", 0.5, {opacity: 0})
            .to("#immersion-info", 1, {height: "0", padding:"0", ease: Power4.easeInOuteaseInOut })
            .to("#immersion-info", 0, {display: "none"})
            .to("#close", 0, {display: "none"})
            .to("#title", 0, {display: ""})
            .to("#open", 0, {display:""})
            ;
        }); 

    }
}