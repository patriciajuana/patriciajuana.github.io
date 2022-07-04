///<reference path="SpriteDataSequence"/>
///<reference path="Direction"/>
///<reference path="GridPosition.ts"/>
var Main;
(function (Main) {
    var BomberGameObject = (function () {
        //
        function BomberGameObject(num_xPos, num_yPos, num_width, num_height) {
            if (num_xPos === void 0) { num_xPos = 0; }
            if (num_yPos === void 0) { num_yPos = 0; }
            if (num_width === void 0) { num_width = 0; }
            if (num_height === void 0) { num_height = 0; }
            this.num_speed = 5;
            //
            this.img_spriteSheet = null;
            this.num_xPos = num_xPos;
            this.num_yPos = num_yPos;
            this.num_width = num_width;
            this.num_height = num_height;
            this.str_debugFillStyle = "#000000";
            //
            this.num_spriteDataIndex = 0;
            this.spriteDataSequence = null;
        }
        BomberGameObject.prototype.move = function (str_direction) {
            switch (str_direction) {
                case Main.Direction.UP:
                    this.num_yPos -= this.num_speed;
                    break;
                case Main.Direction.DOWN:
                    this.num_yPos += this.num_speed;
                    break;
                case Main.Direction.LEFT:
                    this.num_xPos -= this.num_speed;
                    break;
                case Main.Direction.RIGHT:
                    this.num_xPos += this.num_speed;
                    break;
            }
            //console.log("Man.move:", this.num_xPos, this.num_yPos);
        };
        BomberGameObject.prototype.render = function (context) {
            //console.log("rendering:", this.str_type, this.num_xPos, this.num_yPos, this.num_width, this.num_height);
            this.renderDebug(context);
        };
        BomberGameObject.prototype.renderDebug = function (context) {
            context.beginPath();
            context.fillStyle = this.str_debugFillStyle;
            context.rect(this.num_xPos, this.num_yPos, this.num_width, this.num_height);
            context.fill();
        };
        return BomberGameObject;
    })();
    Main.BomberGameObject = BomberGameObject;
})(Main || (Main = {}));
