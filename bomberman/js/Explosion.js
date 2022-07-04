var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="BomberGameObject.ts"/>
///<reference path="BomberGameObjectTypes.ts"/>
var Main;
(function (Main) {
    var Explosion = (function (_super) {
        __extends(Explosion, _super);
        function Explosion(str_id, str_explosionPart, num_xPos, num_yPos, num_width, num_height) {
            if (num_xPos === void 0) { num_xPos = 0; }
            if (num_yPos === void 0) { num_yPos = 0; }
            if (num_width === void 0) { num_width = 0; }
            if (num_height === void 0) { num_height = 0; }
            _super.call(this, num_xPos, num_yPos, num_width, num_height);
            //
            this.str_spriteYoyoDirection = "forward";
            //
            this.num_animationTime = 0; //note: frame counter for now
            this.num_animationTimeCounter = 0;
            //
            this.str_type = Main.BomberGameObjectTypes.EXPLOSION;
            this.str_debugFillStyle = "#ffcc00";
            //
            this.str_id = str_id;
            this.str_explosionPart = str_explosionPart;
        }
        Explosion.prototype.render = function (context) {
            //
            context.save();
            //
            var spriteData = this.spriteDataSequence.arr_spriteData[this.num_spriteDataIndex];
            context.drawImage(this.img_spriteSheet, spriteData.num_xPos, spriteData.num_yPos, spriteData.num_width, spriteData.num_height, this.num_xPos, this.num_yPos, this.num_width + 2, this.num_height + 2);
            //cheat
            //context.fillStyle="#ffffff";
            //context.fillRect(this.num_xPos, this.num_yPos, this.num_width, this.num_height);
            //debug
            //context.strokeStyle="#ffffff";
            //context.lineWidth=2;
            //context.strokeRect(this.num_xPos, this.num_yPos, this.num_width, this.num_height);
            //
            context.restore();
        };
        //explosion parts
        Explosion.CENTER = "center";
        Explosion.UP = "up";
        Explosion.DOWN = "down";
        Explosion.LEFT = "left";
        Explosion.RIGHT = "right";
        Explosion.HORIZ_STEM = "horiz_stem";
        Explosion.VERT_STEM = "vert_stem";
        return Explosion;
    })(Main.BomberGameObject);
    Main.Explosion = Explosion;
})(Main || (Main = {}));
