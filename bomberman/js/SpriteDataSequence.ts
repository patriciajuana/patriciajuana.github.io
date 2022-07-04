///<reference path="SpriteData"/>
module Main{
	export class SpriteDataSequence{
		arr_spriteData:Array<SpriteData>;

		//simple horizontal generator only
		constructor(num_startXPos:number, num_startYPos:number, num_width:number, num_height:number, num_count:number, num_margin:number){
			this.arr_spriteData=[];
			for(var i=0; i < num_count; i++){
				this.arr_spriteData.push( new SpriteData(num_startXPos + (i * (num_width + num_margin)), num_startYPos, num_width, num_height) );
			}
		}
	}
}
