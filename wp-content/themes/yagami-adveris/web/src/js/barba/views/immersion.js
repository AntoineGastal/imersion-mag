import BarbaInterface from "./interface";

class Immersions_single extends BarbaInterface {

    constructor(namespace) {
        super();
        this.namespace = namespace;
    }

    beforeEnter(data) {
        //console.log(data, this.namespace)
    }
}

export default About;