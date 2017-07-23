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
window.onload=function(){
	// 1. 查找所需的元素
		var box = document.getElementById("box");
		var specImg = box.children[0];
		var detailImg = box.children[1];
		var bigImg = detailImg.children[0];
		var img = specImg.children[0];
		var deck = specImg.children[1];
		// 2. 设定触摸事件 --> 先使得deck跟detailImg显示跟隐藏
		box.onmouseover = function(){
			detailImg.style.display = "block";
			deck.style.display = "block";
		}
		box.onmouseleave = function(){
			detailImg.style.display = "none";
			deck.style.display = "none";
		}
		/*
		3. 设定鼠标的滑动事件 
		-> 为哪个元素设置
		-> 书写滑动事件目的
		-> 使得deck的left跟top发生变化
		-> 获取到鼠标触摸的位置
		*/ 
		specImg.onmousemove = function(event){
			var ev = event || window.event;
			// xxxxx
			var x = ev.clientX - box.offsetLeft - deck.offsetWidth/2;
			var y = ev.clientY - box.offsetTop - deck.offsetHeight/2;
			// 3.1 对于获取到的x,y值的左 顶边距需要进行判断
			if(x<=0){
				x = 0;
			}
			if(y<=0){
				y = 0;
			}
			// 3.2 对于获取到的x,y值的右 底边距需要进行判断
			if(x>=box.offsetWidth - deck.offsetWidth){
				x = box.offsetWidth - deck.offsetWidth;
			}
			if(y>=box.offsetHeight - deck.offsetHeight){
				y=box.offsetHeight - deck.offsetHeight;
			}
			// 3.3 设定deck的lef以及top
			deck.style.left = x + "px";
			deck.style.top = y + "px";
			// 3.4 设定detailImg中的img的left以及top值
			bigImg.style.left = -x*detailImg.offsetWidth/specImg.offsetWidth + "px";
			bigImg.style.top = -y*detailImg.offsetHeight/specImg.offsetHeight + "px";
		}
		// 第二个模块
		var specList = document.getElementById("spec-lists");
		var specUl = specList.children[0];
		var specLis = specUl.children;
		var bigImgs = ["../images/ibig0.jpg","../images/ibig2.jpg","../images/ibig3.jpg","../images/ibig4.jpg"];
		var biggestImgs = ["../images/ibig0.jpg","../images/ibig2.jpg","../images/ibig3.jpg","../images/ibig4.jpg"];
		// 对于小图标的触摸事件的介绍
		for(var i = 0;i<specLis.length;i++){
			specLis[i].index = i;
			specLis[i].onmouseover = function(){
				bigImg.src = biggestImgs[this.index];
				img.src = bigImgs[this.index];
			}
		}
		// 样式选择
		var dls=$("dl");
		var phonecolors=dls[0].children[1].children[0].children;
		var phonespecifications=dls[1].children[1].children[0].children;
		var buymethods=dls[2].children[1].children[0].children;
		var paymethods=dls[3].children[1].children[0].children;
		changeborder(phonecolors);
		changeborder(phonespecifications);
		changeborder(buymethods);
		changeborder(paymethods);
		function changeborder(ele){
			for (var i = 0; i < ele.length; i++) {
			ele[i].index=i;
			ele[i].onmouseover=function(){
				for (var j = 0; j < ele.length; j++) {
					ele[j].style.border="1px solid #9d9d9d";
				};
				ele[this.index].style.border="1px solid #f00";
			};
			ele[i].onmouseleave=function(){
				ele[this.index].style.border="1px solid #9d9d9d";
			}
			};
		}
		var numdown=$(".numdown")[0];
		var numup=$(".numup")[0];
		var inputvalue=$(".goodsnum")[0].children[1];
		var num=1;
		numup.onclick=function(){
			num++;
			inputvalue.value=num;
		}
		// if (inputvalue.value<2) {
		// 	numdown.disabled="disabled";
		// }else{
		// 	numdown.disabled=false;

		// }
		numdown.onclick=function(){
				num--;
			inputvalue.value=num;
				}
	// 商品介绍
	var products_introduction=$(".products-introduction")[0];
	var productul=products_introduction.children[0];
	var productlis=	productul.children;
	var introduction_cont=$(".introduction-cont")[0];
	var contdivs=introduction_cont.children;
	for (var i = 0; i < productlis.length; i++) {
		productlis[i].index=i;
		productlis[i].onmousedown=function(){
			for (var j = 0; j < productlis.length; j++) {
				productlis[j].style.backgroundColor="#fff";
				productlis[j].style.color="#000";
				contdivs[j].style.display="none";
			};
			productlis[this.index].style.backgroundColor="#f75000";
			productlis[this.index].style.color="#fff";
			contdivs[this.index].style.display="block";
		}
	};

}