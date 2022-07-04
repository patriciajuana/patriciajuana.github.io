///<reference path="SpriteDataSequence"/>
var Main;
(function (Main) {
    var SpriteDataSequenceList = (function () {
        function SpriteDataSequenceList() {
            //
            this.manWalkDown = new Main.SpriteDataSequence(0, 0, 12, 16, 3, 1);
            this.manWalkRight = new Main.SpriteDataSequence(38, 0, 12, 16, 3, 1);
            this.manWalkUp = new Main.SpriteDataSequence(0, 17, 12, 16, 3, 1);
            this.manWalkLeft = new Main.SpriteDataSequence(38, 17, 12, 16, 3, 1);
            this.manExplode = new Main.SpriteDataSequence(0, 34, 16, 16, 6, 1);
            //
            this.enemyMoveLeft = new Main.SpriteDataSequence(0, 51, 16, 16, 3, 1);
            this.enemyMoveRight = new Main.SpriteDataSequence(51, 51, 16, 16, 3, 1);
            this.enemyExplode = new Main.SpriteDataSequence(102, 51, 16, 16, 4, 1);
            //
            this.bomb = new Main.SpriteDataSequence(0, 67, 16, 17, 3, 1);
            //
            this.block = new Main.SpriteDataSequence(0, 84, 16, 17, 1, 1);
            //
            this.brick = new Main.SpriteDataSequence(0, 102, 16, 16, 1, 1);
            this.brickExplode = new Main.SpriteDataSequence(17, 102, 16, 16, 6, 1);
            //
            this.explosionUp = new Main.SpriteDataSequence(0, 119, 16, 16, 4, 1);
            this.explosionDown = new Main.SpriteDataSequence(0, 136, 16, 16, 4, 1);
            this.explosionLeft = new Main.SpriteDataSequence(0, 153, 16, 16, 4, 1);
            this.explosionRight = new Main.SpriteDataSequence(0, 170, 16, 16, 4, 1);
            this.explosionCenter = new Main.SpriteDataSequence(0, 187, 16, 16, 4, 1);
            this.explosionHorizStem = new Main.SpriteDataSequence(0, 204, 16, 16, 4, 1);
            this.explosionVertStem = new Main.SpriteDataSequence(0, 221, 16, 16, 4, 1);
        }
        return SpriteDataSequenceList;
    })();
    Main.SpriteDataSequenceList = SpriteDataSequenceList;
})(Main || (Main = {}));
