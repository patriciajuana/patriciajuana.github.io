//asteroid settings
var _int_minAsteroidSize=20;
var _int_maxAsteroidSize=70;
var _int_maxAsteroidSpeed=5;
var _int_maxAsteroidBreakParts=3;

//ship settings
var _int_shipMaxAcceleration=2;
var _int_shipAccelerationIncrement=0.005;
var _int_shipAcceleration=0;
var _int_shipAccelerationMultiplier=0;

//
var _int_prevMousePosX=0;
var _int_prevMousePosY=0;
var _str_keyState="";

//
var _arr_asteroidList=[];
var _arr_bulletList=[];
var _arr_sprayList=[];
var _ship=new Ship({int_size:15});
_ship.int_x=$(window).width()/2;
_ship.int_y=$(window).height()/2;


//
var _starfieldCanvas=new CanvasElement("container", "starfield", $(window).width(), $(window).height());
for(var i=0; i < 500; i++){
	star=createRandomStar(Math.floor( Math.random() * $(window).width() ), Math.floor( Math.random() * $(window).height() ));
	star.render( $("#starfield").get(0).getContext("2d") );
}


//
var _space=new Space();
_space.createCanvas("container", "space", $(window).width(), $(window).height());
_space.jqElem.mousemove(mouseMoveEventHandler);
_space.jqElem.mousedown(mouseDownEventHandler);
$(window).keydown(keyDownEventHandler);
$(window).keyup(keyUpEventHandler);

//
var intervalRenderer=setInterval(renderAll, 10);

//
var intervalAsteroidCreator=setInterval(function(){
	createRandomAsteroid($(window).width()/2, $(window).height()/2);	
}, 500);




/*
//test
var asteroid=new Asteroid({
	str_id:"asteroid" + _arr_asteroidList.length,
	int_size:100,
	int_startX:$(window).width()/2,
	int_startY:0,
	int_direction:degreesToRadians(90),
	int_speed:0.5
});
//
_arr_asteroidList.push(asteroid);*/




//EVENT HANDLERS ---------------------------------------------------------------------------------------------------------------------
function mouseMoveEventHandler(event){

	//fix for mousemove triggering mouseup
	if(event.pageX == _int_prevMousePosX && event.pageY == _int_prevMousePosY) return;
	_int_prevMousePosX=event.pageX;
	_int_prevMousePosY=event.pageY;

	//aim ship from mouse position
	var int_xLength=event.pageX - _ship.int_x;
	var int_yLength=event.pageY - _ship.int_y;
	var int_angle;
	if(event.pageX > _ship.int_x){
		int_angle=Math.atan(int_yLength/int_xLength);
		if(event.pageY < _ship.int_y) int_angle=Math.atan(int_yLength/int_xLength) + degreesToRadians(360);
	}else int_angle=Math.atan(int_yLength/int_xLength) + degreesToRadians(180);
	_ship.int_rotation=int_angle;

}
function mouseDownEventHandler(event){
	//
	shoot();
}
function keyDownEventHandler(event){
	//spacebar
	if(event.which == 32){
		_str_keyState="down";
		createShipExhaustSpray();
	}
	//enter
	if(event.which == 13){
		$("#instructions").css("display", "none");
	}
}
function keyUpEventHandler(event){
	_str_keyState="up";
	//dasd
}





//FUNCTIONS --------------------------------------------------------------------------------------------------------------------------
function breakAsteroid(asteroid){
	var int_breakParts=1 + Math.ceil( Math.random() * _int_maxAsteroidBreakParts );
	//for(var i=0; i < int_breakParts; i++){
		//if(asteroid.int_size/3 < _int_minAsteroidSize) return;

	if(asteroid.isWhole == false || asteroid.int_size/2 <= _int_minAsteroidSize){
		//blow up
		createAsteroidBreakBlowup(asteroid);
		return;
	}

	for(var i=0; i < 2; i++){

		var int_baseDirection=Math.floor( Math.random() * 180 );
		var int_direction;
		if(i == 0) int_direction=asteroid.int_hitDirection - degreesToRadians(int_baseDirection);
		else int_direction=asteroid.int_hitDirection + degreesToRadians(int_baseDirection);

		var newAsteroid=new Asteroid({
			str_id:"asteroid" + _arr_asteroidList.length,
			int_size:asteroid.int_size/1.2,
			int_startX:asteroid.int_x,
			int_startY:asteroid.int_y,
			int_direction:int_direction,
			int_speed:eval( "0." + Math.ceil(Math.random() * _int_maxAsteroidSpeed) )
		});
		newAsteroid.str_image=asteroid.str_image;
		newAsteroid.isWhole=false;
		//newAsteroid.int_imageRotation=asteroid.int_imageRotation;
		//newAsteroid.str_imageRotationDirection=i;
		_arr_asteroidList.push(newAsteroid);

	}
	
	//
	createAsteroidBreakCracklings(asteroid);
}

