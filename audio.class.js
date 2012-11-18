/*=============================================================================
#     FileName: audio.class.js
#         Desc: html5 audio class
#       Author: jiudai.cui
#        Email: jiudai.cui@renren-inc.com
#     HomePage: http://blog.meituo.net
#      Version: 0.0.1
#   LastChange: 2012-02-22 18:49:52
#      History:
=============================================================================*/
//audio label here:
//http://www.w3school.com.cn/html5/tag_audio.asp
//http://www.w3school.com.cn/html5/html5_ref_eventattributes.asp#Media_Events
var audioObject = (function(){

var $extend = function () {
	var result = arguments[0];
	for(var i=1; i<arguments.length; i++) {
		if(typeof arguments[i] == 'object') {
			for(var key in arguments[i])
				result[key] = arguments[i][key];
		}
	}
	return result;
};
function audio(options){
	this.conf = {
		src:'',// needed; src of the audio
		id:'',//needed ;id to be replace
		ClassName:'',
		autoplay:false,//如果出现该属性，则音频在就绪后马上播放。
		controls:false,//controls	如果出现该属性，则向用户显示控件，比如播放按钮。;
		loop:false,//	loop	如果出现该属性，则每当音频结束时重新开始播放。
		preload:true//preload	如果出现该属性，则音频在页面加载时进行加载，并预备播放。 如果使用 "autoplay"，则忽略该属性。
	};

	$extend(this.conf,options);
	if(this.conf.id){
		this.embed(this.conf.id);
	}else{
		throw new Error('the audio id is enssential');
	}

}
$extend(audio.prototype,{
	emptyFunc:function(){},
	embed:function(id,callback){
		callback = callback || function(){};
		var obj = document.getElementById(this.conf.id),
		conf = this.conf,
		self = this;
		var newObj = document.createElement("audio");
		newObj.setAttribute("src",conf.src);
		if(conf.autoplay){
			newObj.setAttribute("autoplay","");
			this.playing = true;
		}
		if(conf.controls){
			newObj.setAttribute("controls","");
		}
		if(conf.loop){
			newObj.setAttribute("loop","");
		}
		if(conf.className){
			newObj.setAttribute('class',conf.className);
		}
		this.conf.tempid = "audioObjectNew"+this.conf.id;
		newObj.setAttribute("id", this.conf.tempid);
		obj.parentNode.insertBefore(newObj, obj); 
		newObj.parentNode.removeChild(obj);
		newObj.setAttribute("id",id);

		this.obj = newObj;
	},
	/**
	* @Usage 静音 
	*/
	muted:function(func){
		this.obj.muted = true;
		this.fixNoneFunc(arguments);
	},
	unmuted:function(func){
		this.obj.muted = false;
		this.fixNoneFunc(arguments);
	},
	toggleMuted:function(){
		this.obj.muted ? this.unmuted():this.muted();
	},
	/**
	* @Usage 执行回调函数 
	*
	* @Param args
	*/
	fixNoneFunc:function(args){
		if(!args.length){
			return;
		}
		valr= Array.prototype.slice.call(args,1);
		func = args[0]; 
		return func.apply(this,valr);
	},
	src : function(val){
		if(val){
			this.attr('src',val);
		}else{
			this.obj.src;
		}
		//this.obj.play();
	},
	playUrl:function(src){
		this.src(src);
	},
	attr:function(name,value){
		if(typeof value !== 'undefined'){
			
			//切换src时会根据autoplay调节 播放状态
			if(name =='src' && this.obj.getAttribute('autoplay') ){
				this.playing = true;	
			}
			if(value){
				this.obj.setAttribute(name,value);
			}else{
				this.rmAttr(name);
			}
			//不是autoplay 但是正在播放，恢复其播放状态
			if(this.playing){
				this.obj.play();	
			}else{
				this.playing = false;
			}

		}else{
			return this.obj.getAttribute(name);	
		}
	},
	rmAttr:function(name){
		this.obj.removeAttribute(name);
	},
	canPlay:function(src){
		return	this.obj.canPlayType(src);
	
	},
	//w3c支持的特殊的事件列表
	//onload 
	//onabort	script	当发生中止事件时运行脚本
	//oncanplay	script	当媒介能够开始播放但可能因缓冲而需要停止时运行脚本
	//oncanplaythrough	script	当媒介能够无需因缓冲而停止即可播放至结尾时运行脚本
	//ondurationchange	script	当媒介长度改变时运行脚本
	//onemptied	script	当媒介资源元素突然为空时（网络错误、加载错误等）运行脚本
	//onended	script	当媒介已抵达结尾时运行脚本
	//onerror	script	当在元素加载期间发生错误时运行脚本
	//onloadeddata	script	当加载媒介数据时运行脚本
	//onloadedmetadata	script	当媒介元素的持续时间以及其他媒介数据已加载时运行脚本
	//onloadstart	script	当浏览器开始加载媒介数据时运行脚本
	//onpause	script	当媒介数据暂停时运行脚本
	//onplay	script	当媒介数据将要开始播放时运行脚本
	//onplaying	script	当媒介数据已开始播放时运行脚本
	//onprogress	script	当浏览器正在取媒介数据时运行脚本
	//onratechange	script	当媒介数据的播放速率改变时运行脚本
	//onreadystatechange	script	当就绪状态（ready-state）改变时运行脚本
	//onseeked	script	当媒介元素的定位属性 [1] 不再为真且定位已结束时运行脚本
	//onseeking	script	当媒介元素的定位属性为真且定位已开始时运行脚本
	//onstalled	script	当取回媒介数据过程中（延迟）存在错误时运行脚本
	//onsuspend	script	当浏览器已在取媒介数据但在取回整个媒介文件之前停止时运行脚本
	//ontimeupdate	script	当媒介改变其播放位置时运行脚本
	//onvolumechange	script	当媒介改变音量亦或当音量被设置为静音时运行脚本
	//onwaiting	script	当媒介已停止播放但打算继续播放时运行脚本
	addEvent:function(name,func){
		this.obj.addEventListener(name,func,false);	
	},
	play:function(){
		this.obj.play();
		this.playing = !0;
	},
	pause:function(){
		this.obj.pause();
		this.playing = !1;
	},
	toggle:function(){
		if(this.obj.paused){
			this.play();
		}else{
			this.pause();
		}
	},
	paused:function(){
		return this.obj.paused;
	},
	duration:function(){
		return this.obj.duration;
	},
	volume:function(val){
		if(val){
			this.obj.volume = val;
		}
		return this.obj.volume;
	},
	
	/**
	* @Usage get or set currentTime
	*
	* @Param val
	*/
	currentTime:function(val){
		if(val){
			this.obj.currentTime = val;	
		}else{
			return this.obj.currentTime;
		}
	},
	setCurrent:function(val){
		this.obj.currentTime(val);
	},
	/**
	* @Usage set progress percent
	*
	* @Param val
	*/
	setPercent:function(val){
		var dur = this.duration();
		var time = parseInt(dur * val,10);
		this.currentTime(time);
	},
	getPercent:function(){
		return this.currentTime()/this.duration();
	},
	//play on val secend
	playAt:function(val){
		this.currentTime(val);
		this.play();
	},
	//play on percent 
	playOn:function(val){
		this.setPercent(val);
		this.play();
	},
	/**
	* @Usage 简单包裹了下ended事件
	*
	* @Param fun
	*/
	ended:function(fun){
		var fun = fun || this.emptyFunc;
		var self = this;
		this.eventProxy('ended',function(){
			fun();
		   //self.src('http://music.store.renren.com/music/d3/61/a13561/s24071/m155498_9add0dc5.mp3');
		});
	},
	/**
	* @Usage mp3 fail to load
	*/
	error:function(fun){
		this.addEvent('error',fun);
	},
	eventProxy:function(name,func){
		func = func || this.emptyFunc;
		this.addEvent(name,func);
	}

});

return audio;
})();
	
