gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(TextPlugin);

function random(minNumber, maxNumber) {
  if (maxNumber <= 1) {
    return randomnumber = gsap.utils.random(minNumber, maxNumber, .1, true);
  }else {
    return randomnumber = gsap.utils.random(minNumber, maxNumber, 2, true);
  }
  
}
document.addEventListener('DOMContentLoaded', () => {
  
  const tl = gsap.timeline({ });
  const clouds = gsap.timeline({
      yoyo: true,
      scrollTrigger: {
          trigger: ".start",
          pin: true,
          start: "top",
          end: "+=2200",
          scrub: true
      }
  });
  const dark = gsap.timeline({
    yoyo: true,
    scrollTrigger: {
        trigger: "#dark",
        // pin: true,
        start: "top",
        // pin: ".grunge",
        end: "bottom",
        // scrub: true
    }
});
  logo();

  gsap.utils.toArray(".inner-stars>path").forEach(layer => {
    tl.set (layer, { x: random(0, 3000), y: random(0, 1200), transformOrigin: "center"}, 0)
  });  
  gsap.utils.toArray(".cloud").forEach(layer => {
      tl.set(layer, { opacity:random(.4, 1),  scale: random(1, 3), ease: "none"}, 0)
      tl.fromTo(layer, {x: random(400, 1600), y: random(0, 700)}, {duration: 20, x: random(-400, -1600)})
  });
  const parallax = gsap.timeline({
    scrollTrigger: {
      trigger: "#rainForestHills",
      scrub: true,
      start:"top top",
      end:"+=120%",
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
  parallax.to ("body.scene1", {
    backgroundColor: '#000', duration: 0
  }); 
  
  clouds.to(".skyClouds", { 
      opacity: 1,
      x: -500,
      duration: 15
  });


  // Muziek
  // ScrollTrigger.create({
  //     trigger: "#dark",
  //     onEnter: playwithFade('fire'),
  //     onEnterBack: playwithFade(),
  //     onLeaveBack: stopwithFade(),
  //   });
  dark.set('.dance2',{y:-300})
      .set('.dance3',{y:-600})
      .set('.dance4',{y:-900})
      .set('.fire-wrapper',{scale:2})
  gsap.utils.toArray(".dance").forEach(layer => { 
    dark.to(layer,.8,{repeat:-1,x:-600, ease: SteppedEase.config(2)})
  });
  gsap.utils.toArray(".dance-animation-wrapper").forEach(layer => { 
    dark.set(layer,{xPercent: 40, yPercent: 50, force3D:true})
  });
    dark
      .to(".grunge", { autoAlpha:1, duration: -1})
      .to(".fire", 2, {repeat:-1, x:-5220, ease: SteppedEase.config(18)})
      .from(".flyInLeft", { x:-500, duration: 13, skew:-1})
      .from (".flyInRight", 1, { x: 2500, duration: 13, skew: -1})

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
      
      // Fade to black
      // .to ("#logo-inner *", 9,{ opacity: 0, y:-500, blur: 2, stagger: 0.1}, "-=.5")
  }
})