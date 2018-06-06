\d 0~9之间的数字
\w 字母（a-zA-Z） 数字 _
\s 匹配不可见的字符
\n 换行
\b 匹配一个单词的边界
. 除了换行以外的其他任意字符
^ 以...开头
$ 以...结尾
[a-z]a到z之间的一个字符
[abc]a或b或c
[^abc] 除了a或b或c以外其他的字符
[?*.$] 代表字符本身的含义
() 分组的作用 反向引用
a|b a或b
量词元字符
+ 1到多次
* 0到多次
？ 0~1次 可有可无
{n} 出现n次
{n,}最少出现n次，最多不限制
{n,m}最少出现n次，最多出现m次

修饰符
g 全文查找
i 忽视大小写
m 换行查找


 ## JS获取元素的样式
 - 行内式 oDiv.style.width
 - 内嵌式和外链式没法获取(这周来解决)
JS提供了与盒子模型相关的内置属性
 css盒子模型 width,height,margin,padding,border

 ## client系列(与溢出的内容无关) 盒子的宽高与padding的值
 clientWidth = width+padding(左右)
 clientHeight = height+padding(上下)
 clientLeft 左边框
 clientTop 上边框

 ## offset系列(与溢出的内容无关) 盒子的宽高与padding和border的值
 offsetWidth = width+padding(左右)+border(左右)=clientWidth+border(左右)
 offsetHeight = height+padding(上下)+border(上下)=clientHeight+border(上下)

 ###与偏移量相关的属性
 offsetParent 参照物
 offsetLeft 左偏移量
 offsetTop 上偏移量

 ## scroll系列 真实的宽高
 scrollWidth  约等于真实内容的宽度+左padding值
 scrollHeight 约等于真实内容的高度+上padding值

 1.若内容没有溢出:
 scrollHeight ==clientHeight
 scrollWidth == clientWidth
 2.约等于的原因（针对的scrollHeight/scrollWidth）:
  - 不同浏览器默认行高不一样，同一个元素在不同浏览器值不一样
  - 设置overflow属性后(值不一样)，同一个浏览器，值不一样

 scrollLeft  横向滚动条卷出去的宽度
 scrollTop   纵向滚动条卷出去的高度

 ## 获取浏览器可视窗口（一屏）的宽高
 document.documentElement.clientWidth || document.body.clientWidth
 document.documentElement.clientHeight|| document.body.clientHeight
 ## 获取整个文档的宽高
 document.documentElement.scrollWidth ||document.body.scrollWidth
 document.documentElement.scrollHeight ||document.body.scrollHeight
 
 > 窗口发生改变时会触发resize事件
 window.onresize = function(){

 }
 > 获取一屏宽高时写两种方式的原因
 document.compatMode
    "CSS1Compat" 开启了兼容模式
    "BackCompat" 关闭了兼容模式

 ## 细节知识点
  -client系列,offset系列的值，若是小数会四舍五入 scroll系列是取整,舍弃小数部分
  - 13个属性中，只有scrollLeft和scrollTop是可修改的，其他的全部是只能获取值，不能修改值






