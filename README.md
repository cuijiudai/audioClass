## audioClass

###初始化

对audio标签的简单封装类，不依赖任何类库，创建一个audio实例：

```
var	player = new audioObject({
	id:"radio_player",//要替换的html元素 必需参数
	autoplay:true
}); 
```

* 初始化的时候可以传入的参数有：
	* autoplay
	* controls
	* loop
	* className		
	
创建后一个radio标签将替换id 为 “radio_player” 的DOM元素。
然后你就可以使用player对象控制播放了


```
player.src('http://xx.com/ss.mp3') //设置播放的文件
var fileUrl = player.src() //返回当前播放的文件地址
```
	

然后你就可以使用player对象控制播放的了,比如添加事件：

```
player.addEvent('timeupdate',function(){
	console.log(player.getPercent());
});
```

###支持的方法

* 支持方法：
	* muted([callback]) //静音
	* unmuted([callback]) //去除静音
	* toggleMuted([callback]) // 切换静音和非静音
	* src([url]) //传递参数为设置url，否则返回当前播放的地址
	* playUrl(string) //设置播放地址
	* attr(name,[value]) //传递参数为设置属性，否则返回属性的值
	* rmAttr(name) //删除属性
	* canPlay(src) //是否能够播放src
	* addEvent(name,callback) //添加事件
	* play //播放，从暂停恢复播放
	* pause //暂停
	* toggle //切换暂停和播放
	* paused //是否暂停了
	* duration //当前歌曲时间长度
	* volume([val]) //设置了val为设置声音的大小，否则是获得当前的声音大小
	* currentTime([val]) //val 为设置当前的播放时间 ，否则返回当前的播放时间
	* setCurrent(val) //设置当前的播放时间
	* setPercent(val) //从歌曲的百分之val开始播放
	* getPercent //获得当前播放的百分比
	* playAt(val) //等于currentTime传入val
	* playOn(val) //等于setPercent 传入val
	* ended(callback) //音频播放结束的回调
	* error(callback) //获取文件出错的回调

### 支持的事件

事件可以添加的是w3c标准支持的事件：

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
	
### 示例 

使用的示例有我做的一个chrome插件： [人人电台](http://blog.meituo.net/2012/02/29/chrome%E7%89%88%E4%BA%BA%E4%BA%BA%E7%94%B5%E5%8F%B0%E5%8F%91%E5%B8%83/)
	



		

