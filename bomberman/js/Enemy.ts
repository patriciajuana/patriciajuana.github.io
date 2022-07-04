///<reference path="BomberGameObject.ts"/>
///<reference path="BomberGameObjectTypes.ts"/>
///<reference path="Direction.ts"/>
module Main{
	
	export class Enemy extends BomberGameObject{

		//
		str_id:string;
		str_movementDirection:string;

		//
		isKilled:boolean=false;

		//
		num_animationTime:number=1; //note: frame counter for now
		num_animationTimeCounter:number=0;

		constructor(str_id:string,num_xPos:number=0, num_yPos:number=0, num_width:number=0, num_height:number=0){
			super(num_xPos, num_yPos, num_width, num_height);

			this.str_type=BomberGameObjectTypes.ENEMY;
			this.str_debugFillStyle="#0000ff";

			this.str_id=str_id;
		}

		changeToRandomDirection():void{
			var arr_direction:Array<string>=[Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
			//var arr_direction:Array<string>=[Direction.LEFT, Direction.RIGHT];
			this.str_movementDirection=arr_direction[Math.floor(Math.random() * arr_direction.length)];
		}

		render(context:CanvasRenderingContext2D){
			//
			context.save();

		 	//
		 	var spriteData:SpriteData=this.spriteDataSequence.arr_spriteData[this.num_spriteDataIndex];
			context.drawImage(this.img_spriteSheet, 
				spriteData.num_xPos, 
				spriteData.num_yPos, 
				spriteData.num_width, 
				spriteData.num_height, 
				this.num_xPos, 
				this.num_yPos, 
				this.num_width, 
				this.num_height);

			//debug
			//context.strokeStyle=this.str_debugFillStyle;
			//context.strokeRect(this.num_xPos, this.num_yPos, this.num_width, this.num_height);

			//
			context.restore();			
		}
	}
}