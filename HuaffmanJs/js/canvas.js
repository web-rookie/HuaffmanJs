//画布类
var Canvas = {
     //清除画布
    clear : function(cxt,x,y){
        cxt.clearRect(0,0,x,y);
    },
	clearRect : function(cxt,x,y,width,height){
		cxt.clearRect(x,y,width,height);
	},
     //画图
    drawImg : function(cxt,img,x,y,sw,sh,dx,dy,dw,dh){
	
         if(!sw)cxt.drawImage(img,x,y);
		 else cxt.drawImage(img,x,y,sw,sh,dx,dy,dw,dh);
    },
     //画文字
    drawText : function(cxt,string,x,y,color){
         
         cxt.fillStyle = color;
         cxt.font = 'bold 12px sans-serif';
         cxt.fillText(string,x,y);
    },
    //画填充的方
	fillRect : function(cxt,x,y,width,height,color){
		
		cxt.fillStyle = color;
		cxt.fillRect(x,y,width,height);
	},
    //画边框的方
	drawRect : function(cxt,x,y,width,height,color){
		
		cxt.strokeStyle = color;
		cxt.lineWidth = 1;
		cxt.strokeRect(x,y,width,height);
	},
	 //画圆
	//ctx:context2d对象,x:圆心x坐标,y:圆心y坐标,radius:半径,color:颜色
	fillArc : function(cxt,x,y,radius,color){
		cxt.fillStyle = color;
		cxt.beginPath();
		cxt.arc(x,y,radius,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
	},
	drawLine : function(cxt,x0,y0,x1,y1,color,width){
		cxt.lineWidth = width;
		cxt.strokeStyle = color;
		cxt.beginPath();
		cxt.moveTo(x0,y0);
		cxt.lineTo(x1,y1);
		cxt.closePath();
		cxt.stroke();
	}
 }