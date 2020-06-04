import { TweenMax, Power2 } from "gsap";

export default {
    init: (app, TweenMax) => {
        /*
        |
        | Constants
        |-----------
        */
        const 
        $body         = $('body'),
        $btnheadstart = $('#btn-head-start'),
        $btnheadstop = $('#btn-head-stop') 
        ;
        
        /*
        |
        | Actions on Detection panel 
        |-----------------
        */
        
        // Launch voice recognition    
        $("#voice-status").on('click', () => {
            console.log('clic mic start');        
            recognition.start();
            console.log('Ready to receive a voice command.');
            diagnosticshort.textContent = 'Listening...';
            var micicon = document.getElementById("mic");
            micicon.classList.add("blink");
        });
        
        // Starts Head recognition    
        $($btnheadstart).on('click', () => {
            console.log('clic head start');        
            handsfree.start();
            localStorage.setItem('head','start');
            var tlhead = new TimelineLite();
            tlhead.to("#btn-head-start", 0, {display: "none"})
            .to("#btn-head-stop", 0, {display: ""});
        });
        
        // Stops Head recognition
        $($btnheadstop).on('click', () => {
            console.log('clic head stop');        
            handsfree.stop();
            localStorage.setItem('head','stop');
            var tlhead = new TimelineLite();
            tlhead.to("#btn-head-stop", 0, {display: "none"})
            .to("#btn-head-start", 0, {display: ""});
        });
        
        // Start Head tracking and display right Head detection status button
        var headDetection = localStorage.getItem('head');
        if(headDetection == 'stop')
        {
            document.getElementById("btn-head-start").style.display = "";
            document.getElementById("btn-head-stop").style.display = "none";
        }
        if(headDetection != 'stop') 
        {
            document.getElementById("btn-head-stop").style.display = "";
            document.getElementById("btn-head-start").style.display = "none";
        }
        
        // Start Head tracking and display right Head detection status button
        document.body.onkeyup = function(e)
        {
            if(e.keyCode == 72 && headDetection == 'stop')
            {
                console.log('press key h => head start');
                handsfree.start();
            }
            if(e.keyCode == 72 && headDetection != 'stop')
            {
                console.log('press key h => head stop');
                handsfree.stop();
            }
        }      
        
        // Replace voice guideline (shorter) on mobile
        var screen = window.innerWidth;
        var diagnosticshort = document.querySelector('.outputshort');  
        console.log( 'Width screen: ' + screen );
        if ( screen < 992 ) { 
            diagnosticshort.textContent = 'Tap here to speak.';
        }    
        
        $body.on('loaderEnd', () => console.log('detectionJS-LOADED'))
    }
}

