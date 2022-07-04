var Bullet=function(obj_params){
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
	this.int_distance=0;
	this.hasHit=false;
}

$.extend(Bullet.prototype, {
	render:function(context){
		//
		if(this.hasHit) return;

		//
		context.beginPath();
		context.arc( this.int_x, this.int_y, this.int_size, this.degreesToRadians(0), this.degreesToRadians(360) );
		context.fillStyle="#ffffff";
		context.fill();
	},
	degreesToRadians:function(int_degrees){
		return( int_degrees * (Math.PI/180) );
	},
	radiansToDegrees:function(int_radians){
		return( int_radians * (180/Math.PI) );
	}
});