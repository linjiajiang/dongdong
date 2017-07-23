//变速动画
    function anims(ele,js,func){
    	
			// 多次点击时,使得这个元素的计时器停止
			clearInterval(ele.timer);
			ele.timer = setInterval(function(){
				// 声明一个开关,去表示是否可以停止计时器
				var isStop = true;
				for(var attrName in js){
					// 根据attrName进行不同区分对待
					var step ;
					if(attrName == "opacity"){
						step = (js[attrName]*100 - getAttr(ele,attrName) * 100)/10;
					}else{
						step = (js[attrName] - parseInt(getAttr(ele,attrName)))/10;
					}
					// console.log(parseInt(getAttr(ele,attrName)))
					// 根据step正负值来进行对应的判断
					step = step>0?Math.ceil(step):Math.floor(step);
					if(attrName == "opacity"){
						ele.style.opacity = (getAttr(ele,attrName) * 100 + step)/100;
					}else if(attrName == "z-index"){
						ele.style.zIndex = js[attrName];
					}else{
						ele.style[attrName] = parseInt(getAttr(ele,attrName)) + step + "px";
					}
					// 对于当前属性值跟目标值进行比较,只要有一个属性值还不等于target,那么isStop就设置为false
					var compare = (attrName == "opacity")?getAttr(ele,attrName):parseInt(getAttr(ele,attrName));
					if(compare != js[attrName]){
						isStop = false;
					}
				}
				// 对于计时器的停止
				if(isStop){
					// console.log("停下来了");
					clearInterval(ele.timer);
					if(func!=null){
						func();
					}
				}
			}, 10);
		}
		// 使用一个函数去获取到这个元素的属性值
		function getAttr(ele,attrName){

			// ie9以上以及其他浏览器上的写法
			if(window.getComputedStyle!=null){
				return window.getComputedStyle(ele)[attrName];
			}else{
				// ie 6,7,8
				return ele.currentStyle[attrName];
			}
		}
//匀速动画
		function anim(ele,target){
			clearInterval(ele.timer);
			ele.timer=setInterval(function(){
				var step=ele.offsetLeft<target?10:-10 ;
				ele.style.left=ele.offsetLeft+step+"px";
				if (Math.abs(ele.offsetLeft-target)<10) {
					ele.style.left=target+"px";
					console.log(ele.offsetLeft)
					clearInterval(ele.timer);
				}

			}, 10)
		}
//获取浏览器宽度值
		function clientWidth(){
			if (window.innerWidth!=null) {
				return window.innerWidth;
			}else{
				return document.documentElement.clientWidth;
			}
		}
