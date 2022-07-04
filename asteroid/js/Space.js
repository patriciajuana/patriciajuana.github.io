var Space=function(){
	//
	this.canvasElement=null;
	this.jqElem=null;
	this.context=null;
}

$.extend(Space.prototype, {
	createCanvas:function(str_divContainerID, str_id, int_canvasWidth, int_canvasHeight){
		//
		this.canvasElement=new CanvasElement(str_divContainerID, str_id, int_canvasWidth, int_canvasHeight);

		//
		this.jqElem=$("#" + this.canvasElement.str_id);
		//this.jqElem.css("pointer-events", "none");

		//
		this.context=$("#" + this.canvasElement.str_id).get(0).getContext("2d");
	},
	clearCanvas:function(){
		this.context.clearRect(0, 0, this.canvasElement.int_canvasWidth, this.canvasElement.int_canvasHeight);
	}
});