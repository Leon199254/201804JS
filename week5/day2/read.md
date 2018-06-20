1.事件
2.事件绑定
3.事件对象
事件发生时相关信息记录下来
标准浏览器下 通过形参的方式
IE浏览器下  window.event
4.事件对象的属性(兼容性)
e = e||window.event
e.clientX 到可视窗口左边的距离
e.clientY 到可视窗口顶端的距离
e.type 事件类型
e.pageX  到文档左边的距离 e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)
e.pageY  到文档顶端的距离 e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)
e.target ||e.srcElement  事件源 （操作元素）
e.preventDefault()  e.returnValue = false  阻止默认行为
e.stopPropagation() e.cancelBubble = true  阻止事件冒泡
事件传播阶段:
事件冒泡：由内往外
事件捕获: 由外往内
什么叫事件冒泡？当前元素的事件被触发时，绑定相同事件的祖先元素，他们的事件也会被依次触发
事件委托 ->利用下事件冒泡


DOM2级事件绑定：
- 标准浏览器下 ele.addEventListener(type,fn,false)
- IE浏览器下 ele.attachEvent("on"+type,fn);






