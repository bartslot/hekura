// var scene1 = new Howl({
//     src: ['./audio/scene1.mp3', './audio/scene1.webm'],
//     preload: true,
//     html5: false,
//     loop: false,
//     volume: 0.3,
//     sprite: {
//         intro: [0, 13000],
//         mid: [15000, 17000],
//         end: [20000, 30000]
//     },
//     // onplayerror: function() {
//     //     scene1.once('unlock', function() {
//     //         playwithFade();
//     //     });
//     // },
//     onend: function() {
//         console.log('Finished!');
//     }
//   });

const theme = new Howl({
    src: ['./audio/scene1.mp3', './audio/scene1.webm'],
    html5: true,
    loop: true,
    volume: 0.3
});

theme.play();


var id1 = scene1.play("intro");
var id2 = scene1.play("mid");
var id3 = scene1.play("end");

// function playwithFade(){
//   if (!id1.playing){
//     console.log("playing Intro");
//     scene1.fade(0, 1, 2000, id1);
//   }
    
// }

function stopwithFade(){
    console.log("stopping");
    // scene1.fade(1, 0, 2000, id1);
}

function touchStarted() {
    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
    }
  }