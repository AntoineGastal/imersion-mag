/*
|--------------------------------------------------------------------------------
|                                   KIRA
|--------------------------------------------------------------------------------
|
| Kira is a lightweight library to handle scroll animations using GSAP & Scroll Trigger
|
*/

/*
|
| Dependencies
|---------------
*/
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
|
| Class
|--------
*/
class Kira{
    /*
    |
    | Constructor
    |--------------
    */
    constructor(params = {}){
        this.params = this.getParams(params);
        this.tweens = {};
    }


    /*
    |
    | getDefaults
    |--------------
    */
    getDefaults(){
        return {
            loadEvent     : [window, 'DOMContentLoaded'],
            scrollTrigger : {
                start         : 'top bottom',
                toggleActions : 'play complete none reset'
            },
            tweenParams   : {
                start : '-=0.4',
            },
            selectors     : {
                wrappers : '[data-kira-timeline]',
                items    : '[data-kira-item]'
            }
        }
    }


    /*
    |
    | getParams
    |--------------
    */
    getParams(params){
        const defaults = { ...this.getDefaults() };
        const { scrollTrigger, tweenParams, selectors, ...uniterableParams } = params;

        if(params.hasOwnProperty('scrollTrigger')){
            defaults.scrollTrigger = { ...defaults.scrollTrigger, ...scrollTrigger };
        }

        if(params.hasOwnProperty('tweenParams')){
            defaults.tweenParams   = { ...defaults.tweenParams, ...tweenParams };
        }

        return { ...defaults, ...uniterableParams };
    }


    /*
    |
    | Init
    |-------
    */
    init(){
        const wrappers = gsap.utils.toArray(this.params.selectors.wrappers);
        
        wrappers.forEach(wrapper => wrapper.dataset.kiraTimeline === 'onload' ? this.runEntranceAnimations(wrapper) : this.runScrollAnimations(wrapper));
    }


    /*
    |
    | runEntranceAnimations
    |------------------------
    */
    runEntranceAnimations(wrapper){
        const [ domElement, event ] = this.params.loadEvent;
        const timeline              = this.createTimeline(wrapper, { paused: true });

        domElement.addEventListener(event, () => timeline.play(), false);
    }


    /*
    |
    | runScrollAnimations
    |----------------------
    */
    runScrollAnimations(wrapper){
        const { scrollTrigger } = this.params;
        const additionalScrollTriggerOptions = { 
            trigger: wrapper
        }
        let timelineOptions = {};
        
        timelineOptions.scrollTrigger = { ...scrollTrigger, ...additionalScrollTriggerOptions };
        
        this.createTimeline(wrapper, timelineOptions);
    }


    /*
    |
    | createTimeline
    |-----------------
    */
    createTimeline(wrapper, timelineOptions = {}){
        const timeline                = gsap.timeline(timelineOptions);
        const { items: kiraItems }    = this.params.selectors;
        const { start: startDefault } = this.params.tweenParams;
        const items                   = wrapper.querySelectorAll(kiraItems);

        items.forEach((item, index) => {
            const dataItem  = item.dataset.kiraItem;
            const dataStart = item.dataset.start;
            let start       = index === 0 ? 'start' : startDefault;
            start           = dataStart ? dataStart : start;
            
            this.tweenExists(dataItem) && this.tweens[dataItem](item, timeline, start);
        });

        return timeline;
    }


    /*
    |
    | add
    |------
    */
    add(key, callback){
        this.tweens[key] = callback;
    }


    /*
    |
    | tweenExists
    |-------------
    */
    tweenExists(kiraItem){
        return this.control(this.tweens.hasOwnProperty(kiraItem), this.getMessage('tween_not_exist', kiraItem));
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

    
    /*
    |
    |  Helper: getMessage
    |----------------------
    */
    getMessage(key, ...strings){
        const messages = {
            'tween_exist' : `The tween: "${ strings[0] }" has already been defined`,
            'tween_not_exist' : `The tween: "${ strings[0] }" not exist`,
        }

        return messages[key];
    }
}

export default Kira;