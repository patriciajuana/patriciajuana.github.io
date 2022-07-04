var Asteroid=function(obj_params){
	//
	this.str_id=obj_params.str_id;
	this.int_size=obj_params.int_size;
	this.int_startX=obj_params.int_startX;
	this.int_startY=obj_params.int_startY;
	this.int_speed=obj_params.int_speed;
	this.int_direction=obj_params.int_direction;

	//
	this.int_x=this.int_startX;
	this.int_y=this.int_startY;
	this.int_hitPoints=5;
	this.isWhole=true;
	this.int_distance=0;
	this.isHit=false;
	this.int_hitDirection=0;
	this.int_imageRotation=degreesToRadians( Math.floor(Math.random() * 360) );
	this.str_imageRotationDirection=Math.floor( Math.random() * 2 );

	//
	this.str_image="#asteroidImage" + Math.ceil( Math.random() * 4 );
}

$.extend(Asteroid.prototype, {
	render:function(context){
		/*
		context.beginPath();
		context.arc( this.int_x, this.int_y, this.int_size, this.degreesToRadians(0), this.degreesToRadians(360) );
		context.fillStyle="#ffffff";
		context.fill();
		context.strokeStyle="#ffffff";
		context.stroke();*/

		context.save();
		context.translate( this.int_x, this.int_y );
		context.rotate(this.int_imageRotation);
		//context.drawImage($(this.str_image).get(0), 0 - this.int_size/2, 0 - this.int_size/2, this.int_size, this.int_size );
		context.drawImage($(this.str_image).get(0), 0 - this.int_size, 0 - this.int_size, this.int_size * 2, this.int_size * 2);
		//context.drawImage($("#asteroidImage1").get(0), this.int_x - this.int_size, this.int_y - this.int_size, this.int_size * 2, this.int_size * 2);
		context.restore();
	},
	degreesToRadians:function(int_degrees){
		return( int_degrees * (Math.PI/180) );
	},
	radiansToDegrees:function(int_radians){
		return( int_radians * (180/Math.PI) );
	}

});