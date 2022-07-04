///<reference path="BomberGameObject.ts"/>
///<reference path="BomberGameObjectTypes.ts"/>
module Main{
	export class Explosion extends BomberGameObject{

		//explosion parts
		static CENTER:string="center";
		static UP:string="up";
		static DOWN:string="down";
		static LEFT:string="left";
		static RIGHT:string="right";
		static HORIZ_STEM:string="horiz_stem";
		static VERT_STEM:string="vert_stem";

		//
		str_id:string;
		str_explosionPart:string;

		//
		str_spriteYoyoDirection:string="forward";

		//
		num_animationTime:number=0; //note: frame counter for now
		num_animationTimeCounter:number=0;

		constructor(str_id:string, str_explosionPart:string, num_xPos:number=0, num_yPos:number=0, num_width:number=0, num_height:number=0){
			super(num_xPos, num_yPos, num_width, num_height);

			//
			this.str_type=BomberGameObjectTypes.EXPLOSION;
			this.str_debugFillStyle="#ffcc00";

			//
			this.str_id=str_id;
			this.str_explosionPart=str_explosionPart;
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
				this.num_width + 2, 
				this.num_height + 2);

			//cheat
			//context.fillStyle="#ffffff";
			//context.fillRect(this.num_xPos, this.num_yPos, this.num_width, this.num_height);

			//debug
			//context.strokeStyle="#ffffff";
			//context.lineWidth=2;
			//context.strokeRect(this.num_xPos, this.num_yPos, this.num_width, this.num_height);

			//
			context.restore();			
		}

	}	
}