function checkAsteroidCollision(asteroid1, asteroid2){
	return;
	//
	var int_tolerance=-10;
	var int_distance=getDistance(asteroid1.int_x, asteroid1.int_y, asteroid2.int_x, asteroid2.int_y);
	if( int_distance - (asteroid1.int_size + asteroid2.int_size) <= 0 + int_tolerance ){

		//
		var int_xLength=asteroid1.int_x - asteroid2.int_x;
		var int_yLength=asteroid1.int_y - asteroid2.int_y;
		var int_newDirection1=Math.atan(int_yLength/int_xLength) + degreesToRadians(180);
		var int_newDirection2=Math.atan(int_yLength/int_xLength);
		
		var int_windowLength=getDistance(0, 0, $(window).width(), $(window).height());
		var int_startX1=int_windowLength * Math.cos(int_newDirection1) + asteroid1.int_x;
		var int_startY1=int_windowLength * Math.sin(int_newDirection1) + asteroid1.int_y;
		var int_startX2=int_windowLength * Math.cos(int_newDirection2) + asteroid1.int_x;
		var int_startY2=int_windowLength * Math.sin(int_newDirection2) + asteroid1.int_y;

		//check which asteroid is closest to specific start position
		var int_distanceAsteroid1=getDistance(asteroid1.int_x, asteroid1.int_y, int_startX1, int_startY1);
		var int_distanceAsteroid2=getDistance(asteroid2.int_x, asteroid2.int_y, int_startX1, int_startY1);
		
		//
		if(int_distanceAsteroid1 < int_distanceAsteroid2){
			//
			asteroid1.int_startX=asteroid1.int_x;
			asteroid1.int_startY=asteroid1.int_y;
			asteroid1.int_distance=0;
			asteroid1.int_direction=int_newDirection1;
			//
			asteroid2.int_startX=asteroid2.int_x;
			asteroid2.int_startY=asteroid2.int_y;
			asteroid2.int_distance=0;
			asteroid2.int_direction=int_newDirection2;
		}else{
			asteroid1.int_startX=asteroid1.int_x;
			asteroid1.int_startY=asteroid1.int_y;
			asteroid1.int_distance=0;
			asteroid1.int_direction=int_newDirection2;

			asteroid2.int_startX=asteroid2.int_x;
			asteroid2.int_startY=asteroid2.int_y;
			asteroid2.int_distance=0;
			asteroid2.int_direction=int_newDirection1;
		}
	}
}

function checkBulletCollision(bullet, asteroid){
	//
	if(asteroid.int_size < _int_minAsteroidSize) return;

	//
	var int_distance=getDistance(bullet.int_x, bullet.int_y, asteroid.int_x, asteroid.int_y);
	var int_tolerance=0;
	if( int_distance - (bullet.int_size + asteroid.int_size) <= 0 + int_tolerance ){
		bullet.hasHit=true;
		asteroid.isHit=true;
		
		//
		var int_xLength=asteroid.int_x - bullet.int_x;
		var int_yLength=asteroid.int_y - bullet.int_y;
		var int_angle;
		if(bullet.int_x > asteroid.int_x){
			int_angle=Math.atan(int_yLength/int_xLength);
			if(bullet.int_y < asteroid.int_y) int_angle=Math.atan(int_yLength/int_xLength) + degreesToRadians(360);
		}else int_angle=Math.atan(int_yLength/int_xLength) + degreesToRadians(180);
		asteroid.int_hitDirection=int_angle;
		//console.log(radiansToDegrees(bullet.int_direction), radiansToDegrees(asteroid.int_hitDirection));

		//
		//asteroid.int_speed-=0.05;

		//
		createBulletHitSprays(asteroid);

		//console.log(radiansToDegrees(bullet.int_direction));
	}
}

function checkShipCollision(asteroid){

	if(_ship.isHit) return;
	if(asteroid.int_size < _int_minAsteroidSize) return;

	var int_distance=getDistance(_ship.int_x, _ship.int_y, asteroid.int_x, asteroid.int_y);
	var int_tolerance=-7;
	if( int_distance - (_ship.int_size + asteroid.int_size) <= 0 + int_tolerance ){
		_ship.isHit=true;
		createShipExplodeSpray();
	}
}

