import BarbaInterface from "./interface";

class About extends BarbaInterface {

    constructor(namespace) {
        super();
        this.namespace = namespace;
    }

    beforeEnter(data) {
        //console.log(data, this.namespace)
    }
}

export default About;