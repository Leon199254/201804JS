HTML5+CSS3+JS进行移动端页面开发 
### HTML5标签  seo 搜索引擎
布局的语义化标签：header,nav,footer,section,article,aside,figure,figcaption,main
### html5新增的表单
### css3属性（基本属性和核心属性）
transition 当css属性值发生改变时，由起始值向结束值之间平滑过渡的效果
 - hover
 - js
 - 媒体查询
 transition-property 过渡属性  all
 transition-duration  过渡时间 0s
 transition-timing-function 动画运行的速度 ease
 transition-delay  延迟时间  0s
 
animation 帧动画 
- 复杂的动画效果
- 不需要条件 只要设置animation这个元素就会有动画效果
有两部分：1.@keyframes 声明帧动画 确定动画运行的曲线
        2.通过animation调用帧动画
        
        @keyframes move{  //百分比理解成时时间的百分比
           0%{//刚开始时
           css样式
           
            }
           50%{
           
           } 
            100%{//结束时
            
            }
        }
        
animation:move 1s 1 both;
animation-name 帧动画名称 （必须设置）
animation-duration 动画运行的时间 （必须设置）
animation-timing-function 动画运行速度
animation-delay 动画延迟时间
animation-iteration-count 执行的次数 1(默认)||infinite(无数次)
animation-direction:normal||reverse||alternate(交替)||alternate-reverse(反方向交替)
animation-play-state:running(默认)||paused(停止)
animation-fill-mode:none||forwards(停留在最后一帧)||backwards（从第一帧开始）|both (动画结束后状态,从第一帧开始停留在最后一帧) （一般会设置）

2D,3D变型属性和方法
transform:rotate(45deg)
transform:scale(1) <1 缩小 >1 放大
transform:skew(15deg,15deg) 倾斜
transform:translate(10px,20px) 横向:正->右 负->左   纵向：正->下 负->上

3D:
条件：
transform-style:preserve-3d  在3D空间展示
perspective:2000  视距 （离着多远看这个物体）

transform:rotate3d(rx,ry,rz,a)  翻转 rx,ry,rz单位：向量 a角度
->2d矩阵 ->3D矩阵
transform:rotateX(45deg) 围着X轴翻转 正->往前翻转 负->往后翻转
transform:rotateY(45deg) 围着Y轴翻转 正->往右翻转 负->往左翻转
transform:rotateZ(45deg) 效果等同于rotate方法，但是在Z轴翻转
transform:rotateX(45deg) rotateY(45deg);

transform:scale3d(sx,sy,sz)
transform:scaleX(2)
transform:scaleY(0.5)
transform:scaleZ() 不能单独使用，必须配合其他变形方法使用才有效果

transform:translate3d(tx,ty,tz);推荐用这种 可以开启手机硬件的加速功能，能让动画更加流畅
transform:translateX(10px);
transform:translateY(10px);
transform:translateZ(10px);近大远小的效果 正->离你越来越近 负->离你越来越远  

### 移动端常用的知识点
 - 响应式开发
 - 媒体查询
 - 视口viewport
 - 设备像素比
 - 移动适配rem
 - flex布局
 - 移动端事件
 - 移动端插件,类库
 - 音视频 audio video 
 - 本地数据存储 localStorage sessionStorage 
 - 离线存储（兼容性不太好）
 - canvas图形界面
 - 获取地理位置 Geolocation api
 - file操作的api，html5拖拽 拖拽文件上传的功能
 - HTML5各类API:File、drag、Web Storage 、Web SQL Database、Web workers、Geolocation
 - hybrid模式
  
 
 ## 响应式开发
 概念：指制作一套页面，根据设备的宽度能够自动调整页面的布局，从而在各个设备上显示成最佳的视觉效果
 根据前端相关技术实现这样的思路
 1.viewport 2.媒体查询 3.flex布局，流式布局 4.控制图片max-width/min-width
  - PC端和移动端共用一套页面（小型的项目和小的需求页）
  - PC端和移动端各用一套（大型的项目）-移动端设备的响应式称为移动适配
 
## viewport 视口 
layout viewport  布局视口
visual viewport
ideal viewport 

 <meta name="viewport"   content="width=device-width, user-scalable=no, initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0">
width = device-width 布局视口 = 设备宽度 
user-scalable = no|yes 是否允许用户缩放
initial-scale = 1.0 初始缩放值
maximum-scale 最大缩放值
minimum-scale 最小缩放值

## 媒体查询
目的：根据不同的条件显示不同的样式
@media (not|only) 设备类型 and (媒体条件) {
    //css样式
}
设备类型：all|screen
width 可视窗口的宽
height 可视窗口的高
device-width 设备的宽度
device-height 设备的高度
orientation 判断手机是横着（landscape）还是竖着(portrait)
js中通过window.orientation 判断是横向还是竖着

断点 1000 480


项目参考网站
[招聘类的]
拉钩网：http://www.lagou.com/

猎聘网：http://www.liepin.com/

[电商类的]
京东：http://www.jd.com/

美丽说：http://www.meilishuo.com/

蘑菇街：http://www.mogujie.com/

淘宝/天猫：https://www.taobao.com/


[企业展示]
小米：http://www.mi.com/

百度：https://www.baidu.com/

猎豹：http://www.liebao.cn/
                        

[微博类的]
QQ空间：http://user.qzone.qq.com/

新浪微博：http://weibo.com/

[视频类的]
腾讯视频：http://v.qq.com/
爱奇艺：http://www.iqiyi.com/
乐视体育：http://www.lesports.com/

可以写参考的网站，也可以自己找一个，要求团队合作完成，每人负责一个模块(包含css,js)
明晚 选中项目以及每个人做的页面
二周时间，7月8日周日晚自习展示每组的项目




