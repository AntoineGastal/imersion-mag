/*
|
| JQuery replaceClass
|----------------------
*/
$.fn.replaceClass = function (oldClasses, newClasses) {
    return this.each(function () {
        $(this).removeClass(oldClasses).addClass(newClasses);
    })
}

/*
|
| Dump
|--------
*/
export function dump(value){
  console.log(value);
}

/*
|
| Dispatch event
|-----------------
*/
export function dispachEvent($element, eventName, datas = null){
	var event = $.Event(eventName);

	if(datas !== null){
		for(let [key, value] of Object.entries(datas)){
			event[key] = value
		}
	}

	$element.trigger(event);
}

/*
|
| Check defined
|----------------
*/
export function isDefined(item) {
    return typeof item !== 'undefined';
}

/*
|
| Check exist
|-------------------
*/
export function exist(element) {
    return element.length;
}


/*
|
| Email validation
|-------------------
*/
export function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


/*
|
| LocomotiveScroll
|-------------------
*/
export function updateLocomotiveScroll() {
    if (window.locomotive != null) {
        window.locomotive.update();
    }
}

export function stopLocomotiveScroll() {
    if (window.locomotive != null) {
        window.locomotive.stop();
    }
}

export function startLocomotiveScroll() {
    if (window.locomotive != null) {
        window.locomotive.start();
    }
}

export function scrollTo(target, offset) {
    if (window.locomotive != null) {
        window.locomotive.scrollTo(target, offset);
    }
}

export function resetLocomotiveScroll() {
    if (window.locomotive !== null) {
        window.locomotive.destroy();
    }
}

export function initLocomotiveScroll(LocomotiveScroll) {
    window.locomotive = null;

    if (document.querySelector('.c-scrollbar') !== null) {
        document.querySelector('.c-scrollbar').remove();
    }

    window.locomotive = new LocomotiveScroll({
        el: document.querySelector('.locomotive-scroll-container'),
        smooth: true,
        inertia: 0.8
    });
}


/*
|
| Set cookie 
|------------
*/
export function setCookie(name, value, nbDays) {
    const date = new Date();
    date.setTime(date.getTime() + (nbDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}


/*
|
| Get cookie
|-------------------
*/
export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return null;
}

export function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}