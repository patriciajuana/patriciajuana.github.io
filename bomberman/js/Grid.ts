///<reference path="BomberGameObject.ts"/>
///<reference path="GridPosition.ts"/>
///<reference path="Direction.ts"/>
module Main{
	export class Grid{

		num_width:number;
		num_height:number;
		num_rows:number;
		num_cols:number;
		num_tileWidth:number;
		num_tileHeight:number;
		num_tileMargin:number=1;
		arr_staticGameObjectsMatrix:Array<BomberGameObject>[]; //[row, col]


		constructor(num_width:number, num_height:number, num_rows:number, num_cols:number){
			//
			this.num_width=num_width;
			this.num_height=num_height;
			this.num_rows=num_rows;
			this.num_cols=num_cols;

			//
			var num_actualWidth:number=this.num_width - (this.num_tileMargin * this.num_cols);
			var num_actualHeight:number=this.num_height - (this.num_tileMargin * this.num_rows);
			this.num_tileWidth=num_actualWidth/this.num_cols;
			this.num_tileHeight=num_actualHeight/this.num_rows;


			//
			var num_size:number;
			if(this.num_width > this.num_height){
				num_size=num_height;
				this.num_tileHeight=(num_size - (this.num_tileMargin * this.num_rows)) / this.num_rows;
				this.num_tileWidth=this.num_tileHeight;
				this.num_cols=Math.floor( this.num_width / (this.num_tileWidth + this.num_tileMargin) );
			}



			//init static game objects matrix
			this.arr_staticGameObjectsMatrix=[];
			for(var i=0; i < this.num_rows; i++){
				this.arr_staticGameObjectsMatrix.push([]);
				for(var j=0; j < this.num_cols; j++){
					this.arr_staticGameObjectsMatrix[i].push(null);
				}
			}
			

			//
			console.log("grid:", this);
		}


		addStaticGameObject(bomberGameObject:BomberGameObject, gridPosition:GridPosition){
			this.arr_staticGameObjectsMatrix[gridPosition.num_row][gridPosition.num_col]=bomberGameObject;
			bomberGameObject.num_width=this.num_tileWidth;
			bomberGameObject.num_height=this.num_tileHeight;
			this.positionGameObject(bomberGameObject, gridPosition);
			//console.log("bomberGameObject:", bomberGameObject);
		}

		alignGameObject(bomberGameObject:BomberGameObject, str_direction:string){
			//
			var num_topLeftXPos:number=bomberGameObject.gridPosition.num_col * this.num_tileWidth + (bomberGameObject.gridPosition.num_col * this.num_tileMargin);
			var num_topLeftYPos:number=bomberGameObject.gridPosition.num_row * this.num_tileHeight + (bomberGameObject.gridPosition.num_row * this.num_tileMargin);
			var num_xPos:number=bomberGameObject.num_xPos;
			var num_yPos:number=bomberGameObject.num_yPos;

			//
			switch(str_direction){
				case Direction.UP:
					num_yPos=num_topLeftYPos;
				break;
				case Direction.DOWN:
					num_yPos=num_topLeftYPos + this.num_tileHeight - bomberGameObject.num_height;
				break;
				case Direction.LEFT:
					num_xPos=num_topLeftXPos;
				break;
				case Direction.RIGHT:
					num_xPos=num_topLeftXPos + this.num_tileWidth - bomberGameObject.num_width;
				break;
				case Direction.CENTER:
					num_xPos=num_topLeftXPos + ((this.num_tileWidth - bomberGameObject.num_width) / 2);
					num_yPos=num_topLeftYPos + ((this.num_tileHeight - bomberGameObject.num_height) / 2);
				break;
			}

			//
			bomberGameObject.num_xPos=num_xPos;
			bomberGameObject.num_yPos=num_yPos;
			//console.log("bomberGameObject:", bomberGameObject);
		}
		

		positionGameObject(bomberGameObject:BomberGameObject, gridPosition:GridPosition){
			//
			bomberGameObject.num_xPos=gridPosition.num_col * this.num_tileWidth + (gridPosition.num_col * this.num_tileMargin);
			bomberGameObject.num_yPos=gridPosition.num_row * this.num_tileHeight + (gridPosition.num_row * this.num_tileMargin);
			bomberGameObject.gridPosition=gridPosition;

			//return if success or not
		}

		
		getGameObject(gridPosition:GridPosition):BomberGameObject{
			if(	gridPosition.num_row < 0 || 
					gridPosition.num_col < 0 || 
					gridPosition.num_row > (this.num_rows - 1) ||
					gridPosition.num_col > (this.num_cols - 1) ) return null;

			return this.arr_staticGameObjectsMatrix[gridPosition.num_row][gridPosition.num_col];
		}


