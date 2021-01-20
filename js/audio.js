var howl = new Howl({
    src: ['./audio/sounds_hekura.mp3', './audio/sounds_hekura.webm'],
    preload: true,
    html5: false,
    loop: false,
    autoUnlock: true,
    volume: .8,
    sprite: {
        intro: [0, 340000],
        gesprek: [15000, 17000],
        end: [20000, 30000]
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

// const theme = new Howl({
//     src: ['./audio/scene1.mp3', './audio/scene1.webm'],
//     html5: true,
//     loop: true,
//     volume: 0.3
// });

// var id3 = scene1.play("end");

function playwithFade(string){
  howl.play("intro");
}
    
// }
// var scene1 = howl.play("intro");
// var id2 = howl.play("gesprek");

function stopwithFade(){
    console.log("stopping");
    // scene1.fade(1, 0, 2000, id1);
}

function touchStarted() {
    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();



    }
  }