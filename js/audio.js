var howl = new Howl({
    src: ['/audio/sounds_hekura.mp3'], // root-absolute so /nl/ resolves too; the .webm never existed
    preload: true,
    html5: false,
    loop: false,
    autoUnlock: true,
    volume: 1, // Volume on
    sprite: {
        intro: [0, 28000],
        dance: [28000, 38000],
        silence: [250000, 340000], // starts around 4:10 in the source
        ritual: [350000, 250000] // starts around 5:50 in the source
    },
    // onplayerror: function() {
    //     scene1.once('unlock', function() {
    //         playwithFade();
    //     });
    // },
    onend: function() {
        console.log('Finished!');
    }
  });

let introStarted = false;
let danceId = null;
let introId = null;
let silenceId = null;
let ritualId = null;

function playIntro(){
  if (introStarted) return;
  introStarted = true;
  introId = howl.play("intro");
}

function triggerDanceLoop(){
  if (danceId !== null) return;
  if (introId !== null) {
    const currentIntroVol = howl.volume(introId);
    howl.fade(currentIntroVol, 0, 600, introId);
    setTimeout(() => howl.stop(introId), 620);
    introId = null;
  }
  if (silenceId !== null) {
    const currentSilenceVol = howl.volume(silenceId);
    howl.fade(currentSilenceVol, 0, 600, silenceId);
    setTimeout(() => howl.stop(silenceId), 620);
    silenceId = null;
  }
  if (ritualId !== null) {
    const currentRitualVol = howl.volume(ritualId);
    howl.fade(currentRitualVol, 0, 600, ritualId);
    setTimeout(() => howl.stop(ritualId), 620);
    ritualId = null;
  }
  danceId = howl.play("dance");
  howl.loop(true, danceId);
  howl.fade(0, 1, 800, danceId);
}

function playSilence(){
  if (silenceId !== null) return;
  silenceId = howl.play("silence");
  howl.loop(true, silenceId);
  howl.fade(0, 0.4, 800, silenceId);
}

function stopDanceLoop(startSilenceAfter = false){
  if (danceId === null) return;
  const currentVol = howl.volume(danceId);
  howl.fade(currentVol, 0, 800, danceId);
  setTimeout(() => {
    howl.stop(danceId);
    danceId = null;
    if (startSilenceAfter) playSilence();
  }, 820);
}

function stopSilence(){
  if (silenceId === null) return;
  const currentVol = howl.volume(silenceId);
  howl.fade(currentVol, 0, 800, silenceId);
  setTimeout(() => {
    howl.stop(silenceId);
    silenceId = null;
  }, 820);
}

function playRitual(){
  if (ritualId !== null) return;
  // fade out others
  if (danceId !== null) {
    const cv = howl.volume(danceId);
    howl.fade(cv, 0, 600, danceId);
    setTimeout(() => { howl.stop(danceId); danceId = null; }, 620);
  }
  if (silenceId !== null) {
    const cv = howl.volume(silenceId);
    howl.fade(cv, 0, 600, silenceId);
    setTimeout(() => { howl.stop(silenceId); silenceId = null; }, 620);
  }
  ritualId = howl.play("ritual");
  howl.loop(true, ritualId);
  howl.fade(0, 1, 800, ritualId);
}

function stopRitual(){
  if (ritualId === null) return;
  const currentVol = howl.volume(ritualId);
  howl.fade(currentVol, 0, 800, ritualId);
  setTimeout(() => {
    howl.stop(ritualId);
    ritualId = null;
  }, 820);
}

function stopwithFade(){
    console.log("stopping");
    stopDanceLoop();
}

function touchStarted() {
    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();

    }
  }

// expose minimal API
window.playIntro = playIntro;
window.triggerDanceLoop = triggerDanceLoop;
window.stopDanceLoop = stopDanceLoop;
window.playSilence = playSilence;
window.stopSilence = stopSilence;
window.playRitual = playRitual;
window.stopRitual = stopRitual;
window.playSilence = playSilence;
window.stopSilence = stopSilence;
