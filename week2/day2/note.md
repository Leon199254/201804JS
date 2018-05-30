## call,apply,bind用法
call 第一个参数用来改变.前面方法里的this关键字 ，从第二个参数开始，把这些参数一个一个的传给.前面的方法
apply
bind 传参的方式跟call一样

try....catch.....
一开始新进入try语句里，若抛出错误，则会被catch语句捕获 e.message打印出错误信息，若没有报错不会走到catch语句里
好处：一旦代码发生错误，会被捕获到，不会阻止下面的代码运行