import gsap from "gsap";
/*
|--------------------------------------------------------------------------------
|                                   Loader
|--------------------------------------------------------------------------------
|
| Loader allows to manage "page loding" and provides callbacks
|
*/

/*
|
| Class
|--------
|
*/
class Loader
{
    /*
    |
    | Constructor
    |--------------
    */
    constructor(loaderWrapper, params = {}) {
		this.bindMethods();

        this.loaderWrapper  = loaderWrapper;
		this.loaderTimeline = this.initTimeline();
        this.params         = this.initParams(params);

        this.estimatedTime  = this.calculatePerformanceTiming();
        this.progress       = { value: 0 }
        this.windowLoaded   = false;
        this.loadedFired    = false;
	}


	/*
	|
	| bindMethods
	|--------------
	*/
	bindMethods(){
		this.handleProgress         = this.handleProgress.bind(this);
		this.handleComplete         = this.handleComplete.bind(this);
		this.handleTimelineComplete = this.handleTimelineComplete.bind(this);
    }
    
	
	/*
	|
	| initParams
	|--------------
	*/
	initParams(params){
		const { useWindowLoad, onProgress, onLoad } = params;

        return {
			'useWindowLoad': this.isDefined(useWindowLoad) ? useWindowLoad : false,
			'onProgress'   : this.isDefined(onProgress)    ? onProgress    : null,
			'onLoad'       : this.isDefined(onLoad)        ? onLoad        : null
		}
	}


	/*
	|
	| initTimeline
	|---------------
	*/
	initTimeline(){
		return gsap.timeline({ paused: true, onComplete: this.handleTimelineComplete });
    }


    /*
	|
	| calculatePerformanceTiming
	|-----------------------------
	*/
    calculatePerformanceTiming(){
        const timing    = window.performance.timing;
        const estimated = -(timing.loadEventEnd - timing.navigationStart);

        return parseInt((estimated / 1000) % 60) * 100;
    }


    /**
	|
	| Init
	|-------
    */
    init(){
        if (this.loaderWrapperExist()) {
            this.watchWindowLoadEvent();
			this.runLoading();
        }
    }


    /**
	|
	| watchWindowLoadEvent
	|-----------------------
    */
    watchWindowLoadEvent(){
        window.addEventListener('load', () => this.windowLoaded = true, false)
    }
    

    /**
	|
	| runLoading
	|-------------
    */
    runLoading(){
        const duration = this.estimatedTime / 1000;

        gsap.to(this.progress, duration, { value: 100, onUpdate: this.handleProgress, onComplete: this.handleComplete });
    }
    

    /**
	|
	| handleProgress
	|-----------------
	*/
    handleProgress(progress) {
        const { onProgress } = this.params;

        if (!this.windowLoaded){
            onProgress(this.progress.value);
        } else {
            this.handleComplete();
        }
    }
    

	/**
	|
	| handleComplete
	|-----------------
	*/
	handleComplete(){
        const { loadedFired } = this;
        const { useWindowLoad } = this.params;

        if (useWindowLoad){
            window.addEventListener('load', () => this.loaded(), false)
        } else {
            if (!loadedFired){
                this.loaded();
                this.loadedFired = true;
            }
        }
    }


    /**
	|
	| handleComplete
	|-----------------
	*/
    loaded(){
        const { onProgress, onLoad } = this.params;
        onLoad();
        this.dispachEvent(document.querySelector('body'), 'loader:complete');

        this.loaderTimeline.play();
    }
    

    /**
	|
	| handleTimelineComplete
	|-------------------------
	*/
    handleTimelineComplete(){
        this.loaderWrapper.remove();
    }


    /**
	|
	| Helper: isDefined
	|--------------------
	|
	*/
	isDefined(item){
		return typeof item !== 'undefined';
	}

	
	/**
	|
	| Helper: dispachEvent
	|-----------------------
	*/
	dispachEvent(element, eventName, datas = {}){
        const event = new CustomEvent(eventName, { detail : datas });

        element.dispatchEvent(event);
    }
    

    /**
	|
	| Helper: loaderWrapperExist
	|-----------------------------
	*/
    loaderWrapperExist(){
        if(this.loaderWrapper === null){
            console.error('LoaderManager: loaderWrapper specified as first parameter not exist:' + this.loaderWrapper);
        }
        
        return this.loaderWrapper !== null;
    }
}

export default Loader;