//获取浏览器的高度值
		function clientHeight(){
			if (window.innerHeight!=null) {
				return window.innerHeight;
			}else{
				return document.documentElement.clientHeight;
			}
		}
	// 元素的获取
	function $(name){
			// 将传入的name的开头字符找到
			var prefix = name.charAt(0);
			if(prefix=="#"){
				var id = name.substring(1);
				return document.getElementById(id);
			}else if(prefix == "."){
				var className = name.substring(1);
				return getClasses(className);
			}else{
				return document.getElementsByTagName(name);
			}
}
function getClasses(className){
	// 1. 不是ie6,7,8时 --> 可以使用getElementsByClassName这个方式
	if(document.getElementsByClassName){
		return document.getElementsByClassName(className);
	}else{
		// 准备一个空的数组,专门用来存放满足条件的那些元素
		var eles = [];
		// 浏览器是属于ie6,7,8 
		// 1. 根据tag先找到所有的元素
		var allEles = document.getElementsByTagName("*");
		for(var i = 0;i<allEles.length;i++){
			// 将所有元素的className进行挨个判断
			var ele = allEles[i];
			// 获取到这个元素上的class值
			var eleName = ele.className;
			// 要将获取的class的值进行裁剪,裁成数组的形式
			var arr = eleName.split(" ");
			// 没法直接使用eleName 跟 className进行直接比较
			for(var j = 0;j<arr.length;j++){
				if(arr[j] == className){
					eles.push(allEles[i]);
					break;
				}
			}
		}
		// 当循环结束之后,就意味着eles这个数组中就存放了所有满足className的元素了
		return eles;
	}
}

	// =====================================================================================
	// 获取元素

  window.onload=function(){
  	// 左侧列表设置
	var j_cate=$("#J_cate")
	var ww=j_cate.children[0];
	var list=ww.children[0];
	var ul=list.children[0];
	var JS_popCtn=list.children[1];
	var cate_part=JS_popCtn.children;
	var lis=ul.children;
	for (var i = 0; i < lis.length; i++) {
		lis[i].index=i;
		lis[i].onmouseover=function(){
			for (var j = 0; j < lis.length; j++) {
				JS_popCtn.style.display="none";
				cate_part[j].style.display="none";
			}
			JS_popCtn.style.display="block";
			cate_part[this.index].style.display="block";
		}
		lis[i].onmouseleave=function(){
			// cate_part.style.display="none";
			JS_popCtn.onmouseover=function(){
				JS_popCtn.style.display="block";
			// cate_part[this.index].style.display="block";
			}
			JS_popCtn.onmouseleave=function(){
				JS_popCtn.style.display="none";
				ul.onmouseleave=function(){
					JS_popCtn.style.display="none";
				}
			}
		}
	}
  	// 中间轮播图设置
  	var J_slider=ww.children[1];
  	var J_slider_main=J_slider.children[0];
  	var J_slider_img =J_slider_main.children[0];
  	var J_slider_point =J_slider_main.children[1];
  	var point_ul=J_slider_point.children[0];
  	var point_ul_lis=point_ul.children;
  	var lbul=J_slider_img.children[0];
  	var lblis=lbul.children;
  	var ri=J_slider_img.children[1];
  	var lt=J_slider_img.children[2];
  		var current = 0;
		var target = 0;
		// 2.1 设定按钮的点击事件
		ri.onclick = function(){
			target -= (target==-790*7)?0:790;
			swicthCirclePoint(target/(-790));
		}
		lt.onclick = function(){
			target += (target==0)?0:790;
			swicthCirclePoint(target/(-790));
		}
		// 2.2 为每一个li元素去设置触摸事件
		for(var i = 0;i<point_ul_lis.length;i++){
			point_ul_lis[i].index = i;
			point_ul_lis[i].onmouseover = function(){
				// 切换小图标
				swicthCirclePoint(this.index);
				// 设置target --> 计时器在不停地设置 -> 只要target这个成员变量发生变化,就会使得界面显示发生变化
				target = this.index * (-790);
			}
		}
		// 3. 界面打开时,直接开启一个计时器
		setInterval(function(){
			current += (target - current)/10;
			lbul.style.left = current + "px";
		}, 10);
		// 用于小圆点的切换
		function swicthCirclePoint(index){
			// 排除思想
			for(var j=0;j<point_ul_lis.length;j++){
				point_ul_lis[j].className = "";
			}
			point_ul_lis[index].className = "point_red";
		}
		//左右切换触摸效果
		ri.onmouseover=function(){
			ri.style.opacity=0.8;
		}
		ri.onmouseleave=function(){
			ri.style.opacity=0.2;
		}
		lt.onmouseover=function(){
			lt.style.opacity=0.8;
		}
		lt.onmouseleave=function(){
			lt.style.opacity=0.2;
		}
		// 公告部分动态
		var fs_co=ww.children[2];
		var J_news =fs_co.children[1];
		var mod_tab=J_news.children[0];
		var J_news_tab=mod_tab.children[0];
		var J_tab_content=mod_tab.children[1];
		var cx=J_news_tab.children[0];
		var gg=J_news_tab.children[1];
		var J_tab_content_c=J_tab_content.children[0];
		var J_tab_content_g=J_tab_content.children[1];
		cx.onmouseover=function(){
			J_tab_content_c.style.display="block";
			J_tab_content_g.style.display="none";
		}
		gg.onmouseover=function(){
			J_tab_content_c.style.display="none";
			J_tab_content_g.style.display="block";
		}
		//秒杀设置
		
		// 发现好货
		var find_clearfix_cont=$(".find_clearfix_cont");
		var  findul=find_clearfix_cont[0].children[0];
		var findlis=findul.children;
		for (var i = 0; i < findlis.length; i++) {
			findmove(i);
		};
		function findmove(i){
			var finda=findlis[i].children[0];
			var findimg=finda.children[1];
			findlis[i].onmouseover=function(){
				anims(findimg,{"left":100})
			};
			findlis[i].onmouseleave=function(){
				anims(findimg,{"left":90})
			}
		}
	
		// 排行榜切换设置
		var top_cont_head=$(".top_cont_head");
		var as=top_cont_head[0].children;
		var top_cont_deta=$(".top_cont_deta");
		var divs=top_cont_deta[0].children;
		for (var i = 0; i < as.length; i++) {
			as[i].index=i;
			as[i].onmouseover=function(){
				for (var j = 0; j < divs.length; j++) {
					divs[j].style.display="none";
				}
				divs[this.index].style.display="block";
			}

		}
		// 领卷中心图片移动
		var lj=$("#coupon_lazy");
		var ljw=lj.children[0];
		var coupon_hd1=ljw.children[1];
		var ljul=coupon_hd1.children[0];
		var ljlis=ljul.children;
		for (var i = 0; i < ljlis.length; i++) {
			moves(i);
		}
		function moves(i){
			var lja=ljlis[i].children[0];
			var imgs=lja.children[1];
			ljlis[i].onmouseover=function(){
				anims(imgs,{"left":50})
			}
			ljlis[i].onmouseleave=function(){
				anims(imgs,{"left":40})
			}
		}
		// 享品质
		// var Enjoyqualitylis=$(".entry_item");
		// for (var i = 0; i < Enjoyqualitylis.length; i++) {
		// 	var Enjoyqualityimg=Enjoyqualitylis[i].children[0].children[1];
		// 	Enjoyqualitylis[i].onmouseover=function(){
		// 		anims(Enjoyqualityimg,{"left":10})
		// 		console.log(159)
		// 	}
		// 	Enjoyqualitylis[i].onmouseleave=function(){
		// 		anims(Enjoyqualityimg,{"left":0})
		// 	}
		// };
		//爱生活图片移动
		// var pt_cover=$(".pt_cover");
		// var pt_cover
		// 	for (var i = 0; i < pt_cover.length; i++) {
		// 		 pt_coverimgmove(i);
		// 	};
		// 	function pt_coverimgmove(i){
		// 		var pt_covera= pt_cover[i].children[0];
		// 		var pt_coverimg=pt_covera.children[0];
		// 			pt_cover[i].onmouseover=function(){
		// 			anims(pt_coverimg,{"left":10})
		// 		}
		// 			pt_cover[i].onmouseleave=function(){
		// 			anims(pt_coverimg,{"left":0})
		// 		}
		// 	}

		var pt_bi_4=$(".pt_bi_4");
		var pt_bi_4_a;
		for (var i = 0; i < pt_bi_4.length; i++) {
			pt_bi_4_a=pt_bi_4[i].children;
				for (var j = 0; j < pt_bi_4_a.length; j++) {
					pt_bi_4_a_imgmove(j);
			};
		};
		
		
		function pt_bi_4_a_imgmove(i){
			var pt_bi_4_a_img=pt_bi_4_a[i].children[2];
			pt_bi_4_a[i].onmouseover=function(){
				anims(pt_bi_4_a_img,{"left":90})
			}
			pt_bi_4_a[i].onmouseleave=function(){
				anims(pt_bi_4_a_img,{"left":80})
			}
		}
		// 还没逛够动态添加内容
		//还没逛够效果
		// var more_inner=$(".more_inner");
		// var more_innerul=more_inner[0].children[0];
		// var more_innerlis=more_innerul.children;
		// for (var i = 0; i < more_innerlis.length; i++) {
		// 	more_innerlis[i].onmouseover=function(){
		// 		for (var i = 0; i < more_innerlis.length; i++) {
		// 			more_innerlis[i].style.border="1px solid white"
		// 		};
		// 		more_innerlis[i].style.border="1px solid red";
		// 	};
		// 	more_innerlis[i].onmouseleave=function(){
		// 		more_innerlis[i].style.border="1px solid white"
		// 	}
		// };
			//滚动条设置
			var choos=$(".choos")[0];
			var chooslis=choos.children;
			var distion=0;
			window.onscroll=function(){
					if(scrollTop()>=1300){
					choos.style.display="block";
				}else{
					choos.style.display="none";
				}
				for (var i = 0; i < chooslis.length; i++) {
					Things[i]
				};
			}

			
		function scrollTop(){
			if(window.pageYOffset!=null){
				return window.pageYOffset;
			}else{
				return document.documentElement.scrollTop;
			}
		}
  }