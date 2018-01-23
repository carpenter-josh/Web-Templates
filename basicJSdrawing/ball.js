//Originated from Mozilla's canvas 'Advanced Animations'
/* https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations*/

"use strict";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;

/* ball = {x: value, y: value, vx: value, vy: value, radius: value, color: 'value', draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}; */
var ball = {
  x: Math.floor(Math.random()*1000),
  y: Math.floor(Math.random()*1000),
  vx: 2,
  vy: 15,
  radius: 5,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

var draw = function (){
  for (var i = 0; i < 100; i++) {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy *= .99;
    ball.vy += .5;

    if (ball.y + ball.vy > canvas.height ||
      ball.y + ball.vy < 0) {
      ball.vy = -ball.vy;
    }

    if (ball.x + ball.vx > canvas.width ||
  	ball.x + ball.vx < 0) {
  	ball.vx = -ball.vx;
    }

    raf = window.requestAnimationFrame(draw);
  };
};

function initVel(e) {
	raf = window.requestAnimationFrame(draw);
};
initVel();

/*
canvas.addEventListener('mouseout', function(e) {
  window.cancelAnimationFrame(raf);
});*/
