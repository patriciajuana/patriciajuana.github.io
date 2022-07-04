var Spray=function(obj_params){
	//
	this.str_id=obj_params.str_id;
	this.int_size=obj_params.int_size;
	this.int_startX=obj_params.int_startX;
	this.int_startY=obj_params.int_startY;
	this.int_speed=obj_params.int_speed;
	this.int_direction=obj_params.int_direction;
	this.int_distanceLife=obj_params.int_distanceLife;

	//
	this.int_x=this.int_startX;
	this.int_y=this.int_startY;
	this.int_distance=0;
	this.int_hitDirection=0;

	//
	this.arr_colors=["#999999", "#333333", "#252525", "#161616", "#0c0c0c"];
	this.str_color=this.arr_colors[ Math.floor(Math.random() * this.arr_colors.length) ];
}

$.extend(Spray.prototype, {
	render:function(context){
			context.beginPath();
			context.arc( this.int_x, this.int_y, this.int_size, this.degreesToRadians(0), this.degreesToRadians(360) );
			context.fillStyle=this.str_color;
			context.fill();
	},
	degreesToRadians:function(int_degrees){
		return( int_degrees * (Math.PI/180) );
	},
	radiansToDegrees:function(int_radians){
		return( int_radians * (180/Math.PI) );
	}

});