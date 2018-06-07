## client系列
clientWidth = width+padding(左右)
clientHeight = height+padding(上下)
clientLeft 左边框
clientTop 上边框

## offset系列
offsetWidth  = width+padding+border = clientWidth+border
offsetHeight =height+padding+border = clientHeight+border
offsetParent 参照物 找最近的已经定位的父级元素，若没找到则就是body 
offsetLeft 左偏移  当前元素外边框到参照物内边框的距离
offsetTop 上偏移

需求：不管当前元素参照物是谁，求当前元素到body的偏移量（左偏移量和上偏移量）
- 先求当前元素到它参照物（A）的偏移量
- 接着累加现在这个参照物（A）到它父级参照物(B)的偏移量
- 接着继续累加B到它的父级参照物值（C）的偏移量，直到C是body则不会再累加偏移量
## scroll系列
scrollWidth 约等于真实内容的宽度+左padding
scrollHeight 约等于真实的高度+上padding值
scrollLeft 滚动条横向卷出去的宽度
scrollTop  滚动条纵向卷出去的高度

scrollLeft和scrollTop 有最大值和最小值
 - 最小值是0
 - 最大值 = 真实的高度 - 一屏的高度
 - 可以设置这两个属性值，但若超过最大值和最小值时还是最大值和最小值
> 实现无缝滚动的关键，把ul内容复制一份，当滚动条走到ul内容宽度一半(box的宽度)时，也就是滚动条走到了末尾位置，让滚动条从起始位置重新开始走 


## js13个属性细节知识点
- 获取的值都是整数，不会带单位
- 只有scrollLeft和scrollTop可以设置值，其他的只能获取值，不能设置值

## 如何获取内嵌式或外链式里的css属性值
- 标准浏览器下 提供了一个方法可以获取任意css属性值
    window.getComputedStyle(ele,null)[attr]
- IE8及以下浏览器 提供了一个属性，属性里包含所有的css属性
    ele.currentStyle
    
## 浏览器兼容性问题处理的方式
 - try...catch...
 - 判断属性的方式
   window.getComputedStyle 
   "getComputedStyle" in window
- 检测数据类型
 *变量不存在时不能直接调用，但是可以通过typeof检测 检测的结果是字符串 
 typeof getComputedStyle == "function"
 ele instanceof Array  判断ele是否属于Array类
 Object.prototype.toString.call(ele) == "[object Array]" (最准确的方式)
- 判断浏览器的
  - !/MSIE [6-8]\.0/.test(navigator.userAgent)
  - navigator.userAgent.indexOf("MSIE 8.0")==-1 不是ie8  

## 升级getCss方法
 - res进行处理  返回的是字符串
  字符串中是数值或数值+单位 ->提取数值部分转换成数类型
  主要是获取这些属性值：width|height|padding|margin|left|top|right|bottom|opacity
  
## 注意
 - getComputedStyle和currentStyle只能获取值，不能设置
 
## setCss 设置属性值
 - 1.判断属性attr是否是width|height|margin|padding|left|top|right|bottom.... 
 - 2.如果是，判断value是否带单位，若没带则添加单位，若带原值返回
     如果不是，则直接返回 ele.style[attr] = value;