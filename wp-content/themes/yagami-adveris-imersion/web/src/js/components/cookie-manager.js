/*
|--------------------------------------------------------------------------------
|                              CookieManager
|--------------------------------------------------------------------------------
|
| CookieManager handles simple cookie banners
|
*/

/*
|
| Class
|--------
|
*/
class CookieManager {
    /*
    |
    | Constructor
    |--------------
    */
    constructor($banner, params = {}) {
        this.banner = $banner;
        this.params = this.initParams(params);

        this.cookies;
        this.init();
    }


    /*
    |
    | initParams
    |--------------
    */
    initParams(params) {
        const { name, value, duration, buttons, onAccept, onRefuse } = params;

        let paramsObj = {
            'name'     : this.isDefined(name)      ? name     : 'adveris_cookie_accepted',
            'duration' : this.isDefined(duration)  ? duration : 30,
            'onAccept' : this.isDefined(onAccept) ? onAccept : null,
            'onRefuse' : this.isDefined(onRefuse) ? onRefuse : null,
        };

        if (this.isDefined(buttons)) {
            const { accept, refuse, close } = buttons;
            const buttonsParams = {
                accept: this.isDefined(accept) ? accept : this.banner.find('.item-cookie-banner-accept'),
                refuse: this.isDefined(refuse) ? refuse : this.banner.find('.item-cookie-banner-refuse'),
                close: this.isDefined(close)   ? close  : this.banner.find('.item-cookie-banner-close')
            }

            paramsObj = { ...paramsObj, buttons: buttonsParams }
        }

        return paramsObj
    }


    /**
	|
	| Init
	|-------
    */
    init() {
        if (this.cookieBannerDefined() && this.cookieBannerExist()) {
            this.storeCookies();
            this.handleCookieBanner();
        }
    }


    /**
    |
    | handleCookieBanner
    |---------------------
    */
    handleCookieBanner(){
        this.handleShow();
        this.handleActions();
    }


    /**
    |
    | handleShow
    |--------------
    */
    handleShow(){
        const { name } = this.params;
        
        if (typeof this.cookies[name] === 'undefined') {
            this.banner.show();
        }
    }


    /**
    |
    | handleActions
    |----------------
    */
    handleActions() {
        const { name, duration, buttons } = this.params;
        const { accept, refuse, close } = buttons;
        const $banner  = this.banner;

        close.on('click', e => {
            e.preventDefault();
            $banner.fadeOut();
        });

        accept.on('click', e => this.closeCookieBanner(e));
        close.on('click', e => this.closeCookieBanner(e));
        refuse.on('click', e => this.closeCookieBanner(e, false));
    }
    

    /**
    |
    | storeCookies
    |---------------
    */
    closeCookieBanner(e, accept = true){
        e.preventDefault();

        const { name, duration } = this.params;
        const $banner = this.banner;

        $banner.fadeOut(400, () => {
            $banner.remove();
            this.setCookie(name, accept, duration);
        });
    }


    /**
    |
    | storeCookies
    |---------------
    */
    storeCookies(){
        const decodedCookie = decodeURIComponent(document.cookie);
        const objCookies = decodedCookie.split(';');
        let obj = {};

        $.each(objCookies, function (k, v) {
            var cookie_name = v.split(/=(.+)/)[0].replace(' ', '');
            var cookie_value = v.split(/=(.+)/)[1];

            obj[cookie_name] = cookie_value;
        })

        this.cookies = obj;
    }


    /**
    |
    | setCookie
    |------------
    */
    setCookie(name, value, nbDays) {
        const { onAccept, onRefuse } = this.params;

        const date = new Date();
        date.setTime(date.getTime() + (nbDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
        
        if (value == false) {
            if (onRefuse !== null) {
                onRefuse();
            }
        } else {
            if (onAccept !== null) {
                onAccept();
            }
        }
        
    }


    /**
    |
    | cookieBannerDefined
    |-------------------
    */
    cookieBannerDefined() {
        return this.control(this.isDefined(this.banner), this.getMessage('cookieBannerDefined'));
    }


    /**
    |
    | cookieBannerExist
    |-------------------
    */
    cookieBannerExist() {
        return this.control(this.exist(this.banner), this.getMessage('cookieBannerExist'), this.banner);
    }


    /**
	|
	| Helper: isDefined
	|--------------------
	|
	*/
    isDefined(item) {
        return typeof item !== 'undefined';
    }


    /**
	|
	| Helper: exist
	|----------------
	*/
    exist($item) {
        return $item.length;
    }


    /**
    |
    | Helper: control
    |------------------
    */
    control(condition, message, selector = null) {
        if (!condition) {
            if (selector === null) {
                console.error(message);
            } else {
                console.error(message, selector);
            }
        }

        return condition;
    }


    /**
	|
	| Helper: getMessage
	|---------------------
	*/
    getMessage(messageKey, var1 = '', var2 = '') {
        var messages = {
            'cookieBannerDefined': 'No cookie banner specified as 1st parameter',
            'cookieBannerExist': 'The cookie banner (specified as 1st parameter) does not exist:',
        };

        return 'Cookie Manager: ' + messages[messageKey];
    }
}

export default CookieManager;