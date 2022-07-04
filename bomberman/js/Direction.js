var Main;
(function (Main) {
    var Direction = (function () {
        function Direction() {
        }
        Direction.UP = "up";
        Direction.DOWN = "down";
        Direction.LEFT = "left";
        Direction.RIGHT = "right";
        Direction.CENTER = "center";
        return Direction;
    })();
    Main.Direction = Direction;
})(Main || (Main = {}));
