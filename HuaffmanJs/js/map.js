 //网格绘制类
 function Map(cxt,x,y,radius,color){
 	this.cxt = cxt;
 	this.x = x;
 	this.y = y;
 	this.radius = radius;
 	this.color = color;
 }
 Map.prototype = {
 	draw : function(){
 		Canvas.fillArc(this.cxt,this.x,this.y,this.radius,this.color);
 	}
 }
function drawMap(){
	var newMap;
	for(var i=0;i<Huaffman.mapList.length;i++){
		for(var j=0;j<Huaffman.mapList[i].length;j++){
			var newMap = Huaffman.mapList[i][j];
			newMap.draw();
		}
	}
}
//Map.draw(document.getElementById("mapCanvas").getContext("2d"),MapData);