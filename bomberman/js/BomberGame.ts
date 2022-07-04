///<reference path="BomberGameObject.ts"/>
///<reference path="Grid.ts"/>
///<reference path="Man.ts"/>
///<reference path="Enemy.ts"/>
///<reference path="Block.ts"/>
///<reference path="Brick.ts"/>
///<reference path="Bomb.ts"/>
///<reference path="Explosion.ts"/>
///<reference path="Direction.ts"/>
///<reference path="BomberGameObjectTypes.ts"/>
///<reference path="SpriteDataSequenceList.ts"/>
module Main{
	export class BomberGame{

		//
		context:CanvasRenderingContext2D;
		grid:Grid;
		man:Man;
		enemy:Enemy;
		arr_enemies:Array<Enemy>=[];
		arr_bombs:Array<Bomb>=[];
		arr_blocks:Array<Block>=[];
		arr_bricks:Array<Brick>=[];
		arr_explosions:Array<Explosion>=[];
		img_spritesheet:HTMLImageElement;
		spriteDataSequenceList:SpriteDataSequenceList;

		//
		num_frameCounter:number=0;
		num_frameCountPerStep:number=3;

		//
		arr_manMoveDirectionStack:Array<string>=[];

		//
		constructor(context:CanvasRenderingContext2D, img_spritesheet:HTMLImageElement){
			//
			this.context=context;
			(<any>context).mozImageSmoothingEnabled = false;
		 	(<any>context).webkitImageSmoothingEnabled = false;
		 	(<any>context).msImageSmoothingEnabled = false;
		 	(<any>context).imageSmoothingEnabled = false;

		 	//
			this.img_spritesheet=img_spritesheet;

			//recommended col and row is an odd number so that the blocks look symmetric
			this.grid=new Grid(window.innerWidth, window.innerHeight, 15, 15);
			
			//
			this.spriteDataSequenceList=new SpriteDataSequenceList();

			//init bricks and block
			this.initStaticObjects();

			//init man
			this.initMan();
			
			//init enemies
			this.initEnemies();
			

			//
			this.initEvents();

			//
			this.frameStep();
		}

		//INITS -----------------------------------------------------------------------------------------------------------------
		initEnemies():void{
			for(var i=0; i < 20; i++){
				this.addEnemy(new GridPosition( Math.floor(Math.random() * this.grid.num_cols), Math.floor(Math.random() * this.grid.num_rows) ));
			}	
		}

		initEvents():void{
			window.addEventListener("keydown", this);
			window.addEventListener("keyup", this);
		}

		initMan():void{
			this.man=new Man();
			this.man.img_spriteSheet=this.img_spritesheet;
			this.man.str_movementDirection=Direction.DOWN;
			this.man.spriteDataSequence=this.spriteDataSequenceList.manWalkDown;
			this.grid.scaleGameObjectToTileSize(this.man, this.man.spriteDataSequence.arr_spriteData[0].num_width, this.man.spriteDataSequence.arr_spriteData[0].num_height, 0.5);
			this.grid.positionGameObject(this.man, new GridPosition(1, 1));
			this.grid.alignGameObject(this.man, Direction.CENTER);
		}	

		initStaticObjects():void{
			//add border blocks
			for(var i=0; i < this.grid.num_rows; i++){
				this.addBlock(new GridPosition(i, 0));
				this.addBlock(new GridPosition(i, this.grid.num_cols - 1));
			}
			for(var i=0; i < this.grid.num_cols; i++){
				this.addBlock(new GridPosition(0, i));
				this.addBlock(new GridPosition(this.grid.num_rows - 1, i));
			}

			//add center blocks
			for(var i=2; i < this.grid.num_rows - 2; i+=2){
				for(var j=2; j < this.grid.num_cols - 2; j+=2){
					this.addBlock(new GridPosition(i, j));
				}
			}
			
			//add bricks
			var gridPosition:GridPosition;
			for(var i=0; i < 100; i++){
				gridPosition=new GridPosition( Math.floor(Math.random() * this.grid.num_rows), Math.floor(Math.random() * this.grid.num_cols) );
				if(gridPosition.num_row == 1 && gridPosition.num_col == 1) continue;
				this.addBrick(gridPosition);
			}
		}


