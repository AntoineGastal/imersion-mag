export default {
    init: (app) => {

        /*
        |
        | Constants
        |------------
        */
        const
            $loadMoreBtn = $('.load-more-btn'),
            $postsContainer = $('.loaded-posts'),
            $loadMoreContainer = $('.load-more-container'),
            $loadMore = $('.load-more'),
            $loaderContainer = $('.loader-container')
        ;
 
        let xhr = null;

        /*
        |
        | Load more ajax
        |--------------
        */
        $loadMoreBtn.on('click', function(e){

            e.preventDefault();
            
            abort(xhr);

            let offset = $postsContainer.find('.custom-card').length;
            let url = `/ajax/posts/${offset}/`;

            xhr = $.ajax({
                url: url,
                type: 'GET',
                method: 'GET',
                dataType: 'json',
                beforeSend: () => {
                    TweenMax.to($loadMore, 0.5, {autoAlpha: 0, y:30, display: "none", ease: Power1.easeOut, onComplete: () => {
                        TweenMax.fromTo($loaderContainer, 0.5, {autoAlpha: 0, y:30, display: "none"}, {autoAlpha: 1, y:0, display: "block", ease: Power1.easeOut})
                    }})
                },
                success: (response, status) => {

                    $postsContainer.append(response);

                    TweenMax.to($loaderContainer, 0.5, {autoAlpha: 0, y:50, display: "none", ease: Power1.easeOut});

                    if($(response).find('.no-more-post').length) {
                        $loadMoreContainer.remove();
                    } else {
                        TweenMax.to($loadMore, 0.5, {autoAlpha: 1, y:0, display: "block", ease: Power1.easeOut})
                    }

                    xhr = null;
                },
                error: (response, status, error) => {
                    console.log(error);
                }
            });
            
        });

        /*
        | HELPER
        |
        | abort ajax request
        |------------
        */
        function abort(xhrVar, $list = null){
            if (xhrVar !== null) {
                xhrVar.abort();
            }

            if($list !== null){
                $list.find('.loading--ajax').hide();
            }
        }

    }
}