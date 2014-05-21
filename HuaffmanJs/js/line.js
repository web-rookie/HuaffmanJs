function Line(cxt,cols0,level0,cols1,level1,color,width){
	this.cxt = cxt;
	this.cols0 = cols0;
	this.cols1 = cols1;
	this.level0 = level0;
	this.level1 = level1;
	this.x0 = Huaffman.mapList[level0][cols0].x;
	this.y0 = Huaffman.mapList[level0][cols0].y - 20;
	this.x1 = Huaffman.mapList[level1][cols1].x;
	this.y1 = Huaffman.mapList[level1][cols1].y + 20;
	this.nextPosition = null;
	this.color = color;
	this.width = width;
}
Line.prototype = {
	draw : function(){
		Canvas.drawLine(this.cxt,this.x0,this.y0,this.x1,this.y1,this.color,this.width);
		if(this.x0 < this.x1){
			Canvas.drawText(this.cxt,0,(this.x0+this.x1)/2-10,(this.y0+this.y1)/2+5,'#000');
		}else{
			Canvas.drawText(this.cxt,1,(this.x0+this.x1)/2+10,(this.y0+this.y1)/2+5,'#000');
		}
	},
	update : function(){
		if(this.nextPosition){
			this.nextCols0 = this.nextPosition.cols0;
			this.nextLevel0 = this.nextPosition.level0;
			this.nextCols1 = this.nextPosition.cols1;
			this.nextLevel1 = this.nextPosition.level1;
			this.nextX0 = Huaffman.mapList[this.nextPosition.level0][this.nextPosition.cols0].x;
			this.nextY0 = Huaffman.mapList[this.nextPosition.level0][this.nextPosition.cols0].y - 20;
			this.nextX1 = Huaffman.mapList[this.nextPosition.level1][this.nextPosition.cols1].x;
			this.nextY1 = Huaffman.mapList[this.nextPosition.level1][this.nextPosition.cols1].y + 20;
			this.isStart = true;
			var speedX = (this.nextX0-this.x0)/10;
			var speedY = (this.nextY0-this.y0)/10;
			var endX = false;
			var endY = false;
			if(Math.abs(speedX)<1 && Math.abs(this.nextX0-this.x0)<3){
				this.x0 = this.nextX0;
				this.x1 = this.nextX1;
				endX = true;
			}else{
				this.x0 += speedX;
				this.x1 += speedX;
			}
			if(Math.abs(speedY)<1 && Math.abs(this.nextY0-this.y0)<3){
				this.y0 = this.nextY0;
				this.y1 = this.nextY1;
				endY = true;
			}else{
				this.y0 += speedY;
				this.y1 += speedY;
			}
			if(endX && endY){
				this.isStart = false;
				this.cols0 = this.nextCols0;
				this.cols1 = this.nextCols1;
				this.level0 = this.nextLevel0;
				this.level1 = this.nextLevel1;
			}
		}
	}
}
function updateLine(){
	var line;
	for(var i=0;i<Huaffman.lineList.length;i++){
		line = Huaffman.lineList[i];
		if(!line)continue;
		line.update();
	}
}
function drawLine(){
	var line;
	for(var i=0;i<Huaffman.lineList.length;i++){
		line = Huaffman.lineList[i];
		if(!line)continue;
		line.draw();
	}
}