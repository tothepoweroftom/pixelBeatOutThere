//Glow color #F2DD6E
//GLOBAL VARIABLES
//0,1 Ring 1 - 2,3 Ring 2 - 4,5 Ring 3
var points = [];
var spaceSize;
var space = new CanvasSpace("pt").setup( {bgcolor: "#000000"} );

var helpToggle = true;

var arcToggle1 = false;
var arcToggle2 = false;
var arcToggle3 = true;


//var ringTrigger = false;



//// 1. Define Space and Form
var colors = {
  a1: "#ff2d5d", a2: "#42dc8e", a3: "#2e43eb", a4: "#000000",
  b1: "#96bfed", b2: "#f5ead6", b3: "#f1f3f7", b4: "#e2e6ef"
};

var arcColors = {
  a1: '#17BEBB', a2: '#B0DB43', a3: '#D62246'
};
//var space = new CanvasSpace("pt").setup( {bgcolor: colors.a4} );
var form = new Form( space );

spaceSize = space.size.$divide(2);

//// 2. Create Elements
var mouse = new Circle( space.size.$divide(2) ).setRadius(  250 );
var mouse2 = new Circle( space.size.$divide(2) ).setRadius( 250 );
var mouse3 = new Circle( space.size.$divide(2) ).setRadius( 250 );

var circle = new Circle( space.size.$divide(2) ).setRadius( 200 );
var circle2 = new Circle( space.size.$divide(2) ).setRadius( 250 );
var circle3 = new Circle( space.size.$divide(2) ).setRadius( 300 );


var origin = new Point(space.size.$divide(2) );

var arc1 = new Arc(arcColors.a1);
var arc2 = new Arc(arcColors.a2);
var arc3 = new Arc(arcColors.a3);


form.stroke( false );
var fonts = ["Helvetica, sans-serif", "Georgia", "monospace"];
var scaleFont = 20;

//// 3. Visualize, Animate, Interact
space.add({
  animate: function(time, fps, context) {

//TOGGLE HELP TEXT
    if(helpToggle===true){
        var x = space.size.x -space.size.x/4;
        var y = space.size.y/4;
        var spaceY = 20;
        form.fill( '#fff' );
        form.font( scaleFont-5, fonts[ 3 ]);
        form.text( new Point(x, y), "This is an interactive web audio composition!" );
        form.text( new Point(x, y+spaceY), "The cloud chamber footage shows alpha" );
        form.text( new Point(x, y+2*spaceY), "radiation from fiestaware pottery fragments." );
        form.text( new Point(x, y+3*spaceY), "These particles are tracked in the browser" );
        form.text( new Point(x, y+4*spaceY), "and trigger precomposed samples of music." );
        form.fill( '#B0DB43' );
        form.text( new Point(x, y+6*spaceY), "Instructions: " );
        form.fill( '#fff' );
        form.text( new Point(x, y + 7*spaceY), "Use the mouse to control the position of  " );
        form.text( new Point(x, y + 8*spaceY), "the instrument particle detectors.  " );
        form.text( new Point(x, y + 10*spaceY), "When a particle is detected in this region " );
        form.text( new Point(x, y + 11*spaceY), "the detector will flash and music is generated. " );
        form.text( new Point(x, y + 13*spaceY), "Three toggle switches on the right control " );
        form.text( new Point(x, y + 14*spaceY), "3 groups of instruments to mix and match.  " );
        form.text( new Point(x, y + 16*spaceY), "Click on help to close this text! " );
        //form.text( new Point(x, y + 17*spaceY), "the 3 groups of instruments  " );

    }
    // if(help){
    //   form.text( new Point(space.size.x -space.size.x/6 , space.size.y/8), "This Is Help" );
    //   form.text( new Point(space.size.x - space.size.x/6, space.size.y/8 + 30), "by Wild Surmise" );
    //
    // }

    // // draw circle and donut. Donut follows mouse position.
    // form.fill( "rgba(0,0,0,.51)" );
    // form.circle( mouse, mouse.radius, true );
    // form.fill( "rgba(0,0,0,.51)" );
    // form.circle( mouse2, mouse2.radius, true );
    // form.fill( "rgba(0,0,0,.51)" );
    // form.circle( mouse2, mouse3.radius, true );


    // //
    // form.fill( "rgba(0,0,0,0.39)" );
    // form.circle( circle, circle.radius, true );
    // form.fill( "rgba(0,,0,0.19)" );
    // form.circle( circle2, circle2.radius, true );
    //     form.fill( "rgba(0,2,5,0.19)" );
    // form.circle( circle3, circle2.radius, true );


    // Check intersections and draw the intersection points
    var ps = circle.intersectCircle( mouse );
    var ps2 = circle2.intersectCircle( mouse2 );
    var ps3 = circle3.intersectCircle( mouse3 );

    points[0] = ps[0];
    points[1] = ps[1];
    points[2] = ps2[0];
    points[3] = ps2[1];
    points[4] = ps3[0];
    points[5] = ps3[1];

    if(points[0] && points[1] && arcToggle1){

      form.stroke("#17BEBB", 60,"round");

      form.arc(circle, points[0].angle(space.size.$divide(2)), points[1].angle(space.size.$divide(2)) );
}
    if(points[2] && points[3] && arcToggle2){
    form.stroke("#B0DB43", 60,"round");
    form.arc(circle2, points[2].angle(space.size.$divide(2)), points[3].angle(space.size.$divide(2)) );
    }
    if(points[4] && points[5] && arcToggle3){

    form.stroke("#D62246", 60,"round");
    form.arc(circle3, points[4].angle(space.size.$divide(2)), points[5].angle(space.size.$divide(2)) );
  }


   },
  onMouseAction: function(type, x, y, evt) {
    if (type=="move") {
      mouse.set(x,y);
      mouse2.set(x+10,y+10);
      mouse3.set(x+20,y-20);




    }
  }
});


