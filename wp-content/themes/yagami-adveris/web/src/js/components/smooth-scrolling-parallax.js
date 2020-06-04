import Smooth from '../../lib/smooth-scrolling';

class SmoothScrollingParallax extends Smooth {

    constructor(opt) {
        super(opt)
        this.createExtraBound()
        this.resizing = false
        this.cache = null
        this.cacheX = null
        this.dom.divy = Array.prototype.slice.call(opt.divy, 0)
        this.dom.divx = Array.prototype.slice.call(opt.divx, 0)
    }

    createExtraBound() {
        ['getCache', 'inViewport', 'inViewportX']
        .forEach((fn) => this[fn] = this[fn].bind(this))
    }

    resize() {
        this.resizing = true
        this.getCache()
        super.resize()
        this.resizing = false
    }

    getCache() {
        this.cache = []
        this.cacheX = []
        this.dom.divy.forEach((el, index) => {
            el.style.display = 'block'
            el.style.transform = 'none'
            const scrollY = this.vars.target
            const bounding = el.getBoundingClientRect()
            const bounds = {
                el: el,
                state: true,
                top: bounding.top + scrollY,
                left: bounding.left,
                center: bounding.height / 2,
                bottom: bounding.bottom + scrollY,
                speed: el.getAttribute('data-smooth-parallax-y') || '-1'
            }
            
            this.cache.push(bounds)
        })

        this.dom.divx.forEach((el, index) => {
            el.style.display = 'block'
            el.style.transform = 'none'
            const scrollY = this.vars.target
            const bounding = el.getBoundingClientRect()
            const bounds = {
                el: el,
                state: true,
                top: bounding.top + scrollY,
                left: bounding.left,
                center: bounding.height / 2,
                bottom: bounding.bottom + scrollY,
                speed: el.getAttribute('data-smooth-parallax-x') || '-1'
            }
            
            this.cacheX.push(bounds)
        })


        // get bounding value based on the container (.vs-section) height
        this.vars.bounding = this.dom.section.getBoundingClientRect().height - (this.vars.native ? 0 : this.vars.height)
    }

    run() {
        this.dom.divy.forEach(this.inViewport)
        this.dom.divx.forEach(this.inViewportX)
        this.dom.section.style[this.prefix] = this.getTransform(this.vars.current * -1)
        super.run()
    }

    inViewport(el, index) {
        if (!this.cache || this.resizing) return
        const cache = this.cache[index]
        const current = this.vars.current
        const transform = ((cache.top + cache.center) - current) * cache.speed
        const top = Math.round((cache.top + transform) - current)
        const bottom = Math.round((cache.bottom + transform) - current)
        const inview = bottom > 0 && top < this.vars.height

        
        if (inview) {

        }
        el.style[this.prefix] = this.getTransform(transform)
        
        
        
    }

    inViewportX(el, index) {
        if (!this.cacheX || this.resizing) return
        const cache = this.cacheX[index]
        const current = this.vars.current
        const transform = ((cache.top + cache.center) - current) * cache.speed
        const top = Math.round((cache.top + transform) - current)
        const bottom = Math.round((cache.bottom + transform) - current)
        const inview = bottom > 0 && top < this.vars.height
        if (inview) {
            el.style[this.prefix] = `translate3d(${transform + 'px'},${0 + 'px'},${0 + 'px'})`;
        }
        
        //el.style[this.prefix] = this.getTransform(transform)
        
    }

    
}

export default SmoothScrollingParallax;