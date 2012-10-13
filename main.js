var Stage = (function () {
    function Stage() {
        this.enemy = new Enemy();
    }
    Stage.prototype.update = function () {
        this.enemy.update();
        this.draw();
    };
    Stage.prototype.draw = function () {
        var context = canvas.getContext("2d");
        this.drawBackground(context);
        this.enemy.draw(context);
    };
    Stage.prototype.drawBackground = function (context) {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
    };
    Stage.prototype.start = function () {
        var _this = this;
        setInterval(function () {
            return _this.update();
        }, 1000 / 60);
    };
    return Stage;
})();
var Enemy = (function () {
    function Enemy() {
        var _this = this;
        this.image = new Image();
        this.image.src = "images/enemy01.png";
        this.image.onload = function () {
            _this.x = ww / 2 - _this.image.width / 2;
            _this.y = 0;
        };
        this.counter = 0;
        this.bullets = [];
        this.vx = 3;
    }
    Enemy.prototype.update = function () {
        this.x += this.vx;
        if(this.x < 0 || this.x + this.image.width > ww) {
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
            this.bullets.push(new Bullet(this.x + this.image.width / 2, this.y + this.image.height / 2, vxx[i], vyy[i]));
        }
        console.log("bullet count = " + this.bullets.length);
    };
    return Enemy;
})();
var Bullet = (function () {
    function Bullet(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = 4;
        this.alive = true;
    }
    Bullet.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        if(this.x < 0 || this.x + this.size > ww || this.y < 0 || this.y + this.size > wh) {
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
var canvas = document.getElementById("stage");
var ww = window.innerWidth;
var wh = window.innerHeight;
canvas.width = ww;
canvas.height = wh;
var stage = new Stage();
window.onload = function () {
    stage.start();
};