//
function createAsteroidCracklings(asteroid){
	var int_amount=Math.floor(Math.random() * 4);
	for(var i=0; i < int_amount; i++){
		//
		var int_coneAngle=Math.floor(Math.random() * 180);
		var int_direction=radiansToDegrees(asteroid.int_hitDirection) - int_coneAngle/2 + ( Math.floor(Math.random() * int_coneAngle) );
		int_direction=degreesToRadians(int_direction);

		//
		var newAsteroid=new Asteroid({
			str_id:"asteroid" + _arr_asteroidList.length,
			int_size:Math.ceil(Math.random() * 4),
			int_startX:asteroid.int_size * Math.cos(asteroid.int_hitDirection) +  asteroid.int_x,
			int_startY:asteroid.int_size * Math.sin(asteroid.int_hitDirection) +  asteroid.int_y,
			int_direction:int_direction,
			int_speed:Math.ceil(Math.random() * 3)
		});
		newAsteroid.str_image=asteroid.str_image;
		_arr_asteroidList.push(newAsteroid);
	}
}

//
function createAsteroidBreakCracklings(asteroid){
	var int_amount=2 + Math.floor(Math.random() * 5);
	for(var i=0; i < int_amount; i++){

		//
		var int_direction=degreesToRadians( Math.floor(Math.random() * 360) );
		var int_startDistance=Math.floor( Math.random() *  asteroid.int_size ) ;

		//
		var newAsteroid=new Asteroid({
			str_id:"asteroid" + _arr_asteroidList.length,
			int_size:2 + Math.floor(Math.random() * 3),
			int_startX:int_startDistance * Math.cos(int_direction) +  asteroid.int_x,
			int_startY:int_startDistance * Math.sin(int_direction) +  asteroid.int_y,
			int_direction:int_direction,
			int_speed:5
		});
		newAsteroid.str_image=asteroid.str_image;
		_arr_asteroidList.push(newAsteroid);
	}
}

//
function createAsteroidBreakBlowup(asteroid){
	var int_amount=50 + Math.floor(Math.random() * 50);
	for(var i=0; i < int_amount; i++){

		//
		var int_direction=degreesToRadians( Math.floor(Math.random() * 360) );
		var int_startDistance=Math.floor( Math.random() *  asteroid.int_size ) ;

		//
		var newAsteroid=new Asteroid({
			str_id:"asteroid" + _arr_asteroidList.length,
			int_size:1 + Math.floor(Math.random() * asteroid.int_size/8),
			int_startX:int_startDistance * Math.cos(int_direction) +  asteroid.int_x,
			int_startY:int_startDistance * Math.sin(int_direction) +  asteroid.int_y,
			int_direction:int_direction,
			int_speed:3 + Math.ceil(Math.random() * 7)
		});
		newAsteroid.str_image=asteroid.str_image;
		_arr_asteroidList.push(newAsteroid);
	}
}

//
function createBulletHitSprays(asteroid){
	for(var i=0; i < 20; i++){
		//
		var int_baseConeAngle=Math.floor(Math.random() * 360);
		var int_coneAngle=Math.floor(Math.random() * int_baseConeAngle);
		var int_direction=radiansToDegrees(asteroid.int_hitDirection) - int_coneAngle/2 + ( Math.floor(Math.random() * int_coneAngle) );
		int_direction=degreesToRadians(int_direction);

		//
		var spray=new Spray({
			str_id:"spray" + _arr_sprayList.length,
			int_size:1,
			//int_startX:(asteroid.int_size - Math.floor( Math.random() * asteroid.int_size/2 )) * Math.cos(asteroid.int_hitDirection) +  asteroid.int_x,
			//int_startY:(asteroid.int_size - Math.floor( Math.random() * asteroid.int_size/2 )) * Math.sin(asteroid.int_hitDirection) +  asteroid.int_y,
			int_startX:asteroid.int_size * Math.cos(asteroid.int_hitDirection) +  asteroid.int_x,
			int_startY:asteroid.int_size * Math.sin(asteroid.int_hitDirection) +  asteroid.int_y,
			int_direction:int_direction,
			int_speed:2,
			int_distanceLife:Math.floor( Math.random() * asteroid.int_size * 1.5 )
		});
		
		_arr_sprayList.push(spray);
	}
}

