var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="BomberGameObject.ts"/>
///<reference path="BomberGameObjectTypes.ts"/>
var Main;
(function (Main) {
    var Bomb = (function (_super) {
        __extends(Bomb, _super);
        //
        function Bomb(str_id, num_xPos, num_yPos, num_width, num_height) {
            if (num_xPos === void 0) { num_xPos = 0; }
            if (num_yPos === void 0) { num_yPos = 0; }
            if (num_width === void 0) { num_width = 0; }
            if (num_height === void 0) { num_height = 0; }
            _super.call(this, num_xPos, num_yPos, num_width, num_height);
            this.num_explodeTime = 60; //note: frame counter for now
            this.num_explodeTimeCounter = 0;
            this.num_explodeLength = 2;
            //
            this.num_animationTime = 3; //note: frame counter for now
            this.num_animationTimeCounter = 0;
            //
            this.str_type = Main.BomberGameObjectTypes.BOMB;
            this.str_debugFillStyle = "#000000";
            //
            this.str_id = str_id;
        }
        Bomb.prototype.render = function (context) {
            //
            context.save();
            //
            var spriteData = this.spriteDataSequence.arr_spriteData[this.num_spriteDataIndex];
            context.drawImage(this.img_spriteSheet, spriteData.num_xPos, spriteData.num_yPos, spriteData.num_width, spriteData.num_height, this.num_xPos, this.num_yPos, this.num_width, this.num_height);
            //debug
            //context.strokeStyle=this.str_debugFillStyle;
            //context.strokeRect(this.num_xPos, this.num_yPos, this.num_width, this.num_height);
            //
            context.restore();
        };
        return Bomb;
    })(Main.BomberGameObject);
    Main.Bomb = Bomb;
})(Main || (Main = {}));
