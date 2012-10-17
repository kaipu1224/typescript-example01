/// <reference path="stage.ts" />
var canvas = <HTMLCanvasElement>document.getElementById("stage");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onload = function(){
	var stage = new game.Stage(canvas);
	stage.start();
}