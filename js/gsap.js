gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(TextPlugin);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
});


function random(minNumber, maxNumber) {
  if (maxNumber <= 1) {
    return randomnumber = gsap.utils.random(minNumber, maxNumber, .1, true);
  }else {
    return randomnumber = gsap.utils.random(minNumber, maxNumber, 2, true);
  }
  
}
gsap.to(".btn>.fade", {repeat: -1, repeatDelay: .3, opacity: .1, yoyo: true, ease: "power1.out", stagger: .2});


document.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline({
    paused: true, 
    defaults: { duration: 3 }
  })

  document.getElementById("start").addEventListener("click", startStory);
  document.getElementById("comic5-card").addEventListener("click", openCard("#comic5-card"));

  function startStory () {
    gsap.to("#overlay", { duration: 1, blur: 20, opacity: 0});
    
    tl.restart();
    let cancelId;
    // ...
    cancelId = window.setTimeout(function() {
      $("#overlay").remove();
    }, 1000);
    playwithFade();
  }
    const clouds = gsap.timeline({
        yoyo: true,
        scrollTrigger: {
            trigger: ".start",
            pin: true,
            scroller: ".smooth-scroll",
            start: "top",
            end: "+=2200",
            scrub: true
        }
    });
    const dark = gsap.timeline({
      yoyo: true,
      scrollTrigger: {
          trigger: "#dark",
          scroller: ".smooth-scroll",
          start: "-=60%",
          end: "bottom"
      }
  });

  logo();
  
    gsap.utils.toArray(".inner-stars>path").forEach(layer => {
      tl.set (layer, { x: random(0, 3000), y: random(0, 1200), transformOrigin: "center"}, 0)
    });  
    gsap.utils.toArray(".cloud").forEach(layer => {
        tl.set(layer, { opacity:random(.4, 1), x: random(1200, 1600), blur: random(0, 3), y: random(500, 700),  scale: random(2, 4)}, 0)
        // tl.fromTo(layer, {x: random(400, 1600), y: random(0, 700)}, {duration: 3, x: random(-400, -1600)})
    });
    const parallax = gsap.timeline({
      scrollTrigger: {
        trigger: "#rainForestHills",
        scroller: ".smooth-scroll",
        markers: true,
        scrub: true,
        start:"-=100%",
        end:"-=10%"
      },
      ease: "none"
    });
    const comic = gsap.timeline({
      scrollTrigger: {
        trigger: "#comic",
        scroller: ".smooth-scroll",
        scrub: true,
        start:"top top",
        end:"bottom"
      },
      ease: "none"
    });


    // ScrollTrigger.create({
    //       trigger: "onload",
    //       onEnter: logo(),
    //       onEnterBack: playwithFade(),
    //       onLeaveBack: stopwithFade()
    //     });
    
    gsap.utils.toArray(".parallax").forEach(layer => {
      const depth = layer.dataset.depth;
      const movement = -(layer.offsetHeight * depth);
      parallax.to(layer, {y: movement, ease: "none"}, 0)
    });
    parallax.to ("body.scene1", { backgroundColor: '#000', duration: 0}); 
    
    clouds  .to ("#mouse", .1, {autoAlpha: 0})
            .to(".skyClouds", { opacity: 1, x: -500, duration: 15 });
  
  
    // Muziek
    // ScrollTrigger.create({
    //     trigger: "#dark",
    //     onEnter: playwithFade('fire'),
    //     onEnterBack: playwithFade(),
    //     onLeaveBack: stopwithFade(),
    //   });
    
    
    
    
      dark
        .to(".grunge", { autoAlpha:.9, duration: 4})
        .set('.dance2',{y:-300},"<")
        .set('.dance3',{y:-600},"<")
        .set('.dance4',{y:-900},"<")
        .set('.fire-wrapper',{scale:2},"<")
        .to(".fire", 2, {repeat:-1, x:-5220, blur: 2, ease: SteppedEase.config(18)},"<")
        gsap.utils.toArray(".dance").forEach(layer => { dark.to(layer,.8,{repeat:-1,x:-600, ease: SteppedEase.config(2)}, "<")})

      comic
      .from (".flyInLeft", 1, { x:-500, duration: 2})
      .from (".flyInRight", 1, { x: 2500, duration: 2})
  
    function logo(){
      tl.from ("#logo", 1, { x:5000, opacity: 0, scale: 1}) //inner-stars
        .from (".logo-subtitle", .3,{ opacity: 0, y:-2, stagger: 0.1}) 
        .from (".logo-title", 1,{ opacity: 0, y:-50, stagger: 0.1, ease:"power3.inOut"}, "-=.2")
        
        .from (".inner-stars path", 2,{ scale: 0, opacity: 0, rotate: 720, y:random(-1020,120), x:random(-1000,120), stagger: 0.1}, "-=1") 
        .from (".inner-stars path", -1, { rotate: 360}, "-1") 
        
        .from (".logo-inner-element", 2, { opacity: 0, rotate: 30, transformOrigin: "center", ease: "power4.inOut"})
        .from (".anim", .2, { opacity: 0, x: -20, y: -20, rotate:180, stagger: 0.2, transformOrigin: "center"}, "-=1.2")
        .from (".inner-rounded", .2, { opacity: 0, scale: 2, stagger: 0.2, transformOrigin: "bottom"})
        .from (".inner-rounded>path", .2, { opacity: 0, rotate:180, stagger: 0.1})
        
        .to ("#mouse", .4, { delay: 4, autoAlpha: .8})
        .to ("#mouseWheel", .2, {autoAlpha: 1, repeat: -1, repeatDelay: .4, y: 7, yoyo: true})
        // Fade to black
        // .to ("#logo-inner *", 9,{ opacity: 0, y:-500, blur: 2, stagger: 0.1}, "-=.5")
    }
})

function openCard(thisCard) {
    $(thisCard).toggleClass( "toggle-show" )
}
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();