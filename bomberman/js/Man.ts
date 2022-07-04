///<reference path="BomberGameObject.ts"/>
///<reference path="BomberGameObjectTypes.ts"/>
///<reference path="Direction.ts"/>
///<reference path="Bomb.ts"/>
///<reference path="SpriteData.ts"/>
///<reference path="SpriteDataSequence.ts"/>
module Main{
	
	export class Man extends BomberGameObject{

		//
		isOnTopOfBomb:boolean;
		lastBombDeployed:Bomb;
		str_movementDirection:string;

		//
		isKilled:boolean=false;
		isDead:boolean=false;

		//
		num_animationTime:number=1; //note: frame counter for now
		num_animationTimeCounter:number=0;
		

		constructor(num_xPos:number=0, num_yPos:number=0, num_width:number=0, num_height:number=0){
			//
			super(num_xPos, num_yPos, num_width, num_height);

			//
			this.str_type=BomberGameObjectTypes.MAN;
			this.str_debugFillStyle="#ff0000";

			//
			this.isOnTopOfBomb=false;
			this.lastBombDeployed=null;
			this.str_movementDirection="";
						
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