/*
|--------------------------------------------------------------------------------
|                              Materialize Form
|--------------------------------------------------------------------------------
|
| Materialize Form allows to easily implement materialize form effects
|
*/

import gsap from 'gsap';

/*
|
| Class
|--------
|
*/
class MaterializeForm {
    /*
    |
    | Constructor
    |--------------
    */
    constructor($formWrapper, params = {}) {
        this.formWrapper = $formWrapper;
        this.params = this.initParams(params);

        this.init();
    }


    /*
    |
    | initParams
    |--------------
    */
    initParams(params) {
        const { selectors, labelEffect } = params;
        const { group, label, input } = selectors;
        const { duration, scale, y, ease } = labelEffect;

        return {
            'selectors': {
                'group': this.isDefined(group) ? group : 'form-group',
                'label': this.isDefined(label) ? label : 'label',
                'input': this.isDefined(input) ? input : 'input',
            },
            'labelEffect': {
                'duration': this.isDefined(duration) ? duration : 0.3,
                'scale'   : this.isDefined(scale)    ? scale    : 0.7,
                'y'       : this.isDefined(y)        ? y        : -10,
                'ease'    : this.isDefined(ease)     ? ease     : 'Power1.out'
            },
            'focusedClasses': {
                'group': 'materialize-group-focused',
                'label': 'materialize-label-focused',
                'input': 'materialize-input-focused'
            }
        }
    }

    /*
    |
    | initTimeline
    |---------------
    */
    initTimeline() {
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
    init() {
        if (this.formWrapperExist()) {
            this.handleToggleInputs();
        }
    }

    /**
	|
	| handleToggleInputs
	|---------------------
    */
    handleToggleInputs(){
        const _this            = this;
        const $formWraper      = this.formWrapper;
        const { group, input } = this.params.selectors;
        const $input           = $formWraper.find(group + ' ' + input);

        $.each($input, function(){
            const
                $input = $(this),
                $group = $input.closest(group),
                $label = $group.find('label')
            ;

            if ($input.val() != '') {
                _this.animateFocus($label);
            }
        });

        $input.on('blur focus', function (e) {
            console.log('error')
            const 
                event  = e.type,
                $input = $(this),
                $group = $input.closest(group),
                $label = $group.find('label')
            ;

            event === 'focus' && _this.handleFocus($group, $label);
            event === 'blur'  && _this.handleBlur($group, $label, $input);
        });
    }


    /**
    |
    | handleFocus
    |--------------
    */
    handleFocus($group, $label){
        const { group, label }   = this.params.focusedClasses;

        $group.addClass(group);
        $label.addClass(label);
        this.animateFocus($label);
    }

    /**
    |
    | animateFocus
    |--------------
    */
    animateFocus($label){
        const { duration, scale, y, ease } = this.params.labelEffect;

        gsap.to($label, duration, { scale: scale, y: y, transformOrigin: 'left top', ease: ease })
    }
    
    /**
    |
    | handleFocus
    |--------------
    */
    handleBlur($group, $label, $input) {
        const { group, label }   = this.params.focusedClasses;

        if ($input.val() === '') {
            $group.removeClass(group);
            $label.removeClass(label);
            this.animateBlur($label);
        }
    }

    /**
    |
    | animateBlur
    |--------------
    */
    animateBlur($label) {
        const { duration, ease } = this.params.labelEffect;

        gsap.to($label, duration, { scale: 1, y: 0, transformOrigin: 'left top', ease: ease })
    }

    /**
    |
    | formWrapperExist
    |-------------------
    */
    formWrapperExist() {
        return this.control(this.exist(this.formWrapper), this.getMessage('formWrapperExist'), this.formWrapper);
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
            'formWrapperExist': 'The form wrapper (specified as 1st parameter) does not exist:'
        };

        return 'Materialize form: ' + messages[messageKey];
    }
}

export default MaterializeForm;