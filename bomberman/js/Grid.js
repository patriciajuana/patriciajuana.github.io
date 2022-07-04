///<reference path="BomberGameObject.ts"/>
///<reference path="GridPosition.ts"/>
///<reference path="Direction.ts"/>
var Main;
(function (Main) {
    var Grid = (function () {
        function Grid(num_width, num_height, num_rows, num_cols) {
            this.num_tileMargin = 1;
            //
            this.num_width = num_width;
            this.num_height = num_height;
            this.num_rows = num_rows;
            this.num_cols = num_cols;
            //
            var num_actualWidth = this.num_width - (this.num_tileMargin * this.num_cols);
            var num_actualHeight = this.num_height - (this.num_tileMargin * this.num_rows);
            this.num_tileWidth = num_actualWidth / this.num_cols;
            this.num_tileHeight = num_actualHeight / this.num_rows;
            //
            var num_size;
            if (this.num_width > this.num_height) {
                num_size = num_height;
                this.num_tileHeight = (num_size - (this.num_tileMargin * this.num_rows)) / this.num_rows;
                this.num_tileWidth = this.num_tileHeight;
                this.num_cols = Math.floor(this.num_width / (this.num_tileWidth + this.num_tileMargin));
            }
            //init static game objects matrix
            this.arr_staticGameObjectsMatrix = [];
            for (var i = 0; i < this.num_rows; i++) {
                this.arr_staticGameObjectsMatrix.push([]);
                for (var j = 0; j < this.num_cols; j++) {
                    this.arr_staticGameObjectsMatrix[i].push(null);
                }
            }
            //
            console.log("grid:", this);
        }
        Grid.prototype.addStaticGameObject = function (bomberGameObject, gridPosition) {
            this.arr_staticGameObjectsMatrix[gridPosition.num_row][gridPosition.num_col] = bomberGameObject;
            bomberGameObject.num_width = this.num_tileWidth;
            bomberGameObject.num_height = this.num_tileHeight;
            this.positionGameObject(bomberGameObject, gridPosition);
            //console.log("bomberGameObject:", bomberGameObject);
        };
        Grid.prototype.alignGameObject = function (bomberGameObject, str_direction) {
            //
            var num_topLeftXPos = bomberGameObject.gridPosition.num_col * this.num_tileWidth + (bomberGameObject.gridPosition.num_col * this.num_tileMargin);
            var num_topLeftYPos = bomberGameObject.gridPosition.num_row * this.num_tileHeight + (bomberGameObject.gridPosition.num_row * this.num_tileMargin);
            var num_xPos = bomberGameObject.num_xPos;
            var num_yPos = bomberGameObject.num_yPos;
            //
            switch (str_direction) {
                case Main.Direction.UP:
                    num_yPos = num_topLeftYPos;
                    break;
                case Main.Direction.DOWN:
                    num_yPos = num_topLeftYPos + this.num_tileHeight - bomberGameObject.num_height;
                    break;
                case Main.Direction.LEFT:
                    num_xPos = num_topLeftXPos;
                    break;
                case Main.Direction.RIGHT:
                    num_xPos = num_topLeftXPos + this.num_tileWidth - bomberGameObject.num_width;
                    break;
                case Main.Direction.CENTER:
                    num_xPos = num_topLeftXPos + ((this.num_tileWidth - bomberGameObject.num_width) / 2);
                    num_yPos = num_topLeftYPos + ((this.num_tileHeight - bomberGameObject.num_height) / 2);
                    break;
            }
            //
            bomberGameObject.num_xPos = num_xPos;
            bomberGameObject.num_yPos = num_yPos;
            //console.log("bomberGameObject:", bomberGameObject);
        };
        Grid.prototype.positionGameObject = function (bomberGameObject, gridPosition) {
            //
            bomberGameObject.num_xPos = gridPosition.num_col * this.num_tileWidth + (gridPosition.num_col * this.num_tileMargin);
            bomberGameObject.num_yPos = gridPosition.num_row * this.num_tileHeight + (gridPosition.num_row * this.num_tileMargin);
            bomberGameObject.gridPosition = gridPosition;
            //return if success or not
        };
        Grid.prototype.getGameObject = function (gridPosition) {
            if (gridPosition.num_row < 0 ||
                gridPosition.num_col < 0 ||
                gridPosition.num_row > (this.num_rows - 1) ||
                gridPosition.num_col > (this.num_cols - 1))
                return null;
            return this.arr_staticGameObjectsMatrix[gridPosition.num_row][gridPosition.num_col];
        };
        Grid.prototype.getGameObjectsAtBounds = function (num_xPos, num_yPos, num_width, num_height) {
            //
            var num_leftCol = Math.floor(num_xPos / (this.num_tileWidth + this.num_tileMargin));
            var num_rightCol = Math.floor((num_xPos + num_width) / (this.num_tileWidth + this.num_tileMargin));
            var num_topRow = Math.floor(num_yPos / (this.num_tileHeight + this.num_tileMargin));
            var num_bottomRow = Math.floor((num_yPos + num_height) / (this.num_tileHeight + this.num_tileMargin));
            //
            var bomberGameObject;
            var arr_gameObjects = [];
            //check top left
            if ((bomberGameObject = this.getGameObject(new Main.GridPosition(num_topRow, num_leftCol))) != null) {
                arr_gameObjects.push(bomberGameObject);
            }
            //check top right
            if ((bomberGameObject = this.getGameObject(new Main.GridPosition(num_topRow, num_rightCol))) != null) {
                arr_gameObjects.push(bomberGameObject);
            }
            //check bottom left
            if ((bomberGameObject = this.getGameObject(new Main.GridPosition(num_bottomRow, num_leftCol))) != null) {
                arr_gameObjects.push(bomberGameObject);
            }
            //check bottom right
            if ((bomberGameObject = this.getGameObject(new Main.GridPosition(num_bottomRow, num_rightCol))) != null) {
                arr_gameObjects.push(bomberGameObject);
            }
            //
            return arr_gameObjects;
        };
        Grid.prototype.getGridPosition = function (bomberGameObject) {
            var num_centerXPos = bomberGameObject.num_xPos + (bomberGameObject.num_width / 2);
            var num_centerYPos = bomberGameObject.num_yPos + (bomberGameObject.num_height / 2);
            //return new GridPosition( Math.floor( num_centerYPos / this.num_tileHeight ), Math.floor( num_centerXPos / this.num_tileWidth ) );
            return new Main.GridPosition(Math.floor(num_centerYPos / (this.num_tileHeight + this.num_tileMargin)), Math.floor(num_centerXPos / (this.num_tileWidth + this.num_tileMargin)));
        };
        Grid.prototype.removeStaticGameObject = function (bomberGameObject) {
            this.arr_staticGameObjectsMatrix[bomberGameObject.gridPosition.num_row][bomberGameObject.gridPosition.num_col] = null;
        };
        Grid.prototype.render = function (context) {
            //
            for (var i = 0; i < this.num_rows; i++) {
                for (var j = 0; j < this.num_cols; j++) {
                    context.strokeRect(j * this.num_tileWidth + (j * this.num_tileMargin), i * this.num_tileHeight + (i * this.num_tileMargin), this.num_tileWidth, this.num_tileHeight);
                }
            }
        };
        Grid.prototype.renderGameObjects = function (context) {
            //
            for (var i = 0; i < this.num_rows; i++) {
                for (var j = 0; j < this.num_cols; j++) {
                    if (this.arr_staticGameObjectsMatrix[i][j] != null) {
                        this.arr_staticGameObjectsMatrix[i][j].render(context);
                    }
                }
            }
        };
        Grid.prototype.scaleGameObjectToTileSize = function (bomberGameObject, num_width, num_height, num_scale) {
            if (num_scale === void 0) { num_scale = 1; }
            var num_widthDiff = (this.num_tileWidth - num_width) * num_scale;
            var num_heightDiff = (this.num_tileHeight - num_height) * num_scale;
            if (num_widthDiff < num_heightDiff) {
                bomberGameObject.num_width = (num_width + num_widthDiff);
                bomberGameObject.num_height = (num_height + num_widthDiff);
            }
            else {
                bomberGameObject.num_width = (num_width + num_heightDiff);
                bomberGameObject.num_height = (num_height + num_heightDiff);
            }
        };
        Grid.prototype.updateGridPosition = function (bomberGameObject) {
            bomberGameObject.gridPosition = this.getGridPosition(bomberGameObject);
        };
        return Grid;
    })();
    Main.Grid = Grid;
})(Main || (Main = {}));
