var Main;
(function (Main) {
    var GridPosition = (function () {
        function GridPosition(num_row, num_col) {
            this.num_row = num_row;
            this.num_col = num_col;
        }
        GridPosition.prototype.isEqualTo = function (gridPosition) {
            if (this.num_row == gridPosition.num_row && this.num_col == gridPosition.num_col)
                return true;
            return false;
        };
        return GridPosition;
    })();
    Main.GridPosition = GridPosition;
})(Main || (Main = {}));
