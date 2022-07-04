///<reference path="BomberGameObject.ts"/>
///<reference path="BomberGameObjectTypes.ts"/>
module Main{
	export class Bomb extends BomberGameObject{

		//
		str_id:string;
		num_explodeTime:number=60; //note: frame counter for now
		num_explodeTimeCounter:number=0;
		num_explodeLength:number=2;
		
		//
		num_animationTime:number=3; //note: frame counter for now
		num_animationTimeCounter:number=0;

		//
		constructor(str_id:string, num_xPos:number=0, num_yPos:number=0, num_width:number=0, num_height:number=0){
			super(num_xPos, num_yPos, num_width, num_height);

			//
			this.str_type=BomberGameObjectTypes.BOMB;
			this.str_debugFillStyle="#000000";

			//
			this.str_id=str_id;
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