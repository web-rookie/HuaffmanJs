function Numdiv(cxt,data,cols,level,tag){
	this.cxt = cxt;
	this.data = data;
	this.tag = tag;
	this.x = Huaffman.mapList[level][cols].x;
	this.y = Huaffman.mapList[level][cols].y;
	this.level = level;
	this.cols = cols;
	this.nextPosition = null;
	this.isStart = false;
	this.parentId = null;
}
Numdiv.prototype = {
	draw : function(){
		Canvas.fillArc(this.cxt,this.x,this.y,20,"pink");
		if(this.tag){
			Canvas.drawText(this.cxt,this.data,this.x-5,this.y-5,'#000');
			Canvas.drawText(this.cxt,this.tag,this.x-5,this.y+10,'#000');
		}else{
			Canvas.drawText(this.cxt,this.data,this.x-5,this.y,'#000');
		}
	},
	update : function(){
		if(this.nextPosition){
			this.nextCols = this.nextPosition.cols;
			this.nextLevel = this.nextPosition.level;
			this.nextX = Huaffman.mapList[this.nextPosition.level][this.nextPosition.cols].x;
			this.nextY = Huaffman.mapList[this.nextPosition.level][this.nextPosition.cols].y;
			this.isStart = true;
			var speedX = (this.nextX-this.x)/10;
			var speedY = (this.nextY-this.y)/10;
			var endX = false;
			var endY = false;
			if(Math.abs(speedX)<1 && Math.abs(this.nextX-this.x)<3){
				this.x = this.nextX;
				endX = true;
			}else{
				this.x += speedX;
			}
			if(Math.abs(speedY)<1 && Math.abs(this.nextY-this.y)<3){
				this.y = this.nextY;
				endY = true;
			}else{
				this.y += speedY;
			}
			if(endX && endY){
				this.isStart = false;
				this.cols = this.nextCols;
				this.level = this.nextLevel;
			}
		}
	}
}
function updateNumdiv(){
	var numdiv;
	for(var i=0;i<Huaffman.numdivList.length;i++){
		numdiv = Huaffman.numdivList[i];
		if(!numdiv)continue;
		numdiv.update();
	}
}
function drawNumdiv(){
	var numdiv;
	for(var i=0;i<Huaffman.numdivList.length;i++){
		numdiv = Huaffman.numdivList[i];
		if(!numdiv)continue;
		numdiv.draw();
	}
}