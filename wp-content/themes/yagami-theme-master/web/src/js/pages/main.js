export default {
	init: (app, CookieManager) => {
		/*
		|
		| Constants
		|-----------
		*/
        const 
            $body         = $('body'),
            $cookieBanner = $('.cookie-banner'),
            $cookieClose  = $cookieBanner.find('.item-close'),
            $cookieAccept = $cookieBanner.find('.item-accept'),
            $cookieRefuse = $cookieBanner.find('.item-refuse')
		;


        /*
		|
		| Cookie Manager
		|-----------------
		*/
        new CookieManager($cookieBanner, {
            name: 'adveris_cookie_use',
            duration: 30,
            buttons: {
                accept: $cookieAccept,
                refuse: $cookieRefuse,
                close: $cookieClose
            },
            onAccept: () => {
                console.log('accpeted')
            },
            onRefuse: () => {
                console.log('refused')
            }
        });

        $body.on('loaderEnd', () => console.log('ended'))
	}
}