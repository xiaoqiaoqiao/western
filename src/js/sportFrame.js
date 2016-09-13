// JavaScript Document
function cssStyle(obj,prop,value){
	if(arguments.length==2){
		if(obj.currentStyle){
			return parseFloat(obj.currentStyle[prop]);	
		}else{
			return parseFloat(getComputedStyle(obj,false)[prop]);//c大写	
		}	
	}else{
		obj.style[prop]=value+'px';	
	}	
}
var timer=null;
function sport(obj,json,fn){
	clearInterval(obj.timer);	
	var val=0;
	var speed=0;
	obj.timer=setInterval(function(){
		for(var name in json){
			var flag=true;//标志位
			if(name=='opacity'){
				val=Math.round(cssStyle(obj,name)*100);	
			}else{
				val=cssStyle(obj,name);	
			}
			
			speed=(json[name]-val)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(json[name]!=val){
				flag=false;
			}
				if(name=='opacity'){
					obj.style.filter='alpha(opacity:'+(val+speed)+')';
					obj.style.opacity=(val+speed)/100;
				}else{
					cssStyle(obj,name,val+speed);
				}	
			
			
		}
		if(flag){
				clearInterval(obj.timer);
				if(fn)//回调函数
					fn();	
		}
	},30);
}