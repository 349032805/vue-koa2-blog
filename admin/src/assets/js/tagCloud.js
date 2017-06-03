//需要传入一个容器元素和一个配置项
function TagCloud(dom, config){

	if(!config || Object.prototype.toString.call(config) !== '[object Object]'){
		console.log('必须传入一个config对象');
		return;
	}

	this.dom = dom;
	this.config = config;
	//存放所有标签的节点
	this.tagArr = [];
	//存放事件
	this.handlers = {};
	this.add();
	this.init1();
};
// 在更新少量节点的时候可以直接向父节点中添加，但是当要向父节点中添加大量数据是，如果直接添加这些新节点，这个过程非常缓慢，因为每添加一个节点都会调用父节点的appendChild()方法，为了解决这个问题，可以创建一个文档碎片，把所有的新节点附加其上，然后把文档碎片一次性添加到父节点中。
TagCloud.prototype.add = function(){
	if(!this.config.tags){
		console.log('没有传入标签数组!');
		return;
	}

	var tags = this.config.tags;
	
	//创建一个文档碎片
	var tagGroup = document.createDocumentFragment();
	for(var i = 0, len = tags.length; i < len; i++){
		var div = document.createElement('div');
		div.setAttribute('class', 'cloud-tag');
		div.innerText = tags[i];
		//避免把之前的样式清除没了,+";"为兼容ie
		div.style.cssText += ';position:absolute;left:0;top:0;font-weight:bolder';
		//关闭按钮
		// var span = document.createElement('span')
		// span.setAttribute('class', 'cloud-tag-del');
		// span.innerText = 'x';
		// div.appendChild(span);
		tagGroup.appendChild(div);
		this.tagArr.push(div);
	}
	this.dom.appendChild(tagGroup);
	//标签容器需要相对定位
	this.dom.style.position = 'relative';

	return this;

};
TagCloud.prototype.addOne = function(tag){
	if(typeof tag !== 'string' || !tag){
		console.log('请传入一个字符串！');
		return;
	}
	this.config.tags.push(tag);
	return this;
};
TagCloud.prototype.init1 = function(){
	//默认参数
	var opt = {
		radius: 200, //球体半径
		maxFont: 30, //最大字体
		color: true, //true为随机颜色
		rotateAngleXbase:300,//默认旋转速度基数，数越小速度越快
		rotateAngleYbase:300,
		hover: true, //是否开启悬浮联动
	};
	//传进来的参数
	var config = this.config;
	//合并
	for(var key in opt){
		if(this.config[key]){
			opt[key] = this.config[key];
		}
	}
	//allTag为存放对象的数组
	var allTag = [];
	var rotateAngleX=Math.PI/opt.rotateAngleXbase;
	var rotateAngleY=Math.PI/opt.rotateAngleYbase;
	var that = this;
	//传入半径
	function init(r){
		for(var i = 0, len = that.tagArr.length; i < len; i++){
			if(opt.color === true){
				that.tagArr[i].style.color = 'rgb('+ Math.round(255*Math.random())+','+ Math.round(255*Math.random())+','+ Math.round(255*Math.random())+')';
			}else{
				that.tagArr[i].style.color = opt.color;
			}
			// 获取球面上均匀的点的经纬度 θ = arccos( ((2*num)-1)/all - 1); Φ = θ*sqrt(all * π);
			var angleX = Math.acos((2*(i+1)-1)/len-1);
			var angleY = angleX*Math.sqrt(len*Math.PI);
			//根据经纬度获取点的坐标，球中心的点坐标是 (0,0,0) x=r*sinθ*cosΦ   y=r*sinθ*sinΦ   z=r*cosθ;
			var x = r*Math.sin(angleX)*Math.cos(angleY);
			var y = r*Math.sin(angleX)*Math.sin(angleY);
			var z = r*Math.cos(angleX);
			//每个标签对象都有四对值
			var tag={
				x: x, y: y, z: z, ele: that.tagArr[i]
			};
			allTag.push(tag);
		}
	}
	//设置每个标签的坐标位置和字体大小以及透明度
	function setPosition(tag,r,maxFont){
		tag.ele.style.transform="translate("+(tag.x+that.dom.offsetWidth/2-tag.ele.offsetWidth/2)+"px,"+(tag.y+that.dom.offsetHeight/2-tag.ele.offsetHeight/2)+"px)";
		tag.ele.style.opacity=tag.z/r/2+0.7;
		tag.ele.style.fontSize=(tag.z/r/2+0.5)*maxFont+"px";
	}
	//绕x轴旋转的函数
	function rotateX(tag){
		var cos=Math.cos(rotateAngleX);
		var sin=Math.sin(rotateAngleX);
		var y1=tag.y*cos - tag.z*sin;
		var z1=tag.y*sin + tag.z*cos;
		tag.y=y1;
		tag.z=z1;
	}
	//绕y轴旋转的函数
	function rotateY(tag){
		var cos=Math.cos(rotateAngleY);
		var sin=Math.sin(rotateAngleY);
		var x1=tag.z*sin+tag.x*cos;
		var z1=tag.z*cos-tag.x*sin;
		tag.x=x1;
		tag.z=z1;
	}
	//鼠标悬浮改变转速和方向
	// if(opt.hover === true){
	// 	this.dom.onmousemove=function(e){
	// 		rotateAngleY=(e.pageX-this.offsetLeft-this.offsetWidth/2)/10000;
	// 		rotateAngleX=-(e.pageY-this.offsetTop-this.offsetHeight/2)/10000;
	// 	}
	// }else{
	// 	this.dom.onmousemove=null;
	// }
	init(opt.radius);
	//开始转动的函数
	//flag用来控制定时器
	var flag = true;
	var timer = setInterval(function(){
		if(flag){
			for(var i=0;i< allTag.length;i++){
				rotateX(allTag[i]);
				rotateY(allTag[i]);
				setPosition(allTag[i], opt.radius, opt.maxFont);
			}
		}else{
			flag = false;
		}
	},17);
	//事件委托
	var clickFlag = true;
	this.dom.onclick = function(ev){
		ev.stopPropagation();
		if(clickFlag){
			clickFlag = false;
			var ev = ev || window.ev;
			var target = ev.target || ev.srcElement;
			if(target.nodeName.toLowerCase() === 'div'){
					//查看当前点击的div在数组中是第几个
					var i = that.tagArr.indexOf(target)
					//停止旋转
					flag = false;
					//创建按钮
					var div = document.createElement('div')
					div.setAttribute('class', 'cloud-tag-del');
					div.innerText = 'x';
					target.appendChild(div);
					//按钮点击事件，注意一定要阻止冒泡
					div.onclick = function(ev){
						ev.stopPropagation();
						allTag.splice(i, 1);
						that.tagArr.splice(i, 1);
						that.dom.removeChild(target);
						flag = true;
						clickFlag = true;
						//触发close事件，并把当前i传出去
						that.fire('close', target.innerText);
					};
					//移动到指定的位置处,并存储旧值
					var x = allTag[i].x;
					var y = allTag[i].y;
					var z = allTag[i].z;

					allTag[i].x = opt.radius*2;
					allTag[i].y = 0;
					allTag[i].z = 0;
					allTag[i].ele.style.transform = 'translate3D(0, 0, 0)';
					allTag[i].ele.style.transition = 'all 1s';
					rotateX(allTag[i]);
					rotateY(allTag[i]);
					setPosition(allTag[i], opt.radius, opt.maxFont);
					//点击文档其他部分可返回标签
					document.onclick = function(){
						//同时移除删除按钮
						target.removeChild(div);
						flag = true;
						clickFlag = true;
						allTag[i].x = x;
						allTag[i].y = y;
						allTag[i].z = z;
						allTag[i].ele.style.transform = 'translate3D(0, 0, 0)';
						allTag[i].ele.style.transition = 'all 1s';
						rotateX(allTag[i]);
						rotateY(allTag[i]);
						setPosition(allTag[i], opt.radius, opt.maxFont);
						this.onclick = null;
					}
			}
		}else{
			return;
		}
	}
};
//触发事件
TagCloud.prototype.fire = function(type, data){
	if(this.handlers[type] instanceof Array){
		for(var i = 0, len = this.handlers[type].length; i < len; i++){
			this.handlers[type][i](data);
		}
	}
};
//监听事件
TagCloud.prototype.on = function(type, handler){
	if(this.handlers[type] === undefined){
		this.handlers[type] = [];
	}
	this.handlers[type].push(handler);
	return this;
};

export default TagCloud;