		//FUNCTIONS --------------------------------------------------------------------------------------------------------------
		addBlock(gridPosition:GridPosition):void{
			var block:Block=new Block();
			block.img_spriteSheet=this.img_spritesheet;
			block.spriteDataSequence=this.spriteDataSequenceList.block;
			this.grid.addStaticGameObject(block, gridPosition);

			//
			this.arr_blocks.push(block);
		}

		
		addBrick(gridPosition:GridPosition):void{
			if( this.grid.getGameObject(gridPosition) != null ) return;
			var brick:Brick=new Brick(gridPosition.num_row + "_" + gridPosition.num_col);
			brick.img_spriteSheet=this.img_spritesheet;
			brick.spriteDataSequence=this.spriteDataSequenceList.brick;
			this.grid.addStaticGameObject(brick, gridPosition);
			this.arr_bricks.push(brick);	
		}

		
		addExplosion(bomb:Bomb, str_type:string, gridPosition:GridPosition){
			//
			var explosion:Explosion=new Explosion(bomb.str_id + "_" + gridPosition.num_row + "_" + gridPosition.num_col, str_type);
			explosion.img_spriteSheet=this.img_spritesheet;

			//
			switch(str_type){
				case Explosion.UP:
					explosion.spriteDataSequence=this.spriteDataSequenceList.explosionUp;
				break;
				case Explosion.DOWN:
					explosion.spriteDataSequence=this.spriteDataSequenceList.explosionDown;
				break;
				case Explosion.LEFT:
					explosion.spriteDataSequence=this.spriteDataSequenceList.explosionLeft;
				break;
				case Explosion.RIGHT:
					explosion.spriteDataSequence=this.spriteDataSequenceList.explosionRight;
				break;
				case Explosion.CENTER:
					explosion.spriteDataSequence=this.spriteDataSequenceList.explosionCenter;
				break;
				case Explosion.HORIZ_STEM:
					explosion.spriteDataSequence=this.spriteDataSequenceList.explosionHorizStem;
				break;
				case Explosion.VERT_STEM:
					explosion.spriteDataSequence=this.spriteDataSequenceList.explosionVertStem;
				break;
			}

			//
			this.grid.scaleGameObjectToTileSize(explosion, this.grid.num_tileWidth, this.grid.num_tileHeight, 1);
			//this.grid.scaleGameObjectToTileSize(explosion, explosion.spriteDataSequence.arr_spriteData[0].num_width, explosion.spriteDataSequence.arr_spriteData[0].num_height, 1);			
			this.grid.positionGameObject(explosion, gridPosition);
			this.grid.alignGameObject(explosion, Direction.CENTER);
			
			//
			this.arr_explosions.push(explosion);
		}

		
		addEnemy(gridPosition:GridPosition):void{
			if( this.grid.getGameObject(gridPosition) != null ) return;

			//
			var enemy:Enemy=new Enemy(this.arr_enemies.length.toString());
			enemy.img_spriteSheet=this.img_spritesheet;
			enemy.str_movementDirection=Direction.RIGHT;
			enemy.spriteDataSequence=this.spriteDataSequenceList.enemyMoveRight;
			this.grid.scaleGameObjectToTileSize(enemy, enemy.spriteDataSequence.arr_spriteData[0].num_width, enemy.spriteDataSequence.arr_spriteData[0].num_height, 0.8);
			this.grid.positionGameObject(enemy, gridPosition);
			this.grid.alignGameObject(enemy, Direction.CENTER);

			//
			this.arr_enemies.push(enemy);
		}


