/*
 * pixelBeat - Web Etude No. 2
 * The aim of this sketch is to pixellize the video. From this we use the pixel array to look at the brightness
 * of individual arrays - then this is turned into music
 *
 *
 *
 */

//Video File Pointers & Canvas
var video;
var vidDisplay;
var canvas;
var vscale = 40;
var rects = [];

//SAMPLER///
var sampler;
var sampler2;
var sampler3;

//UI ---------------------

//CircularSlider
var slider;
var buttonVid;
var isPlaying = false;

//
var sliderDiv;
var sliderDiv2;

var sliderRad = 220;
var margin = 30




var notes = ["A.1", "A.2", "A.3", "A.4", "A.5", "A.6",
    "B.1", "B.2", "B.3", "B.4", "B.5", "B.6",
    "C.1", "C.2", "C.3", "C.4", "C.5", "C.6",
    "D.1", "D.2", "D.3", "D.4", "D.5", "D.6"
];


var synthNotes = ["Bb2", "Db3", "Eb3", "Gb3", "Ab3", "Bb3", "Db4", "Eb4", "Gb4", "Ab4", "Bb4", "Db5", "Eb5", "Gb5", "Ab5", "Bb5"];

function Rectangle(_x, _y, _width, _height, _sample, _note) {
    this.x = _x;
    this.y = _y;
    this.theta = (atan2((_y - 4 * _height), (_x - 6 * _width)) * (180 / PI)) + 180;
    this.isOn = true;
    this.ring1 = true;
    this.ring2 = true;
    this.ring3 = true;
    this.width = _width;
    this.height = _height;
    this.sample = _sample;
    this.note = _note;
    this.counter = 10;
    this.display = function() {
        noFill();
        if (this.ring3) {
            fill(255, 0, 0);
            rect(this.x, this.y, this.width, this.height);
        } else {
            fill(255);
            rect(this.x, this.y, this.width, this.height);
        }

    };
    this.displayTrigger = function() {
        fill(255, 0, 0, 200);
        stroke(255, 0, 0);
        rect(this.x + vscale / 2, this.y + vscale / 2, this.width, this.height);

    };

}



//TONE.JS EFFECTS
var pingPong = new Tone.PingPongDelay("2n", 0.3).toMaster();
pingPong.wet.value = 0.4;




