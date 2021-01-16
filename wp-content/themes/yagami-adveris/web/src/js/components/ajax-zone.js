/*
|--------------------------------------------------------------------------------
|                                   AjaxZone
|--------------------------------------------------------------------------------
|
| AjaxZone allows to handle all ajax processes with simplicity
|
*/

/*
|
| Class
|--------
|
*/
class AjaxZone
{
    /*
    |
    | Constructor
    |--------------
    */
    constructor(params = {}) {
        this.bindMethods();
        
        this.defaultParams = this.getDefaultParams(params);
        this.params = this.initParams(params);
        this.xhr    = null;
        
        this.init();
	}

	/*
	|
	| bindMethods
	|--------------
	*/
	bindMethods(){
		//this.handleReadyStateChange = this.handleReadyStateChange.bind(this);
    }
    

    /*
	|
	| getDefaultParams
	|--------------------
	*/
    getDefaultParams(){
        return {
            mode        : 'filter',
            loader      : '[data-ajax-zone-loader]',
            container   : '[data-ajax-zone-container]',
            items       : '[data-ajax-zone-item]',
            async       : true,
            method      : 'POST',
            responseType: 'json',
            tweenMax    : null
        }
    }

	
	/*
	|
	| initParams
	|--------------
	*/
	initParams(params){
        const final = { ...this.getDefaultParams(), ...params };

        return final;
	}


    /**
	|
	| Init
	|-------
    */
    init(){
        this.setXHR();
    }


    /**
	|
	| setXHR
	|---------
    */
    setXHR(){
        const { responseType } = this.params;

        this.xhr = new XMLHttpRequest();
        this.xhr.responseType = responseType;
    }


    /**
	|
	| filter
	|---------
    */
    filter(url, params){
        return this.call(url, { ...params, mode: 'filter' });
    }


    /**
	|
	| loadMore
	|------------
    */
    loadMore(url, params){
        return this.call(url, { ...params, mode: 'loadMore' });
    }


    /**
	|
	| call
	|------
    */
    call(url, params = {}) {
        const { method, async } = this.params;
        const { datas = {}, mode = null, beforeSend = null } = params;

        this.abort();
        this.xhr.open(method, url, async);
        this.beforeSend(this.xhr, mode, beforeSend);
        this.xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
        this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        this.xhr.send(this.encode(datas));

        return this.handleResponse(mode);
    }


    /**
	|
	| abort
	|--------
	*/
    abort() {
        this.xhr !== null && this.xhr.abort();
    }


    /**
	|
	| beforeSend
	|-------------
    */
    beforeSend(xhr, mode, beforeSend) {
        this.initPendingZone(mode);

        if (typeof beforeSend === 'function') {
            beforeSend(xhr);
        }
    }


    /**
	|
	| handleResponse
	|-----------------
    */
    handleResponse(mode){
        const _this = this;

        return new Promise((resolve, reject) => {
            this.xhr.onreadystatechange = function () {
                const xhr = this;

                if (xhr.readyState === 4){
                    const { response, statusText } = xhr;

                    if(xhr.status === 200){
                        _this.initResponseZone(response, mode);
                        resolve(response, statusText, xhr);
                    } else {
                        reject(xhr, statusText);
                    }
                }
            }
        });
    }


    /**
	|
	| initPendingZone
	|-------------------
    */
    initPendingZone(mode){
        this.toggleLoader(true);
        this.prepareContainer(mode);
    }


    /**
	|
	| initResponseZone
	|-------------------
    */
    initResponseZone(response, mode){
        const { container } = this.params;
        const $container = document.querySelector(container);

        this.toggleLoader(false);

        switch (mode) {
            case 'filter':
                $container.innerHTML = response;
                break;

            case 'loadMore':
                const parser = new DOMParser();                
                const $response = parser.parseFromString(response, 'text/html');
                $response.body.childNodes.forEach(element => {
                    $container.append(element);
                });
                break;
        
            default:
                break;
        }
    }


    /**
	|
	| toggleLoader
	|---------------
    */
    toggleLoader(show){
        const { loader } = this.params;
        const $loader = document.querySelector(loader);
        const style = show ? 'block' : 'none';

        if ($loader !==  null){
            $loader.style.display = style;
        }
    }


    /**
	|
	| prepareContainer
	|-------------------
    */
    prepareContainer(mode) {
        const { container } = this.params;
        const $container = document.querySelector(container);

        switch (mode) {
            case 'filter':
                $container.innerHTML = '';
                break;
        
            default:
                break;
        }
    }


    /**
	|
	| Encode
	|---------
    */
    encode (params, prefix) {
        let urlParts = [];

        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                const k = prefix ? `${prefix}[${key}]` : key;
                const v = params[key];
                const string = typeof v === 'object' ? this.encode(v, k) : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;

                urlParts.push(string);
            }
        }

        return urlParts.join("&");
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
	exist($item){
		return $item.length;
	}
}

export default AjaxZone;