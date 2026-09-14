var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

//-- usage --//
preload(
    "../assets/img/sprites/clouds.webp",
    "../assets/img/layer-4.webp",
    "../assets/img/layer-7.webp",
    "../assets/SVG/layer-1.svg",
    "../assets/SVG/layer-2.svg",
    "../assets/SVG/layer-3.svg",
    "../assets/img/moon.webp",
    "../assets/img/feest1.webp",
    "../assets/img/scene1-bg.jpg",
    "../assets/img/sprites/danceAnimations.webp"
)