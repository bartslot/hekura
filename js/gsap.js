gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(TextPlugin);

var live = true;
var jupjup = false;

function random(minNumber, maxNumber) {
  if (maxNumber <= 1) {
    return randomnumber = gsap.utils.random(minNumber, maxNumber, .1, true);
  }else {
    return randomnumber = gsap.utils.random(minNumber, maxNumber, 2, true);
  }
}
if (live) { 
  const locoScroll = new LocomotiveScroll({ el: document.querySelector(".smooth-scroll"), smooth: true});
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

  var readPoints = 0;
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const readIt = gsap.timeline({ paused: true });
  


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

  // Global
  gsap.to(".btn>.fade", {repeat: -1, repeatDelay: .1, opacity: .1, yoyo: true, ease: "power2.out", stagger: .2});

  document.addEventListener('DOMContentLoaded', () => {
    // if ($("body").data("title") === "scene1") { 


  document.getElementById("start").addEventListener("click", startStory);
 
  const tl = gsap.timeline({
    paused: true, 
    defaults: { duration: 3 }
  })
  
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
        scrollTrigger: { trigger: ".start",
            pin: true,
            scroller: ".smooth-scroll",
            start: "top",
            end: "+=2200",
            scrub: true
        }});
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
      markers: false,
      scrub: true,
      start:"-=70%",
      end:"bottom"
    },
    ease: "none"
  });

  gsap.utils.toArray(".parallax").forEach(layer => { const depth = layer.dataset.depth; const movement = -(layer.offsetHeight * depth); parallax.to(layer, {y: movement, ease: "none"}, 0)});

  parallax.to ("body.scene1", { backgroundColor: '#000', duration: 0}); 
  clouds  .to ("#mouse", .1, {autoAlpha: 0}) .to(".skyClouds", { opacity: 1, x: -500, duration: 15 });
  dark
    .to(".grunge", { autoAlpha:.9, duration: 4})
    .set('.dance2',{y:-300},"<")
    .set('.dance3',{y:-600},"<")
    .set('.dance4',{y:-900},"<")
    .set('.fire-wrapper',{scale:2},"<")
    .to(".fire", 2, {repeat:-1, x:-5220, blur: 2, ease: SteppedEase.config(18)},"<")
    gsap.utils.toArray(".dance").forEach(layer => { dark.to(layer,.8,{repeat:-1,x:-600, ease: SteppedEase.config(2)}, "<")})

      
  // Comic scrolltriggers

  const comic1 = gsap.timeline({ scrollTrigger: { trigger: ".comic1", scroller: ".smooth-scroll", start:"top +120%", end:"bottom", scrub: true}});
  
    comic1.from("#comic .comic1", 1,{autoAlpha:0, delay: .2}).to("#comic .comic1", 1,{y:-400, x:-100, ease: "power3.inOut"},"<")
  
  const comic2 = gsap.timeline({ scrollTrigger: { trigger: ".comic2", scroller: ".smooth-scroll", start:"top +120%", end:"bottom", scrub: true }});
    
    comic2.from("#comic .comic2", 1,{autoAlpha:0})
          .from("#comic #bubble2", 1,{autoAlpha:0.7, delay: .3}, "<")
          .to("#comic .bubblewrapper-2", 1,{y:-400, ease: "power3.inOut"},"<")
          .to("#comic .comic2", 1,{y:-400, ease: "power2.inOut"},"<")
  const comic3 = gsap.timeline({ scrollTrigger: { trigger: ".comic3", scroller: ".smooth-scroll", start:"top +110%", end:"bottom", scrub: true }});
    
    comic3.from("#comic .comic3", 1,{y:400 ,scale: 0.7, delay: .3})
          .from("#comic #bubble3", 1,{autoAlpha: 0.7 }, "<")
          
          .to("#comic .bubblewrapper-3", 1,{y:-400,autoAlpha:0, ease: "power3.inOut"})
  
  const comic4 = gsap.timeline({ scrollTrigger: { trigger: ".comic3", scroller: ".smooth-scroll", start:"top center", end:"bottom", scrub: true }});

    comic4
        .from("#comic .bubblewrapper-4, #comic .comic4", 2,{autoAlpha:.2}, "<")
        .from("#comic .comic4, #comic .bubblewrapper-4", 1,{  x:-100}, "<")
        .to("#comic .comic4, #comic .bubblewrapper-4", 1,{scale: 1.2, y:-400, ease: "power3.inOut"},"<")

  const ritual = gsap.timeline({ scrollTrigger: { 
    trigger: ".ritual-row",
    scroller: ".smooth-scroll",
    start:"top +50%",
    end:"bottom top",
    // pin: true,
    scrub: true,
    markers: true
    }});
    ritual 
      .add( function(){ theRitual(true) } )
      .from('#ritual', 2,{autoAlpha:0})
      .to('#ritual', 1,{autoAlpha:1})
      .to('#ritual', 10,{scale:20, blur: 3},"3")
      .add( function(){ jupjup = false; } )

  // comic1.to("#comic .image",  2,{autoAlpha:1, y:20, ease: "power3.Out"}),"+=4"})

      // comic2
      // .from (".comic2", 1, { autoAlpha: 0, duration: .2})
      // .from ("#bubble2", 1, { autoAlpha: 0, duration: .2})
      // .from ("#bubble4", 1, { autoAlpha: 0, duration: .2})
      // .from ("#bubble5", 1, { autoAlpha: 0, duration: .2})
  
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

  $('body').on("click touchstart", "#comic5-btn", function(e){
    if (readPoints > 0) {
      return;
    } else {
      $( "#comic5-card" ).toggle();
      gsap.from("#comic5-card", 1, { blur: 20, autoAlpha: 0, ease: "power1.out"});
      $( ".readIt-wrapper" ).toggle();
    }
    
  });
  $('body').on("click touchstart", "#iHaveReadIt", function(e){
    $( "#comic5-btn" ).toggle();
    readPoints =+1;
    $("#readPoints").html(readPoints);
    readIt.play(0);
    window.setTimeout(function() {
      $( "#comic5-card" ).toggle();
    }, 1000);
  });
  readIt.to(".readIt-wrapper", 1,{ scale: 1.3, y:-10, rotate: 720, ease: "power3.inOut"})
        .to(".readIt-wrapper", 1,{ scale: 1, y:0, ease: "power3.inOut"})



  // ScrollTrigger.create({
  //       trigger: "onload",
  //       onEnter: logo(),
  //       onEnterBack: playwithFade(),
  //       onLeaveBack: stopwithFade()
  //     });

  // Muziek
  // ScrollTrigger.create({
  //     trigger: "#dark",
  //     onEnter: playwithFade('fire'),
  //     onEnterBack: playwithFade(),
  //     onLeaveBack: stopwithFade(),
  //   });
}