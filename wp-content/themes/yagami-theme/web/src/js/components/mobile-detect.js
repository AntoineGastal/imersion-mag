/*
|--------------------------------------------------------------------------------
|                                    MobileDetect
|--------------------------------------------------------------------------------
|
| MobileDetect is a small component to detect mobile devices
|
*/

/*
|
| Class
|--------
|
*/
class MobileDetect {
    /*
    |
    | Constructor
    |--------------
    */
    constructor() {}

    /*
    |
    | isAndroid
    |------------
    */
    isAndroid() {
        return navigator.userAgent.match(/Android/i);
    }

    /*
    |
    | isAndroid
    |------------
    */
    isBlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
    }

    /*
    |
    | isIOS
    |--------
    */
    isIOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }

    /*
    |
    | isOpera
    |----------
    */
    isOpera() {
        return navigator.userAgent.match(/Opera Mini/i);
    }

    /*
    |
    | isWindows
    |------------
    */
    isWindows() {
        return navigator.userAgent.match(/IEMobile/i);
    }

    /*
    |
    | isMobile
    |------------
    */
    isMobile() {
        return (this.isAndroid() || this.isBlackBerry() || this.isIOS() || this.isOpera() || this.isWindows());
    }
}

export default MobileDetect;