//
function createRandomAsteroid(int_targetX, int_targetY){
	//
	var int_size=Math.floor( Math.random() * _int_maxAsteroidSize ) + _int_minAsteroidSize;
	
	//change to ship direction
	var int_targetX=int_targetX;
	var int_targetY=int_targetY;

	//
	var int_side=Math.floor(Math.random() * 4);
	var int_startX;
	var int_startY;
	var int_xLength;
	var int_yLength;
	var int_direction;
	switch(int_side){
		case 0: //top
			int_startX=(0 - int_size) + Math.floor( Math.random() * $(window).width() ) + int_size;	
			int_startY=-int_size;
			int_xLength=int_startX - int_targetX;
			int_yLength=int_startY - int_targetY;
			int_direction=Math.atan(int_yLength/int_xLength) + degreesToRadians(180);
			if( radiansToDegrees(int_direction) > 180 ) int_direction-=degreesToRadians(180);
		break;
		case 1: //left
			int_startX=-int_size;
			int_startY=(0 - int_size) + Math.floor( Math.random() * $(window).height() ) + int_size;	
			int_xLength=int_startX - int_targetX;
			int_yLength=int_startY - int_targetY;
			int_direction=Math.atan(int_yLength/int_xLength);
		break;
		case 2: //right
			int_startX=$(window).width() + int_size;
			int_startY=(0 - int_size) + Math.floor( Math.random() * $(window).height() ) + int_size;	
			int_xLength=int_startX - int_targetX;
			int_yLength=int_startY - int_targetY;
			int_direction=Math.atan(int_yLength/int_xLength) + degreesToRadians(180);
		break;
		case 3: //bottom
			int_startX=(0 - int_size) + Math.floor( Math.random() * $(window).width() ) + int_size;	
			int_startY=$(window).height() + int_size;
			int_xLength=int_startX - int_targetX;
			int_yLength=int_startY - int_targetY;
			int_direction=Math.atan(int_yLength/int_xLength);
			if( radiansToDegrees(int_direction) > 0 ) int_direction+=degreesToRadians(180);
		break;
	}	
	
	//check if asteroid position is occupied
	for(var i=0; i < _arr_asteroidList.length; i++){
		var int_distance=getDistance(int_startX, int_startY, _arr_asteroidList[i].int_x, _arr_asteroidList[i].int_y);	
		if( int_distance - (int_size + _arr_asteroidList[i].int_size) <= 0 ) return;
	}
	
	//
	var int_speed=eval( "0." + Math.ceil(Math.random() * _int_maxAsteroidSpeed) );

	//create asteroid data
	var asteroid=new Asteroid({
		str_id:"asteroid" + _arr_asteroidList.length,
		int_size:int_size,
		int_startX:int_startX,
		int_startY:int_startY,
		int_direction:int_direction,
		int_speed:int_speed
	});
	//console.log(int_size, int_startX, int_startY, radiansToDegrees(int_direction), int_speed);

	//
	_arr_asteroidList.push(asteroid);
	//console.log(_arr_asteroidList.length);
	
}

//
function createRandomStar(int_startX, int_startY){
	//create star data
	var star=new Star({
		str_id:"star" + _arr_asteroidList.length,
		int_size:1,
		int_startX:int_startX,
		int_startY:int_startY,
		int_direction:degreesToRadians(90),
		int_speed:0.1
	});

	return star;
}

//
function createShipExhaustSpray(){

	if(_ship.isHit) return;

	for(var i=0; i < 10; i++){		
		//
		var int_baseConeAngle=Math.floor(Math.random() * 40);
		var int_coneAngle=Math.floor(Math.random() * int_baseConeAngle);
		var int_direction=radiansToDegrees(_ship.int_rotation + degreesToRadians(180)) - int_coneAngle/2 + ( Math.floor(Math.random() * int_coneAngle) );
		int_direction=degreesToRadians(int_direction);

		//
		var spray=new Spray({
			str_id:"spray" + _arr_sprayList.length,
			int_size:2,
			int_startX:(_ship.int_size - 3) * Math.cos(_ship.int_rotation + degreesToRadians(180)) +  _ship.int_x,
			int_startY:(_ship.int_size - 3) * Math.sin(_ship.int_rotation + degreesToRadians(180)) +  _ship.int_y,
			int_direction:int_direction,
			int_speed:2,
			int_distanceLife:Math.floor( Math.random() * 100 )
		});
		var arr_colors=["#161616", "#0c0c0c"];
		spray.str_color=arr_colors[ Math.floor(Math.random() * arr_colors.length) ];
		_arr_sprayList.push(spray);
	}
}

