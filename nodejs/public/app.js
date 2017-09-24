var socket = io.connect(window.location.origin);

var heart_d = 0
socket.on('heart', d=>{
	// console.log(d)
	heart_d = d
})

const width = 800, height = 800

function setup() {
	createCanvas(width, height);
	background(200)
	
}

function draw() {
	let red = 255-(heart_d)/4
	background(red, 50, 50)
	fill(204, 101, 192, 127);
  stroke(127, 63, 120);

  // A rectangle
  // rect(40, 120, 120, 40);
  // rect(10*(heart_d-60), 120, 120, 40);
  // An ellipse
	// ellipse(240, 240, 80, 80);
	
	let r = (heart_d-10)/2
	noStroke()
	ellipse(width/2, height/2, r, r);

  // A triangle
  // triangle(300, 100, 320, 100, 310, 80);

  // // A design for a simple flower
  // translate(580, 200);
  // noStroke();
  // for (var i = 0; i < 10; i ++) {
  //   ellipse(0, 30, 20, 80);
  //   rotate(PI/5);
  // }

}
