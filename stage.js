var game;
(function (game) {
    var Stage = (function () {
        function Stage(canvas) {
            this.canvas = canvas;
            this.enemy = new game.Enemy(this.canvas.width, this.canvas.height);
        }
        Stage.prototype.update = function () {
            this.enemy.update();
            this.draw();
        };
        Stage.prototype.draw = function () {
            var context = this.canvas.getContext("2d");
            this.drawBackground(context);
            this.enemy.draw(context);
        };
        Stage.prototype.drawBackground = function (context) {
            context.fillStyle = "black";
            context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        };
        Stage.prototype.start = function () {
            var _this = this;
            var requestAnimFrame = (function () {
                return window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                    window.setTimeout(callback, 1000 / 60, new Date().getTime());
                };
            })();
            var updateFunc = function () {
                _this.enemy.update();
                _this.draw();
                requestAnimFrame(updateFunc);
            };
            requestAnimFrame(updateFunc);
        };
        return Stage;
    })();
    game.Stage = Stage;    
})(game || (game = {}));

