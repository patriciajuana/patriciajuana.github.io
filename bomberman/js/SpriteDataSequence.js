///<reference path="SpriteData"/>
var Main;
(function (Main) {
    var SpriteDataSequence = (function () {
        //simple horizontal generator only
        function SpriteDataSequence(num_startXPos, num_startYPos, num_width, num_height, num_count, num_margin) {
            this.arr_spriteData = [];
            for (var i = 0; i < num_count; i++) {
                this.arr_spriteData.push(new Main.SpriteData(num_startXPos + (i * (num_width + num_margin)), num_startYPos, num_width, num_height));
            }
        }
        return SpriteDataSequence;
    })();
    Main.SpriteDataSequence = SpriteDataSequence;
})(Main || (Main = {}));
