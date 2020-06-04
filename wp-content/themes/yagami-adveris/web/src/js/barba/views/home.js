import BarbaInterface from "./interface";

class Home extends BarbaInterface {

    constructor(namespace) {
        super();
        this.namespace = namespace;
    }

    beforeEnter(data) {
        //console.log('view:beforeEnter', data, this.namespace)
    }
}

export default Home;