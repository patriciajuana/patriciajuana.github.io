///<reference path="BomberGame.ts"/>
module Main{
	//
	var _mainCanvas:HTMLCanvasElement=<HTMLCanvasElement> document.getElementById("mainCanvas");
	_mainCanvas.width=window.innerWidth;
	_mainCanvas.height=window.innerHeight;
	var _context:CanvasRenderingContext2D=_mainCanvas.getContext("2d");

	//
	var _img_spritesheet=<HTMLImageElement> document.getElementById("spritesheet");

	//
	var bomberGame:BomberGame=new BomberGame(_context, _img_spritesheet);	
}