//PRELOAD - SAMPLERS
function preload() {

    //ACOUSTIC SAMPLER
    sampler = new Tone.Sampler({
        A: {
            1: "./audio/piano/piano1.wav",
            2: "./audio/piano/piano2.wav",
            3: "./audio/piano/piano3.wav",
            4: "./audio/piano/piano4.wav",
            5: "./audio/piano/piano5.wav",
            6: "./audio/piano/piano6.wav",



        },

        B: {
            1: "./audio/cello/cello1.wav",
            2: "./audio/cello/cello2.wav",
            3: "./audio/cello/cello3.wav",
            4: "./audio/cello/cello4.wav",
            5: "./audio/cello/cello5.wav",
            6: "./audio/cello/cello6.wav",



        },
        C: {
            1: "./audio/hang/hang1.wav",
            2: "./audio/hang/hang2.wav",
            3: "./audio/hang/hang3.wav",
            4: "./audio/hang/hang4.wav",
            5: "./audio/hang/hang5.wav",
            6: "./audio/hang/hang6.wav",



        },
        D: {
            1: "./audio/violin/violin1.wav",
            2: "./audio/violin/violin2.wav",
            3: "./audio/violin/violin3.wav",
            4: "./audio/violin/violin4.wav",
            5: "./audio/violin/violin5.wav",
            6: "./audio/violin/violin6.wav",



        }
    }).connect(pingPong);

    //ELECTRONIC SAMPLER
    sampler2 = new Tone.Sampler({
        A: {
            1: "./audio/beatz/beat_1.wav",
            2: "./audio/beatz/beat_2.wav",
            3: "./audio/beatz/beat_3.wav",
            4: "./audio/beatz/beat_4.wav",
            5: "./audio/beatz/beat_5.wav",
            6: "./audio/beatz/beat_6.wav",



        },
        B: {
            1: "./audio/synth/synth_1.wav",
            2: "./audio/synth/synth_2.wav",
            3: "./audio/synth/synth_3.wav",
            4: "./audio/synth/synth_4.wav",
            5: "./audio/synth/synth_5.wav",
            6: "./audio/synth/synth_6.wav",



        },
        // D: {
        //   1: "./audio/synthBass/bass_1.wav",
        //   2: "./audio/synthBass/bass_2.wav",
        //   3: "./audio/synthBass/bass_3.wav",
        //   4: "./audio/synthBass/bass_4.wav",
        //   5: "./audio/synthBass/bass_5.wav",
        //   6: "./audio/synthBass/bass_6.wav",




        C: {
            1: "./audio/space/space1.wav",
            2: "./audio/space/space2.wav",
            3: "./audio/space/space3.wav",
            4: "./audio/space/space4.wav",
            5: "./audio/space/space5.wav",
            6: "./audio/space/space6.wav",



        },
        D: {
            1: "./audio/choirElec/choir_1.wav",
            2: "./audio/choirElec/choir_2.wav",
            3: "./audio/choirElec/choir_3.wav",
            4: "./audio/choirElec/choir_4.wav",
            5: "./audio/choirElec/choir_5.wav",
            6: "./audio/choirElec/choir_6.wav",



        }
    }).connect(pingPong);


    // sampler.reverse = true;
    sampler2.reverse = true;

    // GUITAR SAMPLER
    sampler3 = new Tone.Sampler({
        // A: {
        //   1: "./audio/drum/drum1.wav",
        //   2: "./audio/drum/drum2.wav",
        //   3: "./audio/drum/drum3.wav",
        //   4: "./audio/drum/drum4.wav",
        //   5: "./audio/drum/drum5.wav",
        //   6: "./audio/drum/drum6.wav",



        // },
        A: {
            1: "./audio/guitar1/guitar1.wav",
            2: "./audio/guitar1/guitar2.wav",
            3: "./audio/guitar1/guitar3.wav",
            4: "./audio/guitar1/guitar4.wav",
            5: "./audio/guitar1/guitar5.wav",
            6: "./audio/guitar1/guitar6.wav",



        },
        B: {
            1: "./audio/guitar2/guitar1.wav",
            2: "./audio/guitar2/guitar2.wav",
            3: "./audio/guitar2/guitar3.wav",
            4: "./audio/guitar2/guitar4.wav",
            5: "./audio/guitar2/guitar5.wav",
            6: "./audio/guitar2/guitar6.wav",



        },
        C: {
            1: "./audio/guitar1/guitar1.wav",
            2: "./audio/guitar1/guitar2.wav",
            3: "./audio/guitar1/guitar3.wav",
            4: "./audio/guitar1/guitar4.wav",
            5: "./audio/guitar1/guitar5.wav",
            6: "./audio/guitar1/guitar6.wav",



        },
        D: {
            1: "./audio/guitar2/guitar1.wav",
            2: "./audio/guitar2/guitar2.wav",
            3: "./audio/guitar2/guitar3.wav",
            4: "./audio/guitar2/guitar4.wav",
            5: "./audio/guitar2/guitar5.wav",
            6: "./audio/guitar2/guitar6.wav",



        }
        // C: {
        //   1: "./audio/space/space1.wav",
        //   2: "./audio/space/space2.wav",
        //   3: "./audio/space/space3.wav",
        //   4: "./audio/space/space4.wav",
        //   5: "./audio/space/space5.wav",
        //   6: "./audio/space/space6.wav",



        // }
    }).connect(pingPong);

    //TURN DOWN THE VOLUME
    sampler.volume.value = -10;
    sampler2.volume.value = -15;
    sampler3.volume.value = -10;

    sampler.envelope.attack = 0.8;
    sampler2.envelope.attack = 0.8;
    sampler3.envelope.attack = 0.8;
    // sampler.envelope.release = 0.2;
    // sampler2.envelope.release = 0.1;
    // sampler3.envelope.release = 0.1;
}



function setup() {

    canvas = createCanvas(480, 320);
    canvas.position(windowWidth / 2 - canvas.width / 2, 0);

    buttonVid = createButton("Play");



    // specify multiple formats for different browsers
    // video = createVideo(['assets/subtractedFootageForWeb.mp4']);
    // vidDisplay = createVideo(['assets/FullWebFootage.mp4']);
    video = createVideo(['assets/cloud25forweb.mp4']);
    vidDisplay = createVideo(['assets/cloud25.mp4']);
    vidDisplay.id("vidDisplay");
    video.loop();
    vidDisplay.loop();
    //vidDisplay.hide();
    video.size(480 / vscale, 320 / vscale);
    vidDisplay.size(640, 400);
    vidDisplay.position(windowWidth / 2 - vidDisplay.width / 2, windowHeight / 2 - vidDisplay.height / 2);


    //video.position(0,0);
    video.hide();
    pixelDensity(1);
    noStroke();
    fill(0);
    frameRate(2);

    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
            var index = (x + (y * video.width));
            //console.log(index);
            rects[index] = new Rectangle(x * vscale, y * vscale, vscale, vscale, notes[index % 25], synthNotes[index % 16]);
            //rects[index].display();
            //print("Theta = " + rects[index].theta);
        }
    }
}

