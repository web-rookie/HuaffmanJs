function ParentBox(id,headNode,children,lineList,changeCols,changeLevel){
	this.id = id;
	this.headNode = headNode;
	this.children = children;
	this.lineList = lineList;
	this.changeCols = changeCols;
	this.changeLevel = changeLevel;
	this.sortChildren();

}
ParentBox.prototype = {
	draw : function(){
		this.headNode.nextPosition = {cols:this.headNode.cols+this.changeCols,level:this.headNode.level+this.changeLevel};
		for(var i=0;i<this.children.length;i++){
			this.children[i].nextPosition = {cols:this.children[i].cols+this.changeCols,level:this.children[i].level+this.changeLevel};
		}
		for(var i=0;i<this.lineList.length;i++){
			this.lineList[i].nextPosition = {
				cols0:this.lineList[i].cols0+this.changeCols,
				cols1:this.lineList[i].cols1+this.changeCols,
				level0:this.lineList[i].level0+this.changeLevel,
				level1:this.lineList[i].level1+this.changeLevel
			}
		}
	},
	sortChildren : function(){
		for(var i=0;i<this.children.length;i++){
			this.children.sort(function(a,b){return a.cols-b.cols;});
		}
		this.leftCols = this.children[0].cols;
		this.rightCols = this.children[this.children.length-1].cols;
		this.widthCols = this.rightCols - this.leftCols; 
	}
}
function updateParentBox(){
	var parentBox;
	for(var i=0;i<Huaffman.donenumdivList.length;i++){
		parentBox = Huaffman.donenumdivList[i];
		parentBox.draw();
	}
}