/*
|--------------------------------------------------------------------------------
|                                   KIRA
|--------------------------------------------------------------------------------
|
| Kira is a lightweight library to handle Greensock Timelines & ScrollMagic Scenes
|
*/

/*
TODO:
    - optimize propertize
    - manage stagger
    - trigger events named timelines --> remove timeline name feature
    - generate scenes
    - kira addScrollTween / addLoadTween instead of "add" for both
    - debug mode
    - handle data start
    - error messages for animation item that not exist
    - handle events on which run "onload timelines"
    - split all items
*/

/*
|
| Class
|--------
|
*/
class Kira {
    /*
    |
    | Constructor
    |--------------
    */
    constructor(scrollmagic, params = {}) {
        this.scrollmagic = scrollmagic;
        this.defaults = this.initDefaults();
        this.params = this.initParams(params);
        this.timelines = {};
        this.scenes = {};
        this.tweens = {};
        this.scrollMagicController = null;
    }


    /*
    |
    | initDefaults
    |---------------
    */
    initDefaults() {
        return {
            debug: false,
            loadEvent: {
                'domElement': null,
                'eventName': null
            },
            optimize: false,
            options: {
                'start': '-=0.4',
                'triggerHook': 'onCenter',
                'reverse': true
            },
            selectors: {
                'onLoadWrappers': {
                    'element': $('[data-kira-timeline-onload]'),
                    'data': 'kira-timeline-onload'
                },
                'onScrollWrappers': {
                    'element': $('[data-kira-timeline]'),
                    'data': 'kira-timeline'
                },
                'item': {
                    'element': $('[data-kira-item]'),
                    'data': 'kira-item'
                }

            }
        };
    }


    /*
    |
    | initParams
    |--------------
    */
    initParams(params) {
        let paramsObj = {
            ...this.defaults
        };
        const {
            debug,
            loadEvent,
            optimize,
            options
        } = params;

        if (this.isDefined(debug)) {
            paramsObj = {
                ...paramsObj,
                debug
            };
        }

        if (this.isDefined(loadEvent)) {
            paramsObj.loadEvent = {
                ...paramsObj.loadEvent,
                ...loadEvent
            };
        }

        if (this.isDefined(optimize)) {
            paramsObj = {
                ...paramsObj,
                optimize
            };
        }

        if (this.isDefined(options)) {
            paramsObj.options = {
                ...paramsObj.options,
                ...options
            };
        }

        return paramsObj;
    }


    /**
	|
	| Init
	|-------
    */
    init() {
        if (this.scrollMagicIsDefined()) {
            this.runOnloadAnimations();
            this.runOnScrollAnimations();
        }
    }


    /**
	|
	| setTimeline
	|--------------
	|
	*/
    setTimeline(timelineName, paused, $selector) {
        const _this = this;
        const timeline = new TimelineMax({
            paused: paused,
            onStart: function () {
                _this.dispachEvent($selector, 'kira:timelineStart', {
                    timeline: this
                });
            },
            onUpdate: function () {
                _this.dispachEvent($selector, 'kira:timelineUpdate', {
                    timeline: this
                });
            },
            onComplete: function () {
                _this.dispachEvent($selector, 'kira:timelineComplete', {
                    timeline: this
                });
            },
        });

        _this.registerTimeline(timelineName, timeline);

        return timeline;
    }


    /**
	|
	| registerTimeline
	|-------------------
	|
	*/
    registerTimeline(timelineName, timeline) {
        if (this.isDefined(timelineName)) {
            this.timelines[String(timelineName)] = timeline;
        }
    }


    /**
	|
	| runOnloadAnimations
	|----------------------
    */
    runOnloadAnimations() {
        const {
            domElement,
            eventName
        } = this.params.loadEvent;

        if (domElement !== null && eventName !== null) {
            domElement.on(eventName, () =>{
                this.initTimelines('onLoadWrappers')
            } )
        } else {
            this.initTimelines('onLoadWrappers')
        }

    }


    /**
	|
	| initTimelines
	|----------------
    */
    initTimelines(selectorKey, paused = true, autoplay = true) {
        const _this = this;
        const selector = this.params.selectors[selectorKey];
        const $selector = selector.element;
        const selectorData = selector.data;

        $.each($selector, function () {
            const $this = $(this);
            
            if (_this.isValidTimeline($this)) {
                const timelineName = $this.data(selectorData);
                const timeline = _this.setTimeline(timelineName, paused, $this);

                _this.generateTimelineTweens({
                    'selector': $this,
                    'timeline': timeline,
                    'timelineName': timelineName
                });
                autoplay && timeline.play();
            }
        });
    }


