var Star=function(obj_params){
	//
	this.str_id=obj_params.str_id;
	this.int_size=1;
	this.int_startX=obj_params.int_startX;
	this.int_startY=obj_params.int_startY;
	this.int_direction=obj_params.int_direction;

	//
	this.int_x=this.int_startX;
	this.int_y=this.int_startY;
	this.int_distance=0;


	//
	this.int_starTypeIndex=Math.floor( Math.random() * 3 );

	//
	this.arr_speeds=[0.1, 0.05, 0.025];
	this.int_speed=this.arr_speeds[this.int_starTypeIndex];

	//
	this.arr_colors=["#333333", "#252525", "#161616"];
	this.str_color=this.arr_colors[this.int_starTypeIndex];
}

$.extend(Star.prototype, {
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