function createShipExplodeSpray(){
	var int_amount=50 + Math.floor(Math.random() * 50);
	for(var i=0; i < int_amount; i++){
		//
		var int_direction=degreesToRadians( Math.floor(Math.random() * 360) );
		var int_startDistance=Math.floor( Math.random() *  _ship.int_size ) ;

		//
		var spray=new Spray({
			str_id:"spray" + _arr_sprayList.length,
			int_size:1,
			int_startX:0 * Math.cos(_ship.int_rotation + degreesToRadians(180)) +  _ship.int_x,
			int_startY:0 * Math.sin(_ship.int_rotation + degreesToRadians(180)) +  _ship.int_y,
			int_direction:int_direction,
			int_speed:0.5 + Math.floor(Math.random() * 3),
			int_distanceLife:Math.floor( Math.random() * 200 )
		});
		var arr_colors=["#ffffff", "#cccccc", "#999999", "#333333", "#252525", "#161616", "#0c0c0c"];
		//var arr_colors=["#ffffff"];
		spray.str_color=arr_colors[ Math.floor(Math.random() * arr_colors.length) ];
		_arr_sprayList.push(spray);
	}
	
}


function degreesToRadians(int_degrees){
	//
	return( int_degrees * (Math.PI/180) );
}

//
function renderAll(){

	//clear canvas
	_space.clearCanvas();

	//check collisions
	for(var i=0; i < _arr_asteroidList.length; i++){
		/*
		for(var j=i + 1; j < _arr_asteroidList.length; j++){
			checkAsteroidCollision(_arr_asteroidList[i], _arr_asteroidList[j]);
		}*/
		for(var k=0; k < _arr_bulletList.length; k++){
			checkBulletCollision(_arr_bulletList[k], _arr_asteroidList[i]);
		}
		checkShipCollision(_arr_asteroidList[i]);
	}

	//check for hits
	for(var i=0; i < _arr_asteroidList.length;){
		var asteroid=_arr_asteroidList[i];
		if(asteroid.isHit){
			//
			createAsteroidCracklings(asteroid);

			//
			asteroid.int_hitPoints--;

			if(asteroid.int_hitPoints <= 0){
				//
				breakAsteroid(asteroid);

				//remove from list
				_arr_asteroidList.splice(i, 1);
			}else{
				asteroid.isHit=false;	
				i++;
			}			
		}else{
			i++;
		}
	}

	
	//render asteroids
	for(var i=0; i < _arr_asteroidList.length; i++){
		renderAsteroidStep(_arr_asteroidList[i]);
	}
	

	//render bullets
	for(var i=0; i < _arr_bulletList.length; i++){
		renderBulletStep(_arr_bulletList[i]);
	}

	//render ship
	renderShipStep();

	//render spray
	for(var i=0; i < _arr_sprayList.length; i++){
		renderSprayStep(_arr_sprayList[i]);
	}
	
	
	
	//remove asteroids outside viewport
	for(var i=0; i < _arr_asteroidList.length;){
		//
		var asteroid=_arr_asteroidList[i];
		if(
				(asteroid.int_distance > 0) &&
				((asteroid.int_x > _space.canvasElement.int_canvasWidth + asteroid.int_size) ||
				(asteroid.int_x < 0 - asteroid.int_size) ||
				(asteroid.int_y > _space.canvasElement.int_canvasHeight + asteroid.int_size) ||
				(asteroid.int_y < 0 - asteroid.int_size))
			){
			
			//
			_arr_asteroidList.splice(i, 1);
		}else{
			i++;
		}
	}

	
	//remove bullets outside viewport
	for(var i=0; i < _arr_bulletList.length;){
		//
		var bullet=_arr_bulletList[i];

		//
		if(bullet.hasHit){
			_arr_bulletList.splice(i, 1);
			continue;
		}

		//
		if(
				(bullet.int_distance > 0) &&
				((bullet.int_x > _space.canvasElement.int_canvasWidth + bullet.int_size) ||
				(bullet.int_x < 0 - bullet.int_size) ||
				(bullet.int_y > _space.canvasElement.int_canvasHeight + bullet.int_size) ||
				(bullet.int_y < 0 - bullet.int_size))
			){
			_arr_bulletList.splice(i, 1);
		}else{
			i++;
		}
	}

	
	//remove sprays outside viewport
	for(var i=0; i < _arr_sprayList.length;){
		//
		var spray=_arr_sprayList[i];

		//
		if(spray.int_distanceLife != undefined){
			if(spray.int_distance > spray.int_distanceLife){
				_arr_sprayList.splice(i, 1);
				continue;
			}
		}

		//
		if(
				(spray.int_distance > 0) &&
				((spray.int_x > _space.canvasElement.int_canvasWidth + spray.int_size) ||
				(spray.int_x < 0 - spray.int_size) ||
				(spray.int_y > _space.canvasElement.int_canvasHeight + spray.int_size) ||
				(spray.int_y < 0 - spray.int_size))
			){
			_arr_sprayList.splice(i, 1);
			continue;
		}else{
			i++;
		}
	}


	//
	//console.log("_arr_asteroidList.length=",_arr_asteroidList.length);
	//console.log("_arr_bulletList.length=",_arr_bulletList.length);
	//console.log("_arr_sprayList.length=",_arr_sprayList.length);
}

