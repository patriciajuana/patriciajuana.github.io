///<reference path="BomberGameObject.ts"/>
///<reference path="BomberGameObjectTypes.ts"/>
module Main{
	export class Block extends BomberGameObject{
		constructor(num_xPos:number=0, num_yPos:number=0, num_width:number=0, num_height:number=0){
			super(num_xPos, num_yPos, num_width, num_height);

			this.str_type=BomberGameObjectTypes.BLOCK;
			this.str_debugFillStyle="#ff0000";
		}

		render(context:CanvasRenderingContext2D){
			//
			context.save();

			//cheat
			//context.fillStyle="#ffffff";
			//context.fillRect(this.num_xPos, this.num_yPos, this.num_width, this.num_height);

		 	//
		 	var spriteData:SpriteData=this.spriteDataSequence.arr_spriteData[this.num_spriteDataIndex];
		 	//
			context.drawImage(this.img_spriteSheet, 
				spriteData.num_xPos, 
				spriteData.num_yPos, 
				spriteData.num_width,
				spriteData.num_height, 
				this.num_xPos, 
				this.num_yPos, 
				this.num_width + 2, 
				this.num_height + 3);
			
			
			//debug
			//context.fillStyle="#ffffff";
			//context.fillRect(this.num_xPos, this.num_yPos, this.num_width, this.num_height);

			//
			context.restore();			
		}
	}
}