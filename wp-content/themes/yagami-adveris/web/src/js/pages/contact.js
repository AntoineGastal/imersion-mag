export default {
    init: (app, MaterializeForm, customGoogleMap) => {
        /*
        |
        | Constants
        |------------
        */
        const
            $map = $('#map'),
            $contactForm = $('.contact-form')
        ;


        /*
		|
		| initGoogleMap
		|----------------
		|
		*/
        $.each($map, function () {
            var $map = $(this);

            // var map = new customGoogleMap($map, {
            //     'markers': $map.find('.marker'),
            //     'zoom': 16
            // });
        });


        /*
		|
		| Materialize form
		|-------------------
		|
        */
        new MaterializeForm($contactForm, {
            selectors: {
                group: '.gfield',
                label: '.gfield_label',
                input: '.ginput_container_text input, .ginput_container_email input'
            },
            labelEffect: {
                duration: 0.3,
                ease: Power2.easeOut
            }
        });
    }
}