		checkBombsState():void{
			var bomb:Bomb;
			for(var i=0; i < this.arr_bombs.length; i++){
				//
				bomb=this.arr_bombs[i];
				bomb.num_explodeTimeCounter++;
				
				//update sprite settings
				if(bomb.num_animationTimeCounter > bomb.num_animationTime){
					//
					bomb.num_animationTimeCounter=0;

					//
					bomb.num_spriteDataIndex++;
					if(bomb.num_spriteDataIndex >= bomb.spriteDataSequence.arr_spriteData.length){
						bomb.num_spriteDataIndex=0;
					}
				}else{
					bomb.num_animationTimeCounter++;
				}

				//
				if(bomb.num_explodeTimeCounter >= bomb.num_explodeTime){
					//
					this.explodeBomb(bomb);
					this.removeBomb(bomb);
				}else{
					//do nothing
				}
			}
		}

		
		checkEnemyManCollision():void{
			var enemy:Enemy;
			for(var i=0; i < this.arr_enemies.length; i++){
				enemy=this.arr_enemies[i];
				if( enemy.gridPosition.isEqualTo(this.man.gridPosition) ){
					this.killMan();
					break;
				}
			}
		}

		
		checkEnemiesState():void{
			var enemy:Enemy;
			var num_xPos:number;
			var num_yPos:number;

			for(var i=0; i < this.arr_enemies.length; i++){
				//
				enemy=this.arr_enemies[i];

				//
				if(enemy.isKilled){
					//update sprite settings
					if(enemy.num_animationTimeCounter > enemy.num_animationTime){
						//
						enemy.num_animationTimeCounter=0;

						//
						enemy.num_spriteDataIndex++;
						if(enemy.num_spriteDataIndex >= enemy.spriteDataSequence.arr_spriteData.length){
							//remove enemy from array
							this.arr_enemies.splice(i, 1);
							i--;
						}
					}else{
						enemy.num_animationTimeCounter++;
					}
					continue;
				}

				//
				num_xPos=enemy.num_xPos;
				num_yPos=enemy.num_yPos;

				//
				switch(enemy.str_movementDirection){
					case Direction.UP:
						num_yPos-=enemy.num_speed;
					break;
					case Direction.DOWN:
						num_yPos+=enemy.num_speed;
					break;
					case Direction.LEFT:
						num_xPos-=enemy.num_speed;
					break;
					case Direction.RIGHT:
						num_xPos+=enemy.num_speed;
					break;
				}

				

				//check for static objects
				var arr_bomberGameObjects:Array<BomberGameObject>=this.grid.getGameObjectsAtBounds(num_xPos, num_yPos, enemy.num_width, enemy.num_height);
				if ( arr_bomberGameObjects.length > 0 ){
					this.grid.alignGameObject(enemy, enemy.str_movementDirection);
					//super simple ai (only changes direction on block/brick collision)
					enemy.changeToRandomDirection();

					//update sprite settings
					enemy.num_spriteDataIndex=0;
					switch(enemy.str_movementDirection){
						case Direction.LEFT:
							enemy.spriteDataSequence=this.spriteDataSequenceList.enemyMoveLeft;
						break;
						case Direction.RIGHT:
							enemy.spriteDataSequence=this.spriteDataSequenceList.enemyMoveRight;
						break;
					}
				}else{
					//
					enemy.num_xPos=num_xPos;
					enemy.num_yPos=num_yPos;
					this.grid.updateGridPosition(enemy);

					//update sprite settings
					if(enemy.num_animationTimeCounter > enemy.num_animationTime){
						//
						enemy.num_animationTimeCounter=0;

						//
						enemy.num_spriteDataIndex++;
						if(enemy.num_spriteDataIndex >= enemy.spriteDataSequence.arr_spriteData.length){
							enemy.num_spriteDataIndex=0;
						}
					}else{
						enemy.num_animationTimeCounter++;
					}

				}

				

			}
		}

		
		checkExplosionsState():void{
			var explosion:Explosion;
			for(var i=0; i < this.arr_explosions.length;){
				explosion=this.arr_explosions[i];


				//update sprite settings
				explosion.num_animationTimeCounter++;
				if(explosion.num_animationTimeCounter > explosion.num_animationTime){

					//
					explosion.num_animationTimeCounter=0;

					//
					if(explosion.str_spriteYoyoDirection == "forward"){
						explosion.num_spriteDataIndex++;	
					}else{
						explosion.num_spriteDataIndex--;
					}
					//
					if(explosion.num_spriteDataIndex >= explosion.spriteDataSequence.arr_spriteData.length - 1){
						explosion.str_spriteYoyoDirection="backward";
					}else if(explosion.num_spriteDataIndex < 0){
						//remove explosion
						this.arr_explosions.splice(i, 1);
						continue;
					}
				}
				i++;
			}
		}