function arcBlink(_circle, _angle1, _angle2){

      form.stroke("#F2DD6E", 80, "round");
      form.arc(_circle, _angle1, _angle2);
      //console.log(age);

}

function Arc(_color){
  this.age = 60;
  this.color = _color;

  Arc.prototype.display = function (_circle, _angle1, _angle2) {
    form.stroke(this.color, this.age, "round");
    form.arc(_circle, _angle1, _angle2);

  }

  Arc.prototype.animate = function(time, fps, context) {
    form.stroke(this.color, this.age, "round");
    form.arc(_circle, _angle1, _angle2);
  }
}


// A Dust is a kind of Vector
function Dust() {
  Vector.apply( this, arguments ); // call Vector's constructor
  this.age = 0;
  this.maxAge = Math.random() * 500 + 5;
  this.weight =  5 + Math.random()*3;
  this.color = (this.weight > 0.7) ? colors["a"+Math.ceil(Math.random()*4)] : "#000";
}
Util.extend( Dust, Vector ); // extends Vector class


// define an animate function so it can be animated when added into Space
Dust.prototype.animate = function(time, fps, context) {

  // drift movement
  this.add( rand(1), (Math.random() - Math.random()*(1-this.weight/1.5)) );

  // remove when done
  if (this.age++ > this.maxAge) space.remove(this);

  // glitter
  var gray = (this.maxAge-this.age)/this.maxAge * 0.4;
  gray = Math.max(0, Math.min( 0.6, (Math.random() > 0.5) ? gray + 0.05 : gray - 0.05 ) );

  // draw dust
  form.fill( Util.toRGBColor( this.color, true, gray ) );
  form.point( this, this.weight, true );

};

// a helper function for randomness
function rand(r) { return Math.random() * r - Math.random() * r; }


//// 3. Visualize, Animate, Interact

// When mouse moved, add dust into space
// space.bindCanvas("triggerAttack", function(evt) {
//
//   // add two Dust into space
//   space.add( new Dust( evt.offsetX+rand(5), evt.offsetY+rand(5) ) );
//   space.add( new Dust( evt.offsetX+rand(5), evt.offsetY+rand(5) ) );
//
// });





// 4. Start playing
space.bindMouse();
space.play();