		getGameObjectsAtBounds(num_xPos:number, num_yPos:number, num_width:number, num_height:number):Array<BomberGameObject>{
			//
			var num_leftCol:number=Math.floor( num_xPos / (this.num_tileWidth + this.num_tileMargin) );
			var num_rightCol:number=Math.floor( (num_xPos + num_width) / (this.num_tileWidth + this.num_tileMargin) );
			var num_topRow:number=Math.floor( num_yPos / (this.num_tileHeight + this.num_tileMargin) );
			var num_bottomRow:number=Math.floor( (num_yPos + num_height) / (this.num_tileHeight + this.num_tileMargin) );
			//
			var bomberGameObject:BomberGameObject;
			var arr_gameObjects:Array<BomberGameObject>=[];

			//check top left
			if( ( bomberGameObject=this.getGameObject(new GridPosition(num_topRow, num_leftCol)) ) != null ){
				arr_gameObjects.push(bomberGameObject);
			}

			//check top right
			if( ( bomberGameObject=this.getGameObject(new GridPosition(num_topRow, num_rightCol)) ) != null ){
				arr_gameObjects.push(bomberGameObject);
			}

			//check bottom left
			if( ( bomberGameObject=this.getGameObject(new GridPosition(num_bottomRow, num_leftCol)) ) != null ){
				arr_gameObjects.push(bomberGameObject);
			}

			//check bottom right
			if( ( bomberGameObject=this.getGameObject(new GridPosition(num_bottomRow, num_rightCol)) ) != null ){
				arr_gameObjects.push(bomberGameObject);
			}

			//
			return arr_gameObjects;
		}
		

		getGridPosition(bomberGameObject:BomberGameObject):GridPosition{
			var num_centerXPos:number=bomberGameObject.num_xPos + (bomberGameObject.num_width/2);
			var num_centerYPos:number=bomberGameObject.num_yPos + (bomberGameObject.num_height/2);
			//return new GridPosition( Math.floor( num_centerYPos / this.num_tileHeight ), Math.floor( num_centerXPos / this.num_tileWidth ) );
			return new GridPosition( Math.floor( num_centerYPos / (this.num_tileHeight + this.num_tileMargin) ), Math.floor( num_centerXPos / (this.num_tileWidth+ this.num_tileMargin) ) );
		}
		
		removeStaticGameObject(bomberGameObject:BomberGameObject){
			this.arr_staticGameObjectsMatrix[bomberGameObject.gridPosition.num_row][bomberGameObject.gridPosition.num_col]=null;
		}


		render(context:CanvasRenderingContext2D):void{
			//
			for(var i=0; i < this.num_rows; i++){
				for(var j=0; j < this.num_cols; j++){

					context.strokeRect( j * this.num_tileWidth + (j * this.num_tileMargin), 
															i * this.num_tileHeight + (i * this.num_tileMargin), 
															this.num_tileWidth, 
															this.num_tileHeight );	

				}
			}
		}


		renderGameObjects(context:CanvasRenderingContext2D):void{
			//
			for(var i=0; i < this.num_rows; i++){
				for(var j=0; j < this.num_cols; j++){
					if(this.arr_staticGameObjectsMatrix[i][j] != null){
						this.arr_staticGameObjectsMatrix[i][j].render(context);
					}
				}
			}
		}


		scaleGameObjectToTileSize(bomberGameObject:BomberGameObject, num_width:number, num_height:number, num_scale:number=1):void{
			var num_widthDiff:number=(this.num_tileWidth - num_width) * num_scale;
			var num_heightDiff:number=(this.num_tileHeight - num_height) * num_scale;
			if(num_widthDiff < num_heightDiff){
				bomberGameObject.num_width=(num_width + num_widthDiff);
				bomberGameObject.num_height=(num_height + num_widthDiff);
			}else{
				bomberGameObject.num_width=(num_width + num_heightDiff);
				bomberGameObject.num_height=(num_height + num_heightDiff);
			}
		}


		updateGridPosition(bomberGameObject:BomberGameObject){
			bomberGameObject.gridPosition=this.getGridPosition(bomberGameObject);
		}
	}
}