		checkManState(){
			//
			if(this.man.isKilled){
				//update sprite settings
				if(this.man.num_animationTimeCounter > this.man.num_animationTime){
					//
					this.man.num_animationTimeCounter=0;

					//
					this.man.num_spriteDataIndex++;
					if(this.man.num_spriteDataIndex >= this.man.spriteDataSequence.arr_spriteData.length){
						//this.man.num_spriteDataIndex=0;
						this.man.isDead=true;
					}
				}else{
					this.man.num_animationTimeCounter++;
				}
				return;
			}

			//
			if(this.arr_manMoveDirectionStack.length > 0){
				//
				var str_direction:string=this.arr_manMoveDirectionStack[this.arr_manMoveDirectionStack.length - 1];

				//
				var num_newXPos:number=this.man.num_xPos;
				var num_newYPos:number=this.man.num_yPos;

				//
				switch(str_direction){
					case Direction.UP: //w
						num_newYPos-=this.man.num_speed;
						this.moveMan(num_newXPos, num_newYPos, str_direction);
					break;
					case Direction.DOWN: //s
						num_newYPos+=this.man.num_speed;
						this.moveMan(num_newXPos, num_newYPos, str_direction);
					break;
					case Direction.LEFT: //a
						num_newXPos-=this.man.num_speed;
						this.moveMan(num_newXPos, num_newYPos, str_direction);
					break;
					case Direction.RIGHT: //d
						num_newXPos+=this.man.num_speed;
						this.moveMan(num_newXPos, num_newYPos, str_direction);
					break;
				}
			}
		}

		
		deployBomb():void{
			//if an object exist on the same gridPosition
			if( this.grid.getGameObject(this.man.gridPosition) != null ) return;

			//
			var bomb:Bomb=new Bomb(this.man.gridPosition.num_row + "_" + this.man.gridPosition.num_col);
			bomb.img_spriteSheet=this.img_spritesheet;
			bomb.spriteDataSequence=this.spriteDataSequenceList.bomb;
			this.grid.addStaticGameObject( bomb, new GridPosition(this.man.gridPosition.num_row, this.man.gridPosition.num_col) );
			this.grid.scaleGameObjectToTileSize(bomb, bomb.spriteDataSequence.arr_spriteData[0].num_width, bomb.spriteDataSequence.arr_spriteData[0].num_height, 1);
			this.grid.alignGameObject(bomb, Direction.CENTER);
			//
			this.man.isOnTopOfBomb=true;
			this.man.lastBombDeployed=bomb;

			//
			this.arr_bombs.push(bomb);
		}


