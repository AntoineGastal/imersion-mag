export default {
    init: (app, Menu, Kira, ScrollMagic, LocomotiveScroll, Scrollbar, TweenMax) => {
        /*
        |
        | Constants 
        |-----------
        */
        const 
        $body             = $('body'),
        $pageLoader       = $('.page-loader'),
        scrollAreas       = document.querySelectorAll('.scroll-area'),
        $menuWrapper      = $('#mobile-menu'),
        $menuButton       = $('#header .btn-menu'),
        $menuBars         = $menuButton.find('.item-burger > span'),
        $menuClose        = $menuWrapper.find('.item-close'),
        $menuStaggerItems = $menuWrapper.find('[data-stagger-item]')
        ; 
        
        /*
        |
        | Scroll Areas
        |---------------
        */
        Array.prototype.forEach.call(scrollAreas, element => { 
            Scrollbar.init(element);
        });
        
        /*
        |
        | Loader
        |---------
        */
        if (sessionStorage.getItem('loaded_once') === null) {
            sessionStorage.setItem('loaded_once', 'loaded_once');
        } 
        
        if ($pageLoader.hasClass('active')){
            const loaderTl = new TimelineMax({ paused: true, /*onComplete: () => $pageLoader.remove()*/ });
            
            loaderTl.to($pageLoader.find('.item-loadbar-inner'), 0.4, { scaleX: 1, ease: Power0.easeNone }, 'start')
            loaderTl.to($pageLoader.find('.item-content'), 0.8, { autoAlpha: 0, ease: Power1.easeOut }, '-=0')
            loaderTl.addCallback(() => { app.dispachEvent($body, 'loaderEnd'); })
            loaderTl.to($pageLoader, 0.8, { autoAlpha: 0, ease: Power1.easeOut }, '-=0')
            // setTimeout(() => { app.dispachEvent($body, 'loaderEnd'); }, 10000);
            $(window).on('load', function () {
                loaderTl.play();
            });
        } else {
            app.dispachEvent($body, 'loaderEnd');
        }
        
        
        /*
        |
        | Menu
        |-------
        */
        const menu = new Menu($menuWrapper, $menuButton, {
            reverseTimeScale: 2
        });
        
        menu.menuTimeline
        .to($menuBars.eq(1), 0.3, { autoAlpha: 0 }, 'start')
        .to($menuBars.eq(0), 0.5, { x: 0, y: 8, rotation: 45, ease: Power1.easeOut }, 'start')
        .to($menuBars.eq(2), 0.5, { x: 0, y: -8, rotation: -45, ease: Power1.easeOut }, 'start')
        //.to($menuWrapper, 0.5, { autoAlpha: 1, ease: Power1.easeOut }, 'start+=0.3')
        //.staggerFrom($menuStaggerItems, 0.6, { autoAlpha: 0, x: 20, ease: Power1.easeOut }, '0.1', '+=0')
        .to("#detection-panel", 1, { maxWidth:'100%', ease: Power2.easeInOut })
        .to("#menu", 1, { display:''})
        
        menu.init();
        
        /*
        |
        | Kira
        |-------
        */
        const kira = new Kira(ScrollMagic, {
            debug: false,
            loadEvent: {
                domElement: $body,
                eventName: 'loaderEnd'
            },
            optimize: true,
            options: {
                start: '-=0.6',
                triggerHook: 'onEnter'
            }
        });
        
        /*
        | typed
        |-----------------------
        */
        kira.add('typed', ($item, timeline, start) => {
            const split = new SplitText($item, { type: 'chars' });
            timeline.staggerFrom(split.chars, 0.4, { opacity: 0, ease: Power0.easeNone }, 0.1);
        });
        
        /*
        | fadeInUp.parallax.sm
        |-----------------------
        */
        kira.add('fadeInUp', ($item, timeline, start) => {
            timeline.from($item, 0.8, { y: 30, autoAlpha: 0, ease: Power1.easeOut }, start)
        });
        
        /*
        | fadeInUp.parallax.sm
        |-----------------------
        */
        kira.add('fadeInUp.parallax.sm', ($item, timeline, start) => {
            timeline.from($item, 0.8, { y: 100, autoAlpha: 0, ease: Sine.easeOut }, start)
        });
        
        /*
        | fadeInUp.parallax
        |--------------------
        */
        kira.add('fadeInUp.parallax', ($item, timeline, start) => {
            timeline.from($item, 1, { y: 80, autoAlpha: 0, ease: Power1.easeOut }, start)
        });
        
        
        /*
        | fadeInUp.parallax.sm
        |-----------------------
        */
        kira.add('fadeInLeft.stagger.sm', ($item, timeline, start) => {
            timeline.staggerFrom($item.find('[data-stagger-item]'), 0.6, { autoAlpha: 0, x: 20, ease: Power1.easeOut }, '0.1', start)
        });
        
        kira.add('fadeInUp.stagger.sm', ($item, timeline, start) => {
            timeline.staggerFrom($item.find('[data-stagger-item]'), 0.6, { autoAlpha: 0, y: 20, ease: Power1.easeOut }, '0.1', start)
        });
        
        /*
        | fadeInUp.parallax
        |--------------------
        */
        kira.add('scaleX', ($item, timeline, start) => {
            timeline.from($item, 1, { scaleX: 0, transformOrigin: 'left top', ease: Expo.easeInOut }, start)
        });
        
        /*
        | splitline
        |------------
        */
        kira.add('splitline', ($item, timeline, start) => {
            const split = new SplitText($item, { type: 'lines, words', linesClass: 'item-line' })
            
            $.each($item.find('.item-line'), function(key, value) {
                const s = key === 0 ? start : '-=1.1';
                
                timeline.from($(this).find('> div, > span'), 1.2, { y: '101%', ease: Power3.easeOut}, s)
            })
        });
        
        
        
        kira.init();
        
        
        
        /*--------------------
        OBJET 3D HOME
        --------------------*/
        //console.clear();
        const canvas = document.querySelector('#bubble');
        let width = canvas.offsetWidth,
        height = canvas.offsetHeight;
        let camera; // AG
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        const scene = new THREE.Scene();
        
        const setup = () => {
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize(width, height);
            renderer.setClearColor(0xebebeb, 0);
            renderer.shadowMap.enabled = true;
            renderer.shadowMapSoft = true;
            
            scene.fog = new THREE.Fog(0x000000, 10, 950);
            
            const aspectRatio = width / height;
            const fieldOfView = 100;
            const nearPlane = 0.1;
            const farPlane = 10000;
            
            camera = new THREE.PerspectiveCamera(
                fieldOfView,
                aspectRatio,
                nearPlane,
                farPlane
                );
                camera.position.x = 0;
                camera.position.y = 0;
                camera.position.z = 300;
            }
            setup();
            
            
            /*--------------------
            Lights
            --------------------*/
            let hemispshereLight, shadowLight, light2, light3;
            const createLights = () => {
                //hemisphereLight = new THREE.HemisphereLight(0xffffff,0x000000, .5)
                
                shadowLight = new THREE.DirectionalLight(0xff8f16, .4);
                shadowLight.position.set(0, 450, 350);
                shadowLight.castShadow = true;
                
                shadowLight.shadow.camera.left = -650;
                shadowLight.shadow.camera.right = 650;
                shadowLight.shadow.camera.top = 650;
                shadowLight.shadow.camera.bottom = -650;
                shadowLight.shadow.camera.near = 1;
                shadowLight.shadow.camera.far = 1000;
                
                shadowLight.shadow.mapSize.width = 4096;
                shadowLight.shadow.mapSize.height = 4096;
                
                light2 = new THREE.DirectionalLight(0xfff150, .25);
                light2.position.set(-600, 350, 350);
                
                light3 = new THREE.DirectionalLight(0xfff150, .15);
                light3.position.set(0, -250, 300);
                
                //scene.add(hemisphereLight);  
                scene.add(shadowLight);
                scene.add(light2);
                scene.add(light3);
            }
            createLights();
            
            
            /*--------------------
            Bubble
            --------------------*/
            const vertex = width > 575 ? 80 : 40;
            const bubbleGeometry = new THREE.SphereGeometry( 120, vertex, vertex );
            let bubble;
            const createBubble = () => {
                for(let i = 0; i < bubbleGeometry.vertices.length; i++) {
                    let vector = bubbleGeometry.vertices[i];
                    vector.original = vector.clone();  
                }
                const bubbleMaterial = new THREE.MeshStandardMaterial({
                    emissive: 0xbd4be3,
                    emissiveIntensity: 0.5,
                    roughness: 0.61,
                    metalness: 0.21,
                    side: THREE.FrontSide,
                    //wireframe: true
                });
                bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
                bubble.castShadow = true;
                bubble.receiveShadow = false;
                scene.add(bubble);
            }
            createBubble();
            
            
            /*--------------------
            Plane
            --------------------*/
            const createPlane = () => {
                const planeGeometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
                const planeMaterial = new THREE.ShadowMaterial({
                    opacity: 0.15
                });
                const plane = new THREE.Mesh( planeGeometry, planeMaterial );
                plane.position.y = -150;
                plane.position.x = 0;
                plane.position.z = 0;
                plane.rotation.x = Math.PI / 180 * -90;
                plane.receiveShadow = true;
                scene.add(plane);
            }
            createPlane();
            
            
            /*--------------------
            Map
            --------------------*/
            const map = (num, in_min, in_max, out_min, out_max) => {
                return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            }
            
            
            /*--------------------
            Distance
            --------------------*/
            const distance = (a, b) => {
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const d = Math.sqrt( dx * dx + dy * dy );
                return d;
            }
            
            
            /*--------------------
            Mouse
            --------------------*/
            let mouse = new THREE.Vector2(0, 0);
            const onMouseMove = (e) => {
                TweenMax.to(mouse, 0.8, {
                    x : e.clientX || e.pageX || e.touches[0].pageX || 0,
                    y: e.clientY || e.pageY || e.touches[0].pageY || 0,
                    ease: Power2.easeOut
                });
            };
            ['mousemove', 'touchmove'].forEach(event => {
                window.addEventListener(event, onMouseMove);  
            });
            
            
            /*--------------------
            Spring
            --------------------*/
            let spring = {
                scale: 1
            };
            const clicking = {
                down: () => {
                    TweenMax.to(spring, .7, {
                        scale: .7, 
                        ease: Power3.easeOut
                    });
                },
                up: () => {
                    TweenMax.to(spring, .9, {
                        scale: 1, 
                        ease: Elastic.easeOut
                    });
                }
            };
            ['mousedown', 'touchstart'].forEach(event => {
                window.addEventListener(event, clicking.down);
            });
            ['mouseup', 'touchend'].forEach(event => {
                window.addEventListener(event, clicking.up);
            });
            
            
            /*--------------------
            Resize
            --------------------*/
            const onResize = () => {
                canvas.style.width = '';
                canvas.style.height = '';
                width = canvas.offsetWidth;
                height = canvas.offsetHeight;
                camera.aspect = width / height;
                camera.updateProjectionMatrix(); 
                maxDist = distance(mouse, {x: width / 2, y: height / 2});
                renderer.setSize(width, height);
            }
            let resizeTm;
            window.addEventListener('resize', function(){
                resizeTm = clearTimeout(resizeTm);
                resizeTm = setTimeout(onResize, 200);
            });
            
            
            /*--------------------
            Noise
            --------------------*/
            let dist = new THREE.Vector2(0, 0);
            let maxDist = distance(mouse, {x: width / 2, y: height / 2});
            const updateVertices = (time) => {
                dist = distance(mouse, {x: width / 2, y: height / 2});
                dist /= maxDist;
                dist = map(dist, 1, 0, 0, 1);
                for(let i = 0; i < bubbleGeometry.vertices.length; i++) {
                    let vector = bubbleGeometry.vertices[i];
                    vector.copy(vector.original);
                    let perlin = noise.simplex3(
                        (vector.x * 0.006) + (time * 0.0005),
                        (vector.y * 0.006) + (time * 0.0005),
                        (vector.z * 0.006)
                        );
                        let ratio = ((perlin * 0.3 * (dist + 0.1)) + 0.8);
                        vector.multiplyScalar(ratio);
                    }
                    bubbleGeometry.verticesNeedUpdate = true;
                }
                
                
                /*--------------------
                Animate
                --------------------*/
                const render = (a) => {
                    requestAnimationFrame(render);
                    bubble.rotation.y= -4 + map(mouse.x, 0, width, 0, 4);
                    bubble.rotation.z= 4 + map(mouse.y, 0, height, 0, -4);
                    bubble.scale.set(spring.scale, spring.scale, spring.scale);
                    updateVertices(a);
                    renderer.clear();
                    renderer.render(scene, camera);
                }
                requestAnimationFrame(render);
                renderer.render(scene, camera);
                
                /*
                |
                | Init Locomotive scroll
                |-------
                */
                
                $body.on('loaderEnd', () => {
                    window.locomotive = new LocomotiveScroll({
                        el: document.querySelector('[locomotive-scroll-container]'),
                        smooth: true,
                        inertia: 1
                    });
                    console.log('SmoothScroll', window.locomotive);
                    
                });
                
                
            }
        }