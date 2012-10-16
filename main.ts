class Stage {
	private enemy : Enemy;
	
	constructor(){
		this.enemy = new Enemy();
	}

	private update():void {
		this.enemy.update();
		this.draw();
	}

	private draw():void{
		var context = canvas.getContext("2d");
		this.drawBackground(context);
		this.enemy.draw(context);
	}

	private drawBackground(context : CanvasRenderingContext2D):void{
		context.fillStyle = "black";
		context.fillRect(0,0,canvas.width,canvas.height);
	}

	public start():void{
		//setInterval(() =>  this.update(),1000/60);
		var updateFunc = () => {
			this.enemy.update();
			this.draw();
			requestAnimFrame(updateFunc);
		}
		requestAnimFrame(updateFunc);
	}
}

class Enemy {
	private image : HTMLImageElement;
	private x : number;
	private y : number;
	private vx : number;
	private bullets : Bullet[];
	private counter : number;

	constructor(){
		this.image = new Image();
		this.image.src = "images/enemy01.png";
		this.image.onload = ()=>{
			this.x = ww/2 - this.image.width/2;
			this.y = 0;
		}
		this.counter = 0;
		this.bullets = [];
		this.vx = 3;
	}

	public update(){
		this.x += this.vx;
		if(this.x < 0 || this.x + this.image.width > ww){
			this.vx *= -1;
		}

		this.counter++;
		if(this.counter > 60*2){
			this.counter = 0;
			this.fire(3,3,4,30);
		}

		for(var i = 0; i < this.bullets.length; i++){
			this.bullets[i].update();
		}
		for(var i = this.bullets.length-1; i >= 0; i--){
			if(!this.bullets[i].isAlive()){
				this.bullets.splice(i,1);
			}
		}
	}

	public draw(context : CanvasRenderingContext2D) {
		context.drawImage(this.image, this.x, this.y);

		for(var i = 0; i < this.bullets.length; i++){
			this.bullets[i].draw(context);
		}
	}

	private fire(vx:number, vy:number,theta:number, n:number){
		console.log("fire");
		var radStep = Math.PI / 180 * theta;
		var rad = n%2 ? -n/2*radStep : (-n/2+0.5)*radStep;

		var vxx = [n];
		var vyy = [n];
		for(var i = 0; i < n; i++){
			var c = Math.cos(rad);
			var s = Math.sin(rad);
			vxx[i] = vx*s;
			vyy[i] = vy*c;

			rad+=radStep;
		}
		// fire the bullets
		for(var i = 0; i < n; i++){
			this.bullets.push(new Bullet(this.x + this.image.width/2, this.y + this.image.height/2, vxx[i], vyy[i]));
		}

		console.log("bullet count = " + this.bullets.length);
	}
}

class Bullet {
	private x : number;
	private y : number;
	private vx : number;
	private vy : number;
	private size : number;
	private alive : bool;

	constructor(x:number, y:number, vx:number, vy:number){
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.size = 4;
		this.alive = true;
	}

	public update():void{
		this.x += this.vx;
		this.y += this.vy;
		if(this.x < 0 || this.x + this.size > ww || this.y < 0 || this.y + this.size > wh){
			this.alive = false;
		}
	}

	public draw(context:CanvasRenderingContext2D):void{
		context.fillStyle = "orange";
		context.fillRect(this.x, this.y, this.size, this.size);
	}

	public isAlive():bool{
		return this.alive;
	}
}

// initialize
var canvas = <HTMLCanvasElement>document.getElementById("stage");
var ww = window.innerWidth;
var wh = window.innerHeight;
canvas.width = ww;
canvas.height = wh;
var stage = new Stage();
var requestAnimFrame: (callback: () => void) => void = (function(){ 
  return window.requestAnimationFrame || 
  (<any>window).webkitRequestAnimationFrame || 
  (<any>window).mozRequestAnimationFrame || 
  (<any>window).oRequestAnimationFrame || 
  window.msRequestAnimationFrame || 
  function(callback){
      window.setTimeout(callback, 1000 / 60, new Date().getTime()); 
  }; 
})();

window.onload = function(){
	stage.start();
}