		explodeBomb(bomb:Bomb):void{
			//get affected grid positions
			var arr_gridPositions:Array<GridPosition>=[];
			var gridPosition:GridPosition;
			var bomberGameObject:BomberGameObject;
			//up
			for(var i=0; i < bomb.num_explodeLength; i++){
				gridPosition=new GridPosition(bomb.gridPosition.num_row - (i + 1), bomb.gridPosition.num_col);
				if( (bomberGameObject=this.grid.getGameObject(gridPosition)) != null ){
					if(bomberGameObject.str_type == BomberGameObjectTypes.BLOCK) break;
				}
				if(i < bomb.num_explodeLength - 1){
					this.addExplosion(bomb, Explosion.VERT_STEM, new GridPosition(gridPosition.num_row, gridPosition.num_col));
				}else{
					this.addExplosion(bomb, Explosion.UP, new GridPosition(gridPosition.num_row, gridPosition.num_col));
				}
				arr_gridPositions.push(gridPosition);
			}
			//down
			for(var i=0; i < bomb.num_explodeLength; i++){
				gridPosition=new GridPosition(bomb.gridPosition.num_row + (i + 1), bomb.gridPosition.num_col);
				if( (bomberGameObject=this.grid.getGameObject(gridPosition)) != null ){
					if(bomberGameObject.str_type == BomberGameObjectTypes.BLOCK) break;
				}
				if(i < bomb.num_explodeLength - 1){
					this.addExplosion(bomb, Explosion.VERT_STEM, new GridPosition(gridPosition.num_row, gridPosition.num_col));
				}else{
					this.addExplosion(bomb, Explosion.DOWN, new GridPosition(gridPosition.num_row, gridPosition.num_col));
				}
				arr_gridPositions.push(gridPosition);
			}
			//left
			for(var i=0; i < bomb.num_explodeLength; i++){
				gridPosition=new GridPosition(bomb.gridPosition.num_row, bomb.gridPosition.num_col - (i + 1));
				if( (bomberGameObject=this.grid.getGameObject(gridPosition)) != null ){
					if(bomberGameObject.str_type == BomberGameObjectTypes.BLOCK) break;
				}
				if(i < bomb.num_explodeLength - 1){
					this.addExplosion(bomb, Explosion.HORIZ_STEM, new GridPosition(gridPosition.num_row, gridPosition.num_col));
				}else{
					this.addExplosion(bomb, Explosion.LEFT, new GridPosition(gridPosition.num_row, gridPosition.num_col));
				}
				arr_gridPositions.push(gridPosition);
			}
			//right
			for(var i=0; i < bomb.num_explodeLength; i++){
				gridPosition=new GridPosition(bomb.gridPosition.num_row, bomb.gridPosition.num_col + (i + 1));
				if( (bomberGameObject=this.grid.getGameObject(gridPosition)) != null ){
					if(bomberGameObject.str_type == BomberGameObjectTypes.BLOCK) break;
				}
				if(i < bomb.num_explodeLength - 1){
					this.addExplosion(bomb, Explosion.HORIZ_STEM, new GridPosition(gridPosition.num_row, gridPosition.num_col));
				}else{
					this.addExplosion(bomb, Explosion.RIGHT, new GridPosition(gridPosition.num_row, gridPosition.num_col));
				}
				arr_gridPositions.push(gridPosition);
			}

			//create center explosion
			this.addExplosion(bomb, Explosion.CENTER, new GridPosition(bomb.gridPosition.num_row, bomb.gridPosition.num_col));
			arr_gridPositions.push(new GridPosition(bomb.gridPosition.num_row, bomb.gridPosition.num_col));


			//check hits			
			for(var i=0; i < arr_gridPositions.length; i++){
				//
				gridPosition=arr_gridPositions[i];

				//check static objects hit
				this.staticGameObjectBombHit( this.grid.getGameObject(gridPosition) );

				
				//check enemies - note:feels inefficient
				for(var j=0; j < this.arr_enemies.length; j++){
					if( gridPosition.isEqualTo( this.arr_enemies[j].gridPosition ) ){
						//remove from arr_enemies
						//this.arr_enemies.splice(j, 1);
						//this.arr_enemies[j].isKilled=true;
						this.killEnemy(this.arr_enemies[j]);
					}
				}

				//check man hit
				if( gridPosition.isEqualTo( this.man.gridPosition ) ){
					//
					this.killMan();
				}
			}

		}

		
		frameStep():void{
			//
			this.num_frameCounter++;
			if(this.num_frameCounter >= this.num_frameCountPerStep){
				this.num_frameCounter=0;

				//check objects state -------
				this.checkManState();
				this.checkEnemiesState();
				this.checkBombsState();
				this.checkExplosionsState();
				this.checkEnemyManCollision();

				//render graphics -------
				this.context.clearRect(0, 0, this.grid.num_width, this.grid.num_height);
				//
				//this.grid.render(this.context);
				//render blocks
				for(var i=0; i < this.arr_blocks.length; i++) this.arr_blocks[i].render(this.context);
				//render bricks
				for(var i=0; i < this.arr_bricks.length; i++) this.arr_bricks[i].render(this.context);
				//render bombs
				for(var i=0; i < this.arr_bombs.length; i++) this.arr_bombs[i].render(this.context);
				//render explosions
				for(var i=0; i < this.arr_explosions.length; i++) this.arr_explosions[i].render(this.context);
				//render enemies
				for(var i=0; i < this.arr_enemies.length; i++) this.arr_enemies[i].render(this.context);
				//render man
				if(this.man.isDead == false){ //lazy way
					this.man.render(this.context);
				}				

			}

			//
			window.requestAnimationFrame( () => {this.frameStep();} );
		}


		killMan():void{
			//
			if(this.man.isKilled) return;

			//
			this.man.isKilled=true;

			//
			this.man.num_animationTimeCounter=0;
			this.man.num_spriteDataIndex=0;
			this.man.spriteDataSequence=this.spriteDataSequenceList.manExplode;
		}