    /**
	|
	| runOnScrollAnimations
	|------------------------
	|
	*/
    runOnScrollAnimations() {
        const _this = this;
        const ScrollMagic = this.scrollmagic;
        const controller = this.getScrollMagicController(ScrollMagic);
        const {
            element: $selector,
            data
        } = this.params.selectors.onScrollWrappers;
        let scenes = [];

        $.each($selector, function () {
            scenes.push(_this.createScene($(this), data, ScrollMagic));
        });

        controller.addScene(scenes);
    }


    /**
    |
    | getScrollMagicController
    |---------------------------
    |
    */
    getScrollMagicController(ScrollMagic) {
        if (this.scrollMagicController === null) {
            this.scrollMagicController = new ScrollMagic.Controller();
        }

        return this.scrollMagicController;
    }


    /**
    |
    | createScene
    |--------------
    |
    */
    createScene($selector, dataName, ScrollMagic) {
        let scene = null;

        if (this.isValidTimeline($selector)) {
            const timelineName = $selector.data(dataName);
            const timeline = this.setTimeline(timelineName, false, $selector);
            const options = this.getSceneOptions($selector);

            this.generateTimelineTweens({
                'selector': $selector,
                'timeline': timeline,
                'timelineName': timelineName
            });
            scene = new ScrollMagic.Scene(options).setTween(timeline)
            this.params.debug && scene.addIndicators();
            this.registerScene(timelineName, scene);
        }

        return scene;
    }


    /**
	|
	| registerScene
	|----------------
	|
	*/
    registerScene(timelineName, scene) {
        this.scenes[timelineName] = scene;
    }


    /**
	|
	| getSceneOptions
	|------------------
	|
	*/
    getSceneOptions($selector) {
        const {
            triggerHook,
            reverse
        } = $selector.data();
        const {
            triggerHook: defaultTriggerHook,
            reverse: defaultReverse
        } = this.params.options;

        let returnObject = {
            triggerElement: $selector,
            triggerHook: this.isDefined(triggerHook) ? triggerHook : defaultTriggerHook,
            reverse: this.isDefined(reverse) ? reverse : defaultReverse
        };

        return returnObject;
    }





    /**
	|
	| generateTimelineTweens
	|-------------------------
	|
	*/
    generateTimelineTweens(params) {
        const _this = this;
        const tweens = _this.tweens;
        const {
            selector: $selector,
            timeline
        } = params;
        const {
            item
        } = this.params.selectors;
        const {
            element,
            data
        } = item

        $.each($selector.find(element), function (key, value) {
            const $item = $(this);
            const item = $item.data(data);
            const dataStart = $item.data('start');

            let start = key === 0 ? 'start' : _this.params.options.start;
            start = dataStart ? dataStart : start;

            _this.isDefined(tweens[item]) && tweens[item]($item, timeline, start);
        });
    }


    /**
	|
	| Helper: isValidTimeline
	|--------------------------
	|
	*/
    add(index, callback) {
        this.tweens[index] = callback;
    }


    /**
	|
	| Helper: isValidTimeline
	|--------------------------
	|
	*/
    isValidTimeline($selector) {
        const dataTimeline = $selector.data('kira-timeline');
        let isValid = true;
        let message;

        if (dataTimeline !== '') {
            if (this.isDefined(this.timelines[dataTimeline])) {
                isValid = false;
                message = this.getMessage('isValidTimelineDuplicate', dataTimeline);
            }
        }

        return this.control(isValid, message, $selector);
    }


    /**
    |
    | ScrollMagicIsDefined
    |-----------------------
    */
    scrollMagicIsDefined() {
        return this.control(this.isDefined(this.scrollmagic), this.getMessage('scrollMagicIsDefined'));
    }


    /**
	|
	| Helper: dispachEvent
	|-----------------------
	|
	*/
    dispachEvent($element, eventName, datas = null) {
        var event = $.Event(eventName);

        if (datas !== null) {
            $.each(datas, function (key, value) {
                event[key] = value
            });
        }

        $element.trigger(event);
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
            'scrollMagicIsDefined': 'ScrollMagic is required to init Kira.',
            'isValidTimelineDuplicate': 'You already have a timeline called ' + var1 + ', rename it at: ',
        };

        return 'Kira: ' + messages[messageKey];
    }
}

export default Kira;