import Barba from 'barba.js/dist/barba.js';
/*
|--------------------------------------------------------------------------------
|                                   BarbaManager
|--------------------------------------------------------------------------------
|
| BarbaManager allows to manage Barba Ajax pages transitions
|
*/

/*
|
| Class
|--------
|
*/
class BarbaManager {

    /*
    |
    | Constructor
    |--------------
    */
    constructor(params = {}) {
        this.handleNewPageReady = this.handleNewPageReady.bind(this);
        this.runTimeline        = this.runTimeline.bind(this);
        this.handleLinkClicked  = this.handleLinkClicked.bind(this);
        this.params             = this.initParams(params);

        this.clickedLink;

        this.init();
    }

    /*
    |
    | initParams
    |--------------
    */
    initParams(params) {
        const { prefetch, xhrTimeout, additionals, onReady, onLeave } = params;

        return {
            'prefetch'    : this.isDefined(prefetch)     ? prefetch     : false,
            'xhrTimeout'  : this.isDefined(xhrTimeout)   ? xhrTimeout   : 10000,
            'additionals' : this.isDefined(additionals)  ? additionals  : {},
            'onReady'     : this.isDefined(onReady)      ? onReady      : false,
            'onLeave'     : this.isDefined(onLeave)      ? onLeave      : false
        }
    }

    /**
	|
	| Init
	|-------
    */
    init() {
        this.initBarba();
        this.initBarbaPrefetch();
        this.initBarbaUtils();
        this.initPreventRedirectionOnCurrentPage();
        this.initBarbaEventsHandling();
        this.initBarbaPageTransition();
    }

    /**
	|
	| initBarba
	|------------
	|
	*/
    initBarba(){
        Barba.Pjax.start();
    }

    /**
	|
	| initBarbaPrefetch
	|--------------------
	|
	*/
    initBarbaPrefetch() {
        this.params.prefetch && Barba.Prefetch.init();
    }

    /**
	|
	| initBarbaUtils
	|-----------------
	|
	*/
    initBarbaUtils() {
        Barba.Utils.xhrTimeout = this.params.xhrTimeout;

        Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;

        Barba.Pjax.preventCheck = function (evt, element) {
            if (!Barba.Pjax.originalPreventCheck(evt, element)) {
                return false;
            }

            if (/.pdf/.test(element.href.toLowerCase())) {
                return false;
            }

            return true;
        };
    }

    /**
	|
	| initPreventRedirectionOnCurrentPage
	|--------------------------------------
	|
	*/
    initPreventRedirectionOnCurrentPage(){
        $('body').on('click', 'a', function (e) {
            if (e.currentTarget.href === window.location.href) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }

    /**
	|
	| initBarbaEventsHandling
	|--------------------------
	|
	*/
    initBarbaEventsHandling() {
        Barba.Dispatcher.on('linkClicked', this.handleLinkClicked);
        Barba.Dispatcher.on('initStateChange', this.handleInitStateChanged);
        Barba.Dispatcher.on('newPageReady', this.handleNewPageReady);
        Barba.Dispatcher.on('transitionCompleted', this.handleTransitionCompleted);
    }

    /**
	|
	| handleLinkClicked
	|----------------------------
	|
	*/
    handleLinkClicked(HTMLElement, MouseEvent) {
        const $body = $('body');

        this.clickedLink = HTMLElement;

        !$body.hasClass('ajax-loaded') && $body.addClass('ajax-loaded');
    }

    /**
	|
	| handleInitStateChanged
	|----------------------------
	|
	*/
    handleInitStateChanged(currentStatus) {}

    /**
	|
	| handleNewPageReady
	|----------------------------
	|
	*/
    handleNewPageReady(currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML) {
        if (this.params.onReady) {
            this.params.onReady(currentStatus, prevStatus, $(HTMLElementContainer), newPageRawHTML)
        }
    }

    /**
	|
	| handleTransitionCompleted
	|----------------------------
	|
	*/
    handleTransitionCompleted(currentStatus, prevStatus) {
        console.log('transitionCompleted')
    }

    /**
	|
	| initBarbaPageTransition
	|--------------------------
	|
	*/
    initBarbaPageTransition(){
        Barba.Pjax.getTransition = () => ( Barba.BaseTransition.extend(this.handleBarbaPageTransition()) )
    }
    
    /**
	|
	| handleBarbaPageTransition
	|----------------------------
	|
	*/
    handleBarbaPageTransition(){
        return {
            start         : this.handleTranstionStart,
            processing    : this.handleTransitionProcessing,
            complete      : this.handleTranstionComplete,
            runTimeline   : this.runTimeline,
            reloadScripts : this.reloadScripts
        }
    }

    /**
	|
	| handleTranstionStart
	|-----------------------
	|
	*/
    handleTranstionStart() {
        Promise.all([this.newContainerLoading, this.processing()]).then(this.complete.bind(this));
    }

    /**
	|
	| handleTransitionProcessing
	|-----------------------------
	|
	*/
    handleTransitionProcessing() {        
        return new Promise((resolve) => {
            let timeline = new TimelineMax({ 
                paused: true, 
                onComplete: () => resolve(true)
            });
            
            this.runTimeline(timeline, $(this.oldContainer));
        });
    }

    /**
	|
	| handleTranstionDone
	|-----------------------
	|
	*/
    handleTranstionComplete() {
        this.done();
        this.reloadScripts();
    }

    /**
	|
	| runTimeline
	|--------------
	|
	*/
    runTimeline(timeline, $oldContainer) {
        if (this.params.onLeave) {
            this.params.onLeave($oldContainer, timeline, this.clickedLink)
        }

        timeline.play();
    }
    
    /**
	|
	| reloadScripts
	|----------------
	|
	*/
    reloadScripts() {
        $.each($('.app-script'), function () {
            let script = document.createElement('script');
            script.classList.add('app-script');
            script.src = $(this).attr('src');
            $(this).remove();
            document.body.appendChild(script);
        });
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
}

export default BarbaManager;