//
function renderAsteroidStep(asteroid){
	//
	asteroid.int_distance+=asteroid.int_speed;
	asteroid.int_x=asteroid.int_distance * Math.cos( asteroid.int_direction ) + asteroid.int_startX;
	asteroid.int_y=asteroid.int_distance * Math.sin( asteroid.int_direction ) + asteroid.int_startY;

	//
	if(asteroid.str_imageRotationDirection == 0){
		asteroid.int_imageRotation+=0.001;
	}else{
		asteroid.int_imageRotation-=0.001;
	}

	//
	asteroid.render(_space.context);
}

//
function renderBulletStep(bullet){
	bullet.int_distance+=bullet.int_speed;
	bullet.int_x=bullet.int_distance * Math.cos( bullet.int_direction ) + bullet.int_startX;
	bullet.int_y=bullet.int_distance * Math.sin( bullet.int_direction ) + bullet.int_startY;
	bullet.render(_space.context);
}

//
function renderShipStep(){
	//
	if(_ship.isHit) return;

	//
	switch(_str_keyState){
		case "down":
			if(_int_shipAcceleration < _int_shipMaxAcceleration){
				_int_shipAcceleration=_int_shipAccelerationMultiplier * _int_shipAccelerationMultiplier;
				_int_shipAccelerationMultiplier+=_int_shipAccelerationIncrement;
			}
			_ship.int_x=_int_shipAcceleration * Math.cos(_ship.int_rotation) + _ship.int_x;
			_ship.int_y=_int_shipAcceleration * Math.sin(_ship.int_rotation) + _ship.int_y;
		break;
		case "up":
			if(_int_shipAccelerationMultiplier > 0){
				_int_shipAccelerationMultiplier-=_int_shipAccelerationIncrement;
				_int_shipAcceleration=_int_shipAccelerationMultiplier * _int_shipAccelerationMultiplier;
				_ship.int_x=_int_shipAcceleration * Math.cos(_ship.int_rotation) + _ship.int_x;
				_ship.int_y=_int_shipAcceleration * Math.sin(_ship.int_rotation) + _ship.int_y;
			}else{
				_str_keyState="";
			}
		break;
	}

	//	
	_ship.render(_space.context);
}



function renderSprayStep(spray){
	spray.int_distance+=spray.int_speed;
	spray.int_x=spray.int_distance * Math.cos( spray.int_direction ) + spray.int_startX;
	spray.int_y=spray.int_distance * Math.sin( spray.int_direction ) + spray.int_startY;
	spray.render(_space.context);
}

function getDistance(int_fromX, int_fromY, int_toX, int_toY){
	var int_a=int_fromX - int_toX;
	var int_b=int_fromY - int_toY;
	return Math.sqrt( Math.pow(int_a, 2) + Math.pow(int_b, 2) );
}

function radiansToDegrees(int_radians){
	return( int_radians * (180/Math.PI) );
}

function shoot(){
	var bullet=new Bullet({
		str_id:"bullet" + _arr_bulletList.length,
		int_size:1,
		int_startX:_ship.int_size * Math.cos(_ship.int_rotation) + _ship.int_x,
		int_startY:_ship.int_size * Math.sin(_ship.int_rotation) + _ship.int_y,
		int_direction:_ship.int_rotation,
		int_speed:10
	});
	//console.log(int_size, int_startX, int_startY, radiansToDegrees(int_direction), int_speed);

	//
	_arr_bulletList.push(bullet);
}