import gsap from "gsap";
/*
|--------------------------------------------------------------------------------
|                                   Menu
|--------------------------------------------------------------------------------
|
| Menu allows to manage "animated burger menus" and provides callbacks
| It uses Greensock as main dependency
|
*/

/*
|
| Class
|--------
|
*/
class Menu
{
    /*
    |
    | Constructor
    |--------------
    */
    constructor(menuWrapper, menuButton, params = {}) {
		this.bindMethods();

        this.menuWrapper  = menuWrapper;
		this.menuButton   = menuButton;
		this.menuTimeline = this.initTimeline();
		this.params 	  = this.initParams(params);
	}

	/*
	|
	| bindMethods
	|--------------
	*/
	bindMethods(){
		this.handleComplete        = this.handleComplete.bind(this);
		this.handleReverseComplete = this.handleReverseComplete.bind(this);
	}
	
	/*
	|
	| initParams
	|--------------
	*/
	initParams(params){
		const { activeClass, reverseTimeScale } = params;

		return {
			'activeClass'     : this.isDefined(activeClass) 	 ? activeClass      : 'menu-active',
			'reverseTimeScale': this.isDefined(reverseTimeScale) ? reverseTimeScale : 1
		}
	}

	/*
	|
	| initTimeline
	|---------------
	*/
	initTimeline(){
		return gsap.timeline({ 
			paused: true,
			onComplete: this.handleComplete,
			onReverseComplete: this.handleReverseComplete
		})
	}

    /**
	|
	| Init
	|-------
    */
    init(){
        if (this.menuWrapperExist() && this.menuButtonExist()) {
			this.handleToggleMenu();
        }
	}
	
	/**
    |
    | handleToggleMenu
    |-------------------
    */
	handleToggleMenu(){
		const menuButton      = this.menuButton;
		const menuTimeline     = this.menuTimeline;
		const reverseTimeScale = this.params.reverseTimeScale;

		menuButton.addEventListener('click', () => {            
			if (this.menuIsActive()){
                this.close();
			} else {
                this.open();
            }
        }, false);
	} 

	/**
	|
	| handleComplete
	|-----------------
	*/
	handleComplete(){
		this.dispachEvent(this.menuWrapper, 'menu:opened');
	}

	/**
	|
	| handleReverseComplete
	|------------------------
	*/
	handleReverseComplete(){
		this.dispachEvent(this.menuWrapper, 'menu:closed');
	}

    /**
	|
	| open
	|-------
	*/
    open(){
        this.menuTimeline.timeScale(1).play();
        this.dispachEvent(this.menuWrapper, 'menu:open');
    }

    /**
	|
	| close
	|-------
	*/
    close() {
        this.menuTimeline.timeScale(this.params.reverseTimeScale).reverse();
        this.dispachEvent(this.menuWrapper, 'menu:close');
    }

	/**
	|
	| menuIsActive
	|---------------
	*/
	menuIsActive(){
        return this.menuTimeline.totalProgress() !== 0;
	}

    /**
    |
    | menuWrapperExist
    |-------------------
    */
    menuWrapperExist(){
        return this.control(this.exist(this.menuWrapper), this.getMessage('menuWrapperExist'));
	}
	
	/**
    |
    | menuButtonExist
    |------------------
    */
   	menuButtonExist() {
        return this.control(this.exist(this.menuButton), this.getMessage('menuButtonExist'));
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
	| Helper: exist
	|----------------
	*/
	exist(item){
		return item !== null;
	}

	
	/**
	|
	| Helper: control
	|------------------
	*/
	control(condition, message, selector = null){
		if(!condition){
			if(selector === null){
				console.error(message);
			} else {
				console.error(message, selector);
			}
		}

		return condition;
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
	| Helper: getMessage
	|---------------------
	*/
	getMessage(messageKey, var1 = '', var2 = ''){
		var messages = {
			'menuWrapperExist': 'The menu wrapper (specified as 1st parameter) does not exist',
			'menuButtonExist' : 'The button menu (specified as 2nd parameter) does not exist',
		};

		return 'Menu: ' + messages[messageKey];
	}
}

export default Menu;