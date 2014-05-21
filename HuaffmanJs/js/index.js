var Huaffman = {
	gloable : 7000,
	data : [],//输入的权值存放数组
	numdivList : [],//把生成的圆存放到该数组
	cxt : document.getElementById("showCanvas").getContext("2d"),
	cxt2 : document.getElementById("mapCanvas").getContext("2d"),
	timer : 0,
	oldnumdivList : [],//右边圆的存放位置
	nextnumdivList : [],//
	donenumdivList : [],//用来存放parentBox实例
	lineList : [],
	mapList : [],
	allCanvas : [],//
	newData : null,//两权值相加后的数值
	level : 0,//
	init : function(){
		this.initMap();
	},
	initMap : function(){	//生成地图
		for(var i=0;i<MapData.length;i++){
			var mapX = [];
			for(var j=0;j<26;j++){
				var newMap = new Map(this.cxt2,25+j*40,30+i*40,20,"rgba(0,0,0,0)");
				mapX.push(newMap);
			}
			this.mapList.push(mapX);
		}
		drawMap();
	},
	initData : function(){//取到输入权值
		var me = this;
		me.data = $("#inputValue").val().split(",").sort(function(a,b){return a-b});
		//console.log(me.data.length)
		
		me.initDiv();
		
	},
	initDiv : function(){
		this.clear();
		this.numdivList = [];
		this.lineList = [];
		this.oldnumdivList = [];
		this.donenumdivList = [];
		for(var i=0;i<this.data.length;i++){
			var numDiv = new Numdiv(this.cxt,this.data[i],25,i,String.fromCharCode(i+65));//初始化一个圆
			this.numdivList.push(numDiv);
			this.oldnumdivList.push(numDiv);
		}
		//this.oldnumdivList.sort(function(a,b){return parseInt(a.data)-parseInt(b.data);});
		drawNumdiv();
	},
	addData : function(data1,data2){
		this.oldnumdivList.shift();
		this.oldnumdivList.shift();
		this.newData = parseInt(data1.data) + parseInt(data2.data);
		if(this.data.length == this.oldnumdivList.length+2){
			data1.nextPosition = {cols:5,level:15};
			data2.nextPosition = {cols:7,level:15};
			this.nowList = new ParentBox(new Date().getTime(),null,[data1,data2],[],0,0);
			this.donenumdivList.push(this.nowList);//把生成的树放到这个数组
		}else{
			this.donenumdivList.sort(function(a,b){return a.headNode.cols-b.headNode.cols;});//生成的树按位置排序
			if(!data1.tag && data2.tag){
				for(var i=0;i<this.donenumdivList.length;i++){
					if(this.donenumdivList[i].id == data1.parentId){
						this.nowList = this.donenumdivList[i];//确认了生成的父节点位置的树，并把它赋给nowList
					}else{
						this.donenumdivList[i].changeCols = 0;
					}
				}
				data1.nextPosition = {cols:this.nowList.headNode.cols,level:this.nowList.headNode.level};
				data2.nextPosition = {cols:this.nowList.children[this.nowList.children.length-1].cols+1,level:this.nowList.headNode.level};
				this.nowList.children.push(this.nowList.headNode);
				this.nowList.children.push(data2);
				this.nowList.sortChildren();
				setTimeout(function(){
					Huaffman.numdivList.remove(data1);
					//Huaffman.nowList.changeCols = -1;//
					updateParentBox();//重新
				},Huaffman.gloable*3/14);
			}else if(data1.tag && !data2.tag){
				for(var i=0;i<this.donenumdivList.length;i++){
					if(this.donenumdivList[i].id == data2.parentId){
						this.nowList = this.donenumdivList[i];
					}else{
						this.donenumdivList[i].changeCols = 0;
					}
				}
				data2.nextPosition = {cols:this.nowList.headNode.cols,level:this.nowList.headNode.level};
				data1.nextPosition = {cols:this.nowList.children[0].cols-1,level:this.nowList.headNode.level};
				Huaffman.nowList.children.push(Huaffman.nowList.headNode);
				Huaffman.nowList.children.push(data1);
				Huaffman.nowList.sortChildren();
				setTimeout(function(){
					Huaffman.numdivList.remove(data2);
					//Huaffman.nowList.changeCols = 1;
					updateParentBox();
				},Huaffman.gloable*3/14);
			}else if(data1.tag && data2.tag){
				var arr =[];
				var newData = parseInt(data1.data) + parseInt(data2.data);
				for(var i=0;i<this.donenumdivList.length;i++){
					if(parseInt(this.donenumdivList[i].headNode.data) <= newData){
						arr.push(this.donenumdivList[i]);
					}else{
						this.donenumdivList[i].changeCols = 0;
					}
				}
				if(arr.length){
					arr[arr.length-1].sortChildren();
					this.nowList = new ParentBox(new Date().getTime(),null,[data1,data2],[],0,0);
					this.donenumdivList.push(this.nowList);
					data1.nextPosition = {cols:arr[arr.length-1].children[arr[arr.length-1].children.length-1].cols+1,level:arr[arr.length-1].headNode.level+2};
					data2.nextPosition = {cols:arr[arr.length-1].children[arr[arr.length-1].children.length-1].cols+3,level:arr[arr.length-1].headNode.level+2};
					setTimeout(function(){
						Huaffman.nowList.changeCols = -3;
						for(var i=0;i<arr.length;i++){
							arr[i].changeCols = -3;
							updateParentBox();
						}
					},Huaffman.gloable*3/14);
				}else{
					arr[0].sortChildren();
					Huaffman.nowList = new ParentBox(new Date().getTime(),null,[data1,data2],[],0,0);
					Huaffman.donenumdivList.push(Huaffman.nowList);
					data1.nextPosition = {cols:arr[0].children[0].cols-1,level:arr[0].headNode.level+2};
					data2.nextPosition = {cols:arr[0].children[0].cols-3,level:arr[0].headNode.level+2};
					setTimeout(function(){
						for(var i=0;i<this.donenumdivList.length;i++){
							Huaffman.donenumdivList[i].changeCols = 3;
							updateParentBox();
						}	
					},Huaffman.gloable*3/14);
				}
			}else if(!data1.tag && !data2.tag){
				var obj1 = {},obj2 = {};
				for(var i=0;i<this.donenumdivList.length;i++){
					this.donenumdivList[i].changeCols = 0;
					if(this.donenumdivList[i].id == data1.parentId){
						obj1 = this.donenumdivList[i];
					}else if(this.donenumdivList[i].id == data2.parentId){
						obj2 = this.donenumdivList[i];
					}
				}
				var childrenArr = obj1.children.concat(obj2.children);
				var lineArr = obj1.lineList.concat(obj2.lineList);
				childrenArr.push(obj1.headNode);
				childrenArr.push(obj2.headNode);
				this.nowList = new ParentBox(new Date().getTime(),null,childrenArr,lineArr,0,0);
				this.donenumdivList.push(this.nowList);
				this.donenumdivList.remove(obj1);
				this.donenumdivList.remove(obj2);
				data2.nextPosition = {cols:obj2.headNode.cols,level:obj2.headNode.level};
				data1.nextPosition = {cols:obj1.headNode.cols,level:obj1.headNode.level};
				Huaffman.nowList.sortChildren();
				setTimeout(function(){
					Huaffman.numdivList.remove(data1);
					Huaffman.numdivList.remove(data2);
				},Huaffman.gloable*3/14);
			}
		}
		setTimeout(function(){Huaffman.addDiv(data1,data2);},50);
		setTimeout(function(){
			var minCols = 9999;
			for(var i=0;i<Huaffman.donenumdivList.length;i++){
				Huaffman.donenumdivList[i].changeCols = 0;
				Huaffman.donenumdivList[i].changeLevel = 0;
				Huaffman.donenumdivList[i].sortChildren();
			}
			for(var i=0;i<Huaffman.donenumdivList.length;i++){
				if(Huaffman.donenumdivList[i].children[0].cols<minCols){
					minCols = Huaffman.donenumdivList[i].children[0].cols;
				}
			}

			var arrCols = Huaffman.donenumdivList.sort(function(a,b){return a.headNode.cols-b.headNode.cols;});
			var arrLevel = Huaffman.donenumdivList.sort(function(a,b){return a.headNode.level-b.headNode.level;});
			var arrData = Huaffman.donenumdivList.sort(function(a,b){
				if(parseInt(a.headNode.data) == parseInt(b.headNode.data)){
					return 1;
				}else{
					return parseInt(a.headNode.data)-parseInt(b.headNode.data);
				}
			});
			var highLevel = arrLevel[arrLevel.length-1].headNode.level;
			if(highLevel <= 2){highLevel = 2};
			var leftCols = minCols;
			if(leftCols <= 2){leftCols = 2}else if(leftCols >=23){leftCols = 23};
			for(var i=0;i<Huaffman.donenumdivList.length;i++){
				if(i == 0){
					Huaffman.donenumdivList[0].changeCols = leftCols - Huaffman.donenumdivList[0].children[0].cols;
					Huaffman.donenumdivList[0].changeLevel = highLevel - Huaffman.donenumdivList[0].headNode.level;
				}else{
					var widthCols = 0;
					for(var j=0;j<i;j++){
						widthCols += parseInt(Huaffman.donenumdivList[j].children[Huaffman.donenumdivList[j].children.length-1].cols- Huaffman.donenumdivList[j].children[0].cols + 1);
					}
					Huaffman.donenumdivList[i].changeCols = leftCols + widthCols - Huaffman.donenumdivList[i].children[0].cols;
					Huaffman.donenumdivList[i].changeLevel = highLevel - Huaffman.donenumdivList[i].headNode.level;
				}
			}
			updateParentBox();
		},Huaffman.gloable*3/14);
	},
	addDiv : function(data1,data2){
		clearTimeout(timer);
		if(!data1.isStart && !data2.isStart){
			this.newnumDiv = new Numdiv(this.cxt,this.newData,parseInt((data1.cols+data2.cols)/2),data1.level-2,null);
			this.newLineLeft = new Line(this.cxt,data1.cols,data1.level,this.newnumDiv.cols,this.newnumDiv.level,"#ccc",3);
			this.newLineRight = new Line(this.cxt,data2.cols,data2.level,this.newnumDiv.cols,this.newnumDiv.level,"#ccc",3);
			this.lineList.push(this.newLineLeft);
			this.lineList.push(this.newLineRight);
			this.numdivList.push(this.newnumDiv);
			this.newnumDiv.parentId = this.nowList.id;
			this.nowList.lineList.push(this.newLineLeft);
			this.nowList.lineList.push(this.newLineRight);
			this.nowList.headNode = this.newnumDiv;
			setTimeout(function(){Huaffman.returnData();},Huaffman.gloable*3/14);
		}else{
			var timer = setTimeout(function(){Huaffman.addDiv(data1,data2);},Huaffman.gloable/140);
		}
	},
	returnData : function(){
		this.backnumDiv = new Numdiv(this.cxt,this.newData,this.newnumDiv.cols,this.newnumDiv.level,null);
		this.backnumDiv.parentId = this.nowList.id;
		this.numdivList.push(this.backnumDiv);
		if(parseInt(this.oldnumdivList[this.oldnumdivList.length-1].data)<=parseInt(this.backnumDiv.data)){
			for(var i=0;i<this.oldnumdivList.length;i++){
				var thisLevel = this.oldnumdivList[i].level-1;
				this.oldnumdivList[i].nextPosition = {cols:this.oldnumdivList[i].cols,level:thisLevel};
			}
			this.backnumDiv.nextPosition = {cols:25,level:this.oldnumdivList[this.oldnumdivList.length-1].level};
			this.oldnumdivList.push(this.backnumDiv);
			//this.oldnumdivList.sort(function(a,b){return a.data-b.data;});
			setTimeout(function(){Huaffman.reSortData();},Huaffman.gloable*3/14);
		}else{
			for(var i=0;i<this.oldnumdivList.length;i++){
				if(parseInt(this.oldnumdivList[i].data)<=parseInt(this.backnumDiv.data)){
					var thisLevel = this.oldnumdivList[i].level-1;
					this.oldnumdivList[i].nextPosition = {cols:this.oldnumdivList[i].cols,level:thisLevel};
				}else{
					var thisLevel = this.oldnumdivList[i].level-1;
					this.backnumDiv.nextPosition = {cols:25,level:thisLevel};
					this.oldnumdivList.splice(i,0,this.backnumDiv);
					//this.oldnumdivList.sort(function(a,b){return a.data-b.data;});
					setTimeout(function(){Huaffman.reSortData();},Huaffman.gloable*3/14);
					return;
				}
			}
		}
	},
	reSortData : function(){
		for(var i=0;i<this.oldnumdivList.length;i++){
			var thisNumdiv = this.oldnumdivList[i];
			var thisCols = thisNumdiv.cols;
			var thisLevel = thisNumdiv.level;
			thisNumdiv.nextPosition = {cols:thisCols,level:thisLevel-1};
		}
	},
	start : function(){
		Huaffman.addData(Huaffman.oldnumdivList[0],Huaffman.oldnumdivList[1]);
		this.timer2 = setInterval(function(){Huaffman.addData(Huaffman.oldnumdivList[0],Huaffman.oldnumdivList[1]);},Huaffman.gloable);
		
		this.timer = setInterval(Huaffman.loop,Huaffman.gloable/350);
	},
	clear : function(){
		Canvas.clear(Huaffman.cxt,1050,660);
	},
	stop : function(){
		clearInterval(this.timer);
		clearInterval(this.timer2);
	},
	loop : function(){
			Huaffman.clear();
			drawNumdiv();
			updateNumdiv();
			drawLine();
			updateLine();
		if(Huaffman.oldnumdivList.length == 0){
			
			setTimeout(function(){
				Huaffman.stop();
			},1500);
		}
	}
}

Huaffman.init();
//数组扩展
//扩展删除
Array.prototype.remove = function(obj){
	
	for(var i=0,l=this.length;i<l;i++){
		
		if(obj == this[i]){
			
			this.splice(i,1);
			break;
		}
	}
}