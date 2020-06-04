export default {
	init: (app) => {
		app.dump('sample.js');

		/*
		|
		| Constants
		|-----------
		*/
		const 
			$loadedPostsContainer = $('.loaded-posts')
		;

		
		/*
		|
		| Ajax Sample
		|--------------
		*/
		$('[data-ajax-url]').on('click', function(e){
            e.preventDefault();
            
			$.ajax({
				url: $(this).data('ajax-url'),
				type: 'GET',
				dataType: 'json',
				success: (response, status) => {
					$loadedPostsContainer.append(response);
				},
				error: (response, status, error) => {
					console.log(response, status, error);
				}
			})
		});
	}
}
