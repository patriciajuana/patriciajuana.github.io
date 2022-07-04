///<reference path="BomberGame.ts"/>
var Main;
(function (Main) {
    //
    var _mainCanvas = document.getElementById("mainCanvas");
    _mainCanvas.width = window.innerWidth;
    _mainCanvas.height = window.innerHeight;
    var _context = _mainCanvas.getContext("2d");
    //
    var _img_spritesheet = document.getElementById("spritesheet");
    //
    var bomberGame = new Main.BomberGame(_context, _img_spritesheet);
})(Main || (Main = {}));