		killEnemy(enemy:Enemy):void{
			//
			if(enemy.isKilled) return;

			//
			enemy.isKilled=true;

			//
			enemy.num_animationTimeCounter=0;
			enemy.num_spriteDataIndex=0;
			enemy.spriteDataSequence=this.spriteDataSequenceList.enemyExplode;
		}

		
		moveMan(num_xPos:number, num_yPos:number, str_direction:string):void{
			//update sprite settings
			if(this.man.str_movementDirection != str_direction){
				this.man.num_spriteDataIndex=0;
				this.man.str_movementDirection=str_direction;
				//
				switch(str_direction){
					case Direction.UP:
						this.man.spriteDataSequence=this.spriteDataSequenceList.manWalkUp;
					break;
					case Direction.DOWN:
						this.man.spriteDataSequence=this.spriteDataSequenceList.manWalkDown;
					break;
					case Direction.LEFT:
						this.man.spriteDataSequence=this.spriteDataSequenceList.manWalkLeft;
					break;
					case Direction.RIGHT:
						this.man.spriteDataSequence=this.spriteDataSequenceList.manWalkRight;
					break;
				}
			}else{
				this.man.num_spriteDataIndex++;
				if(this.man.num_spriteDataIndex >= this.man.spriteDataSequence.arr_spriteData.length) this.man.num_spriteDataIndex=0;
			}

			//check for static objects
			var arr_bomberGameObjects:Array<BomberGameObject>=this.grid.getGameObjectsAtBounds(num_xPos, num_yPos, this.man.num_width, this.man.num_height);
			if ( arr_bomberGameObjects.length > 0 ){

				//
				for(var i=0; i < arr_bomberGameObjects.length; i++){
					//
					if(arr_bomberGameObjects[i].str_type == BomberGameObjectTypes.BOMB && 
						this.man.isOnTopOfBomb && 
						this.man.lastBombDeployed == arr_bomberGameObjects[i]){

						//has just deployed a bomb and man is on top of it
						this.man.num_xPos=num_xPos;
						this.man.num_yPos=num_yPos;
						this.grid.updateGridPosition(this.man);
					}else{
						//one of the objects is a static object
						this.grid.alignGameObject(this.man, str_direction);
						break;
					}
				}

			}else{
				//
				this.man.num_xPos=num_xPos;
				this.man.num_yPos=num_yPos;
				this.grid.updateGridPosition(this.man);

				//
				this.man.isOnTopOfBomb=false;
			}
		}

		
		removeBomb(bomb:Bomb):void{
			//
			this.grid.removeStaticGameObject(bomb);

			//
			for(var i=0; i < this.arr_bombs.length; i++){
				if(this.arr_bombs[i].str_id == bomb.str_id){
					this.arr_bombs.splice(i, 1);
					break;
				}
			}
		}


		removeBrick(brick:Brick):void{
			//
			this.grid.removeStaticGameObject(brick);

			//
			for(var i=0; i < this.arr_bricks.length; i++){
				if(this.arr_bricks[i].str_id == brick.str_id){
					this.arr_bricks.splice(i, 1);
					break;
				}
			}
		}


		staticGameObjectBombHit(bomberGameObject:BomberGameObject):void{
			if(bomberGameObject == undefined) return;
			if(bomberGameObject == null) return;
			if( bomberGameObject.str_type == BomberGameObjectTypes.BRICK ){
				//destroy brick
				this.removeBrick(<Brick>bomberGameObject);
			}
		}

		

		//EVENT HANDLERS ----------------------------------------------------------------------------------------------------------
		handleEvent(e){
			//
			switch(e.type){
				case "keydown":
					//
					var str_direction:string="";

					//
					switch(e.keyCode){
						case 87: //w
							str_direction=Direction.UP;
						break;
						case 83: //s
							str_direction=Direction.DOWN;
						break;
						case 65: //a
							str_direction=Direction.LEFT;
						break;
						case 68: //d
							str_direction=Direction.RIGHT;
						break;
						case 32: //space
							this.deployBomb();
						break;
					}

					//
					if(str_direction != ""){
						if(this.arr_manMoveDirectionStack[this.arr_manMoveDirectionStack.length - 1] == str_direction){
							//do nothing
						}else{
							//
							for(var i=0; i < this.arr_manMoveDirectionStack.length - 1;){
								if(this.arr_manMoveDirectionStack[i] == str_direction){
									this.arr_manMoveDirectionStack.splice(i, 1);
								}else{
									i++;
								}
							}
							//
							this.arr_manMoveDirectionStack.push(str_direction);
						}
					}
					
				break;
				case "keyup":
					//
					var str_direction:string="";

					//
					switch(e.keyCode){
						case 87: //w
							str_direction=Direction.UP;
						break;
						case 83: //s
							str_direction=Direction.DOWN;
						break;
						case 65: //a
							str_direction=Direction.LEFT;
						break;
						case 68: //d
							str_direction=Direction.RIGHT;
						break;
						case 32: //space
							//do nothing
						break;
					}

					//
					if(str_direction != ""){
						//
						for(var i=0; i < this.arr_manMoveDirectionStack.length;){
							if(this.arr_manMoveDirectionStack[i] == str_direction){
								this.arr_manMoveDirectionStack.splice(i, 1);
							}else{
								i++;
							}
						}
					}
				break;
			}

		}

	}
}