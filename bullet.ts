module game {
	export class Bullet {
		private x : number;
		private y : number;
		private vx : number;
		private vy : number;
		private size : number;
		private alive : bool;
		private ww : number;
		private wh : number;

		constructor(x:number, y:number, vx:number, vy:number, ww:number, wh:number){
			this.x = x;
			this.y = y;
			this.vx = vx;
			this.vy = vy;
			this.size = 4;
			this.ww = ww;
			this.wh = wh;
			this.alive = true;
		}

		public update():void{
			this.x += this.vx;
			this.y += this.vy;
			if(this.x < 0 || this.x + this.size > this.ww || this.y < 0 || this.y + this.size > this.wh){
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
}