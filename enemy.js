var game;
(function (game) {
    var Enemy = (function () {
        function Enemy(ww, wh) {
            var _this = this;
            this.ww = ww;
            this.wh = wh;
            this.image = new Image();
            this.image.src = "images/enemy01.png";
            this.image.onload = function () {
                _this.x = _this.ww / 2 - _this.image.width / 2;
                _this.y = 0;
            };
            this.counter = 0;
            this.bullets = [];
            this.vx = 3;
        }
        Enemy.prototype.update = function () {
            this.x += this.vx;
            if(this.x < 0 || this.x + this.image.width > this.ww) {
                this.vx *= -1;
            }
            this.counter++;
            if(this.counter > 60 * 2) {
                this.counter = 0;
                this.fire(3, 3, 4, 30);
            }
            for(var i = 0; i < this.bullets.length; i++) {
                this.bullets[i].update();
            }
            for(var i = this.bullets.length - 1; i >= 0; i--) {
                if(!this.bullets[i].isAlive()) {
                    this.bullets.splice(i, 1);
                }
            }
        };
        Enemy.prototype.draw = function (context) {
            context.drawImage(this.image, this.x, this.y);
            for(var i = 0; i < this.bullets.length; i++) {
                this.bullets[i].draw(context);
            }
        };
        Enemy.prototype.fire = function (vx, vy, theta, n) {
            console.log("fire");
            var radStep = Math.PI / 180 * theta;
            var rad = n % 2 ? -n / 2 * radStep : (-n / 2 + 0.5) * radStep;
            var vxx = [
                n
            ];
            var vyy = [
                n
            ];
            for(var i = 0; i < n; i++) {
                var c = Math.cos(rad);
                var s = Math.sin(rad);
                vxx[i] = vx * s;
                vyy[i] = vy * c;
                rad += radStep;
            }
            for(var i = 0; i < n; i++) {
                this.bullets.push(new game.Bullet(this.x + this.image.width / 2, this.y + this.image.height / 2, vxx[i], vyy[i], this.ww, this.wh));
            }
            console.log("bullet count = " + this.bullets.length);
        };
        return Enemy;
    })();
    game.Enemy = Enemy;    
})(game || (game = {}));

