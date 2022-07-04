///<reference path="SpriteDataSequence"/>
module Main{
	export class SpriteDataSequenceList{
		//
		manWalkUp:SpriteDataSequence;
		manWalkDown:SpriteDataSequence;
		manWalkLeft:SpriteDataSequence;
		manWalkRight:SpriteDataSequence;
		manExplode:SpriteDataSequence;

		//
		enemyMoveLeft:SpriteDataSequence;
		enemyMoveRight:SpriteDataSequence;
		enemyExplode:SpriteDataSequence;

		//
		bomb:SpriteDataSequence;

		//
		block:SpriteDataSequence;

		//
		brick:SpriteDataSequence;
		brickExplode:SpriteDataSequence;

		//
		explosionUp:SpriteDataSequence;
		explosionDown:SpriteDataSequence;
		explosionLeft:SpriteDataSequence;
		explosionRight:SpriteDataSequence;
		explosionCenter:SpriteDataSequence;
		explosionHorizStem:SpriteDataSequence;
		explosionVertStem:SpriteDataSequence;

		constructor(){
			//
			this.manWalkDown=new SpriteDataSequence(0, 0, 12, 16, 3, 1);
			this.manWalkRight=new SpriteDataSequence(38, 0, 12, 16, 3, 1);
			this.manWalkUp=new SpriteDataSequence(0, 17, 12, 16, 3, 1);
			this.manWalkLeft=new SpriteDataSequence(38, 17, 12, 16, 3, 1);
			this.manExplode=new SpriteDataSequence(0, 34, 16, 16, 6, 1);

			//
			this.enemyMoveLeft=new SpriteDataSequence(0, 51, 16, 16, 3, 1);
			this.enemyMoveRight=new SpriteDataSequence(51, 51, 16, 16, 3, 1);
			this.enemyExplode=new SpriteDataSequence(102, 51, 16, 16, 4, 1);

			//
			this.bomb=new SpriteDataSequence(0, 67, 16, 17, 3, 1);

			//
			this.block=new SpriteDataSequence(0, 84, 16, 17, 1, 1);

			//
			this.brick=new SpriteDataSequence(0, 102, 16, 16, 1, 1);
			this.brickExplode=new SpriteDataSequence(17, 102, 16, 16, 6, 1);

			//
			this.explosionUp=new SpriteDataSequence(0, 119, 16, 16, 4, 1);
			this.explosionDown=new SpriteDataSequence(0, 136, 16, 16, 4, 1);
			this.explosionLeft=new SpriteDataSequence(0, 153, 16, 16, 4, 1);
			this.explosionRight=new SpriteDataSequence(0, 170, 16, 16, 4, 1);
			this.explosionCenter=new SpriteDataSequence(0, 187, 16, 16, 4, 1);
			this.explosionHorizStem=new SpriteDataSequence(0, 204, 16, 16, 4, 1);
			this.explosionVertStem=new SpriteDataSequence(0, 221, 16, 16, 4, 1);
		}
	}
}