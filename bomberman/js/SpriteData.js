var Main;
(function (Main) {
    var SpriteData = (function () {
        function SpriteData(num_xPos, num_yPos, num_width, num_height) {
            this.num_xPos = num_xPos;
            this.num_yPos = num_yPos;
            this.num_width = num_width;
            this.num_height = num_height;
        }
        return SpriteData;
    })();
    Main.SpriteData = SpriteData;
})(Main || (Main = {}));
