/// <reference path="enemy.ts" />
module game {
	export class Stage {
		private canvas : HTMLCanvasElement;
		private enemy : Enemy;
		
		constructor(canvas:HTMLCanvasElement){
			this.canvas = canvas;
			this.enemy = new Enemy(this.canvas.width, this.canvas.height);
		}

		private update():void {
			this.enemy.update();
			this.draw();
		}

		private draw():void{
			var context = this.canvas.getContext("2d");
			this.drawBackground(context);
			this.enemy.draw(context);
		}

		private drawBackground(context : CanvasRenderingContext2D):void{
			context.fillStyle = "black";
			context.fillRect(0,0,this.canvas.width,this.canvas.height);
		}

		public start():void{
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
			var updateFunc = () => {
				this.enemy.update();
				this.draw();
				requestAnimFrame(updateFunc);
			}
			requestAnimFrame(updateFunc);
		}
	}
}