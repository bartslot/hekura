var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

//-- usage --//
preload(
    "../assets/img/sprites/clouds.png",
    "../assets/img/layer-4.png",
    "../assets/img/layer-7.png",
    "../assets/SVG/layer-1.svg",
    "../assets/SVG/layer-2.svg",
    "../assets/SVG/layer-3.svg",
    "../assets/img/moon.png",
    "../assets/img/feest1.png",
    "../assets/img/scene1-bg.jpg",
    "../assets/img/sprites/danceAnimations.png"
)