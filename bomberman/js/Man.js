var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="BomberGameObject.ts"/>
///<reference path="BomberGameObjectTypes.ts"/>
///<reference path="Direction.ts"/>
///<reference path="Bomb.ts"/>
///<reference path="SpriteData.ts"/>
///<reference path="SpriteDataSequence.ts"/>
var Main;
(function (Main) {
    var Man = (function (_super) {
        __extends(Man, _super);
        function Man(num_xPos, num_yPos, num_width, num_height) {
            if (num_xPos === void 0) { num_xPos = 0; }
            if (num_yPos === void 0) { num_yPos = 0; }
            if (num_width === void 0) { num_width = 0; }
            if (num_height === void 0) { num_height = 0; }
            //
            _super.call(this, num_xPos, num_yPos, num_width, num_height);
            //
            this.isKilled = false;
            this.isDead = false;
            //
            this.num_animationTime = 1; //note: frame counter for now
            this.num_animationTimeCounter = 0;
            //
            this.str_type = Main.BomberGameObjectTypes.MAN;
            this.str_debugFillStyle = "#ff0000";
            //
            this.isOnTopOfBomb = false;
            this.lastBombDeployed = null;
            this.str_movementDirection = "";
        }
        Man.prototype.render = function (context) {
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
        return Man;
    })(Main.BomberGameObject);
    Main.Man = Man;
})(Main || (Main = {}));
