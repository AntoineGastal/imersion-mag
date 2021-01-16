(function($){
	$.fn.replaceClass = function (oldClass, newClass) {
		return this.each(function () {
			$(this).removeClass(oldClass).addClass(newClass);
		});
	}

	/*
	|
	| Variables
	|------------
	*/
	var
		$debugTool = $('#debug-tool'),
		$toolbar = $debugTool.find('.toolbar'),
		$expandBtn = $toolbar.find('.btn-expand'),
		$retractBtn = $toolbar.find('.btn-retract'),
		defaultState = 'closed',
		$sidebar = $debugTool.find('.sidebar'),
		$sidebarLink = $sidebar.find('a');

	/*
	|
	| Action expand
	|----------------
	*/
	$expandBtn.on('click', function (e) {
		changeState(e, $(this), 'expanded', $retractBtn);
	});

	/*
	|
	| Action retract
	|-----------------
	*/
	$retractBtn.on('click', function (e) {
		changeState(e, $(this), 'retracted', $expandBtn);
	});

	if ($debugTool.hasClass('retracted')) {
		$retractBtn.trigger('click')
	}


	/*
	|
	| Toggle sidebar content
	|-------------------------
	*/
	$.each($sidebarLink, function (k, v) {
		var $link = $(this);
		var $target = $($link.attr('href'));

		$target[$link.hasClass('active') ? 'addClass' : 'removeClass']('active');
	});

	$sidebarLink.on('click', function (e) {
		e.preventDefault();

		var
			$link = $(this),
			$activeLink = $sidebar.find('a.active'),
			$target = $($link.attr('href')),
			$activetarget = $($activeLink.attr('href'));

		$activeLink.removeClass('active');
		$activetarget.removeClass('active');

		$link.addClass('active');
		$target.addClass('active');

	});


	/*
	|
	| Functions
	|------------
	*/
	function changeState(e, $btn, activeState, $otherBtn) {
		e.preventDefault();
		var
			stateIsNotActive = !$btn.hasClass('active'),
			defaultIcon = $btn.data('default-icon'),
			activeIcon = $btn.data('active-icon');

		if (stateIsNotActive) {
			$debugTool.replaceClass(defaultState, activeState);
			$otherBtn.removeClass('active');
			$btn.find('svg').replaceClass(defaultIcon, activeIcon)
		} else {
			$debugTool.replaceClass(activeState, defaultState);
			$btn.find('svg').replaceClass(activeIcon, defaultIcon)
		}

		$btn.toggleClass('active');
	}
})(jQuery)