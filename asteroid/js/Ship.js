var Ship=function(obj_params){
	//
	this.int_size=obj_params.int_size;

	//
	this.int_x=0;
	this.int_y=0;
	this.int_rotation=0;
	this.isHit=false;
}

$.extend(Ship.prototype, {
	render:function(context){		
		/*
		context.beginPath();

		var int_radians180=degreesToRadians(180);
		var int_triangleAngle=degreesToRadians(40);

		var int_aX=this.int_size * Math.cos(this.int_rotation) + this.int_x;
		var int_aY=this.int_size * Math.sin(this.int_rotation) + this.int_y;
		context.moveTo(int_aX, int_aY);

		var int_bX=this.int_size * Math.cos(this.int_rotation + int_radians180 - int_triangleAngle) + this.int_x;
		var int_bY=this.int_size * Math.sin(this.int_rotation + int_radians180 - int_triangleAngle) + this.int_y;
		context.lineTo(int_bX, int_bY);

		var int_cX=this.int_size * Math.cos(this.int_rotation + int_radians180 + int_triangleAngle) + this.int_x;
		var int_cY=this.int_size * Math.sin(this.int_rotation + int_radians180 + int_triangleAngle) + this.int_y;
		context.lineTo(int_cX, int_cY);
		context.lineTo(int_aX, int_aY);

		context.fillStyle="#ffffff";
		context.fill();*/

		context.save();
		context.translate( this.int_x, this.int_y);
		context.rotate(this.int_rotation);
		context.drawImage($("#ship").get(0), 0 - 26/2, 0 - 17/2, 26, 17);
		context.restore();
	},
	degreesToRadians:function(int_degrees){
		return( int_degrees * (Math.PI/180) );
	},
	radiansToDegrees:function(int_radians){
		return( int_radians * (180/Math.PI) );
	}
});