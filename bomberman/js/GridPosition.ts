module Main{
	export class GridPosition{
		num_row:number;
		num_col:number;
		constructor(num_row:number, num_col:number){
			this.num_row=num_row;
			this.num_col=num_col;
		}

		isEqualTo(gridPosition:GridPosition):boolean{
			if(this.num_row == gridPosition.num_row && this.num_col == gridPosition.num_col) return true;
			return false;
		}
	}
}