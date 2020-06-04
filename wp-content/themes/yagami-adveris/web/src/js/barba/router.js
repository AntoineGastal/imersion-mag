/*
|--------------------------------------------------------------------------------
|                                   BarbaRouter
|--------------------------------------------------------------------------------
|
| BarbaRouter helps to handle scripts execution in Barba context
|
*/

class BarbaRouter{
    /*
    |
    | Constructor
    |--------------
    */
    constructor(params = {}){
        const { global = [], routes = [] } = params;

        this.views = [];
        this.generatedRoutes = {};

        this.init(global, routes)
        
    }


    /*
    |
    | init
    |-------
    */
    init(global, routes) {
        routes.map(route => {
            const { namespace, view, ...routeObj } = route;
            
            this.generatedRoutes[route.namespace] = [...global, ...[routeObj]];
            
            if (typeof view === 'function') {
                this.views.push(new view(namespace));
            }
        });
    }


    /*
    |
    | load
    |-------
    */
    load(namespace){
        if (this.generatedRoutes.hasOwnProperty(namespace)){
            this.generatedRoutes[namespace].map(route => this.run(route))
        }
    }


    /*
    |
    | run
    |------
    */
    run(route){
        route.file.init.apply(null, route.dependencies);
    }
    

    /*
    |
    | getViews
    |-----------
    */
    getViews(){
        return this.views;
    }
}

export default BarbaRouter;