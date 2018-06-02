//call
Object.prototype.toString.call('wwww');
({}).toString.call('wwww');
({a:1}).toString === Object.prototype.toString;

Array.prototype.toString.call('wwwww');

//去调用Object原型上的toString方法；然后把其中的this换成call第一个参数

//call 的用法
/*
* fn.call(f,1,2,3,4);
*
* 本身是用来改变this指向的
* 1、先把fn中的this换成 f;
* 2、从call的第二个参数开始，一项一项的传给 fn
* 3、fn执行（就是让call中的this执行）【fn(1,2,3,4)】fn中的this已经换成f
*
*
* call 中的this 是 fn
* fn   中的this 是 f
* */


/*
* 全局作用域
* 私有作用域
*
* 块级作用域（对let,const 声明的变量起作用）
* 在块级作用域里边不能同时用var 和 function 同时声明一个变量
* 块级作用域对于var具体有什么影响？？？？？
*
*
* */

for(let i = 0; i < 4; i++){
    oDivs[i].onclick = function () {
        console.log(i)
    }
}
{
    i=0;
    oDivs[0].onclick = function () {
        console.log(i)
    }
}

if(false){
    var a = 12;
    function a() {
        console.log(2)
    }
}//Uncaught SyntaxError: Identifier 'a' has already been declared
for(var i = 0; i<1;i++){

    var a = 12;
    function a() {
        console.log(2)
    }
}//Uncaught SyntaxError: Identifier 'a' has already been declared