var CanvasElement=function(str_divContainerID, str_id, int_canvasWidth, int_canvasHeight){
	//
	this.str_divContainerID=str_divContainerID;
	this.str_id=str_id;
	this.int_canvasWidth=int_canvasWidth;
	this.int_canvasHeight=int_canvasHeight;

	//
	this.createCanvas();
}

$.extend(CanvasElement.prototype, {
	createCanvas:function(){
		//
		$("#" + this.str_divContainerID).append("<canvas id='" + this.str_id + "'></canvas>");

		//
		$("#" + this.str_id).css("position", "absolute");
		$("#" + this.str_id).get(0).width=this.int_canvasWidth;
		$("#" + this.str_id).get(0).height=this.int_canvasHeight;
	},
	debug:function(){
		$("#" + this.str_id).css("border", "1px solid #000000");
	}
});