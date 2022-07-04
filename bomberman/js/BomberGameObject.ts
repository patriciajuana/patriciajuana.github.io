///<reference path="SpriteDataSequence"/>
///<reference path="Direction"/>
///<reference path="GridPosition.ts"/>
module Main{
	export class BomberGameObject{
		//
		img_spriteSheet:HTMLImageElement;
		spriteDataList:SpriteDataSequence;

		//
		num_xPos:number;
		num_yPos:number;
		num_width:number;
		num_height:number;

		//
		str_type:string;
		num_speed:number=5;

		//
		gridPosition:GridPosition;

		//
		num_spriteDataIndex:number;
		spriteDataSequence:SpriteDataSequence;

		//
		str_debugFillStyle:string;

		//
		constructor(num_xPos:number=0, num_yPos:number=0, num_width:number=0, num_height:number=0){
			//
			this.img_spriteSheet=null;
			this.num_xPos=num_xPos;
			this.num_yPos=num_yPos;
			this.num_width=num_width;
			this.num_height=num_height;
			this.str_debugFillStyle="#000000";

			//
			this.num_spriteDataIndex=0;
			this.spriteDataSequence=null;
		}

		move(str_direction:string){
			switch(str_direction){
				case Direction.UP:
					this.num_yPos-=this.num_speed;
				break;
				case Direction.DOWN:
					this.num_yPos+=this.num_speed;
				break;
				case Direction.LEFT:
					this.num_xPos-=this.num_speed;
				break;
				case Direction.RIGHT:
					this.num_xPos+=this.num_speed;
				break;
			}
			//console.log("Man.move:", this.num_xPos, this.num_yPos);
		}
		
		render(context:CanvasRenderingContext2D){
			//console.log("rendering:", this.str_type, this.num_xPos, this.num_yPos, this.num_width, this.num_height);
			this.renderDebug(context);
		}

		renderDebug(context:CanvasRenderingContext2D){
			context.beginPath();
			context.fillStyle=this.str_debugFillStyle;
			context.rect(this.num_xPos, this.num_yPos, this.num_width, this.num_height);
			context.fill();
		}
	}
}
