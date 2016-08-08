
//GLOBAL VARIABLES
//0,1 Ring 1 - 2,3 Ring 2 - 4,5 Ring 3
var points = [];
var spaceSize;

(function() {

//// 1. Define Space and Form
var colors = {
  a1: "#ff2d5d", a2: "#42dc8e", a3: "#2e43eb", a4: "#000000",
  b1: "#96bfed", b2: "#f5ead6", b3: "#f1f3f7", b4: "#e2e6ef"
};
var space = new CanvasSpace("pt").setup( {bgcolor: colors.a4} );
var form = new Form( space );

spaceSize = space.size.$divide(2);

//// 2. Create Elements
var mouse = new Circle( space.size.$divide(2) ).setRadius(  300 );
var mouse2 = new Circle( space.size.$divide(2) ).setRadius( 205 );
var mouse3 = new Circle( space.size.$divide(2) ).setRadius( 190 );

var circle = new Circle( space.size.$divide(2) ).setRadius( 200 );
var circle2 = new Circle( space.size.$divide(2) ).setRadius( 275 );
var circle3 = new Circle( space.size.$divide(2) ).setRadius( 350 );


var origin = new Point(0,space.size.y/2);


form.stroke( false );

//// 3. Visualize, Animate, Interact
space.add({
  animate: function(time, fps, context) {

    // draw circle and donut. Donut follows mouse position.
    form.fill( colors.a4 );
    form.circle( mouse, mouse.radius, true );


    // //
    // form.fill( "rgba(255,0,0,0.09)" );
    // form.circle( circle, circle.radius, true );
    // form.fill( "rgba(0,255,0,0.19)" );
    // form.circle( circle2, circle2.radius, true );
    // form.circle( circle3, circle2.radius, true );


    // Check intersections and draw the intersection points
    var ps = circle.intersectCircle( mouse );
    var ps2 = circle2.intersectCircle( mouse );
    var ps3 = circle3.intersectCircle( mouse );

    points[0] = ps[0];
    points[1] = ps[1];
    points[2] = ps2[0];
    points[3] = ps2[1];
    points[4] = ps3[0];
    points[5] = ps3[1];

    if(points[0] && points[1]){
    form.stroke("#17BEBB", 80,"round");
    form.arc(circle, points[0].angle(space.size.$divide(2)), points[1].angle(space.size.$divide(2)) );
    }
    if(points[2] && points[3]){
    form.stroke("#B0DB43", 80,"round");
    form.arc(circle2, points[2].angle(space.size.$divide(2)), points[3].angle(space.size.$divide(2)) );
    }
    if(points[4] && points[5]){

    form.stroke("#D62246", 80,"round");
    form.arc(circle3, points[4].angle(space.size.$divide(2)), points[5].angle(space.size.$divide(2)) );
  }
    form.stroke("rgba(0,0,0,.5)", 0.1,"bevel");

  //  form.fill( colors.a1 );
  //  for (var i=0; i<ps.length; i++) {
  //    form.point( ps[i], 10, true);


  //  }

  //  form.fill( "#fff" );
  //  for (i=0; i<ps2.length; i++) { form.point( ps2[i], 15, true); }
    //form.fill( colors.b1 );

    //for (i=0; i<ps3.length; i++) { form.point( ps3[i], 20, true); }





  },
  onMouseAction: function(type, x, y, evt) {
    if (type=="move") {
      mouse.set(x,y);
      mouse2.set(x,y);
      mouse3.set(x,y);

      // // //    pingPong.wet.value = map(data.y, 0, 1, 0, 1);
      //     pingPong.wet.value = map(x, 100, windowWidth-100, 0.2, 1);
      //     pingPong.feedback.value = map(y, 100, windowHeight, 0.2, 0.89);



          //  console.log(pnt1.angle(space.size.$divide(2))*180/PI);

      //console.log(one[1]);

    }
  }
});



// 4. Start playing
space.bindMouse();
space.play();
})();
