var Main;
(function (Main) {
    var BomberGameObjectTypes = (function () {
        function BomberGameObjectTypes() {
        }
        BomberGameObjectTypes.MAN = "man";
        BomberGameObjectTypes.BLOCK = "block";
        BomberGameObjectTypes.BRICK = "brick";
        BomberGameObjectTypes.BOMB = "bomb";
        BomberGameObjectTypes.ENEMY = "enemy";
        BomberGameObjectTypes.EXPLOSION = "explosion";
        return BomberGameObjectTypes;
    })();
    Main.BomberGameObjectTypes = BomberGameObjectTypes;
})(Main || (Main = {}));
