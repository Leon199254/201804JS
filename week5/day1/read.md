##什么是事件?
指一件事或一个行为 部分情况下，事件会以元素属性的形式存在
鼠标事件：
 click,mouseover,mouseout,mouseenter,mousemove,mouseleave,mousewheel .....
   
键盘事件：
 keydown(按下时触发)，keyup(抬起来时触发),keypress(按下并抬起来时触发 ) 系统按钮（例如，箭头键和功能键）无法得到识别。 
 
系统事件：
 load(加载完后触发) window.onload = function(){}
 resize(窗口发生改变时触发) window.onresize = function(){}
 scroll(滚动条发生改变时触发) window.onsrcoll   oDiv.onsrcoll
 DOMContentLoaded  dom元素加载完后触发

表单元素相关事件
 focus(光标聚焦表单时触发)
 blur(光标离开表单元素时触发)
 change(表单元素发生改变时触发) 例如下拉框 
 .....
 
 
## 事件绑定
对这件事绑定一个方法，这个方法指的是这件事的行为，当事件发生时，会执行对应绑定的方法，这就叫事件绑定
DOM0级事件绑定和DOM2级事件绑定
DOM0级事件绑定：事件以属性形式存在
oDiv.onclick = function(){}
问题：
    - 对同一个元素同一个事件绑定多个行为时，绑定的方法会发生覆盖
    - 部分事件可以DOM0级绑定，还有一些只能以DOM2级事件的方式绑定
    
##事件对象
 记录着与事件相关的信息
 - 标准浏览器下 事件绑定的方法默认会有个形参，这个形参就是事件对象 
 - IE浏览器下 事件对象放在window.event里
 
e.clientX  到可视窗口的左边
e.clientY  到可视窗口的顶端
e.pageX  到文档的左边 e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)
e.pageY  到文档的顶端 e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)
e.target; 事件源 事件绑定的元素
e.type   事件类型
e.preventDefault 阻止默认行为
e.stopPropagation  阻止事件冒泡