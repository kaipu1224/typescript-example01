var game;
(function (game) {
    var Bullet = (function () {
        function Bullet(x, y, vx, vy, ww, wh) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.size = 4;
            this.ww = ww;
            this.wh = wh;
            this.alive = true;
        }
        Bullet.prototype.update = function () {
            this.x += this.vx;
            this.y += this.vy;
            if(this.x < 0 || this.x + this.size > this.ww || this.y < 0 || this.y + this.size > this.wh) {
                this.alive = false;
            }
        };
        Bullet.prototype.draw = function (context) {
            context.fillStyle = "orange";
            context.fillRect(this.x, this.y, this.size, this.size);
        };
        Bullet.prototype.isAlive = function () {
            return this.alive;
        };
        return Bullet;
    })();
    game.Bullet = Bullet;    
})(game || (game = {}));