function windowResized() {
    //resizeCanvas(windowWidth/4, windowHeight/4);
    // canvas.position(windowWidth / 2 - vidDisplay.width/2, windowHeight / 4);
    //vidDisplay.position(windowWidth / 4+vidDisplay.width/2, windowHeight / 4);


}

function draw() {
    //background(255);
    video.loadPixels();
    updateAngles();

    //loadPixels();
    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
            var index = (x + (y * video.width)) * 4;
            var r = video.pixels[index + 0];
            var g = video.pixels[index + 1];
            var b = video.pixels[index + 2];

            var bright = (r + g + b) / 3;

            if (bright > 200 && rects[index / 4].ring1 === true) {

                sampler.triggerAttack(rects[index / 4].sample);





            }
            if (bright > 200 && rects[index / 4].ring2 === true) {

                sampler2.triggerAttack(rects[index / 4].sample);

            }
            if (bright > 200 && rects[index / 4].ring3 === true) {

                sampler3.triggerAttack(rects[index / 4].sample);

            }
            if (bright > 150) {
              space.add( new Dust(x*(windowWidth/video.width) + rand(10), 100+y*(windowHeight/video.height)+rand(10) ) );
              space.add( new Dust(x*(windowWidth/video.width) + rand(100), 50+y*(windowHeight/video.height)+rand(10) ) );
              space.add( new Dust(x*(windowWidth/video.width) + rand(50), 100+y*(windowHeight/video.height)+rand(10) ) );
              space.add( new Dust(x*(windowWidth/video.width) + rand(40), 10+y*(windowHeight/video.height)+rand(10) ) );
            }



          //  rects[index/4].display();

        }
    }


}

function videoPlay() {
    if (!isPlaying) {
        video.loop();
        isPlaying = true;
        buttonVid.label = "Stop";

    } else {
        video.pause();
        isPlaying = false;
        buttonVid.label = "Play";

    }


}

function updateAngles() {
    if (points[0] && points[1]) {
        var min = points[0].angle(spaceSize) * 180 / PI + 180;
        var max = points[1].angle(spaceSize) * 180 / PI + 180;
        //
        // var diff = abs(max-min);
        // console.log("diff= " + diff);
        // sampler.volume.value = map(diff, 0,360, -20, -5);


        for (var y = 0; y < 8; y++) {
            for (var x = 0; x < 12; x++) {
                var index = (x + (y * 12));
                if (max > min) {
                    if (rects[index].theta <= max && rects[index].theta >= min) {
                        rects[index].ring1 = true;
                        //  console.log(rects[index].isOn);
                    } else {
                        rects[index].ring1 = false;
                    }
                }

            }
        }
    } else {
      for (var y = 0; y < 8; y++) {
          for (var x = 0; x < 12; x++) {
              var index = (x + (y * 12));
                      rects[index].ring1 = false;
                  }
              }

          }


    if (points[2] && points[3]) {
        var min2 = points[2].angle(spaceSize) * 180 / PI + 180;
        var max2 = points[3].angle(spaceSize) * 180 / PI + 180;
        //
        //
        // var diff2 = abs(max2 - min2);
        // sampler2.volume.value = map(diff2, 0,360, -20, -5);

        for (var y = 0; y < 8; y++) {
            for (var x = 0; x < 12; x++) {
                var index = (x + (y * 12));
                if (max2 > min2) {
                    if (rects[index].theta <= max2 && rects[index].theta >= min2) {
                        rects[index].ring2 = true;
                        //  console.log(rects[index].isOn);
                    } else {
                        rects[index].ring2 = false;
                    }
                }
            }
        }


    } else {
      for (var y = 0; y < 8; y++) {
          for (var x = 0; x < 12; x++) {
              var index = (x + (y * 12));
                      rects[index].ring2 = false;
                  }
              }

          }

    if (points[4] && points[5]) {
        //console.log("Theta Min = " + points[0].angle(spaceSize)*180/PI + " Theta Max = " + points[1].angle(spaceSize)*180/PI);
        var min3 = points[4].angle(spaceSize) * 180 / PI + 180;
        var max3 = points[5].angle(spaceSize) * 180 / PI + 180;

        // var diff3 = abs(max3 - min3);
        // sampler3.volume.value = map(diff3, 0,360, -20, -5);



        for (var y = 0; y < 8; y++) {
            for (var x = 0; x < 12; x++) {
                var index = (x + (y * 12));
                if (max3 > min3) {
                    if (rects[index].theta <= max3 && rects[index].theta >= min3) {
                        rects[index].ring3 = true;
                        //  console.log("ring3 " + rects[index].ring3);
                    } else {
                        rects[index].ring3 = false;
                    }
                }
            }
        }


    } else {
      for (var y = 0; y < 8; y++) {
          for (var x = 0; x < 12; x++) {
              var index = (x + (y * 12));
                      rects[index].ring3 = false;
                  }
              }

          }





}
