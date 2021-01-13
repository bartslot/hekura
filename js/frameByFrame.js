const $element = $('.moveSprite');
const className = '.bg';
const totalFrames = 3;
const animationDuration = 1300;
const timePerFrame = animationDuration / totalFrames;
let timeWhenLastUpdate;
let timeFromLastUpdate;
let frameNumber = 1;

function step(startTime) {
  if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;

  timeFromLastUpdate = startTime - timeWhenLastUpdate;

  if (timeFromLastUpdate > timePerFrame) {
    $element.attr('class', className + `1${frameNumber}`);
    timeWhenLastUpdate = startTime;

    if (frameNumber >= totalFrames) {
      frameNumber = 1;
    } else {
       frameNumber = frameNumber + 1;
    }        
  }

  requestAnimationFrame(step);
}