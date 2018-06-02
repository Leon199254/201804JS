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

function f1() {
    console.log(1)
}
function f2(n,m) {
    console.log(2,n,m);
    this();
    console.log(this)
}
f2.call(f1,12,23,34);

f1.call(1);
//把f1 中的this 换成 1；  ---》让call里边的this（f1）执行

f1.call.call(f2);
//f1.call2.call1(f2)
//1、把f1.call2 里边的this 换成 f2
//2、然后让 call1 里边的 this(f1.call2) 执行
//3、 f1.call2 执行 ==》f1.call2 中的this（f2）执行


//1 -- 2 12 23
//2 -- 1
//3 -- f1
/*
* 1 f2 中的this 换成 f1
* 2 把12 23 34 传给 f2
* 3 f2执行 f2(12,23,34)
* */



function f3(name,age) {
    this.name = name || 'xiaohong';//左边为真则取左，左边为假则取右
    this.age = age && 18;//左边为真则取右，左边为假则取左
}
// var obj = {name:'',age:''};
var obj = {};
console.log(obj);
f3.call(obj,'xiaoming',20);
/*
* 1、f3 中的this 换成 obj;
* 2、name=xiaoming age 20
* 3、f3(xiaoming,20);
* obj.name = 'xiaoming'|| 'xiaohong' -->xiaoming ；
* obj.age = 20&&18 -->18
* */
console.log(obj);//{name:'xiaoming',age:18}
f3.call(obj);
/*
* 1、f3 中的this改成 obj;
* 2、f3 把call后边的参数给f3
* 3、f3()
* obj.name = undefined || 'xiaohong'  -->'xiaohong'
* obj.age = undefined && 18 -->undefined
* */
console.log(obj);


//apply
//他跟call机制一样，唯一的区别就是传参数的形式；call是从第二个参数散着传过去；
//apply是通过数组或者类数组的方式传过去，传给函数的时候，函数还是散着接收的
var ary = [12,34,23,234,545,23];
Math.max.apply(null,ary);
Math.max(1,2,3,4,5,7,8);//==8



//bind
/*
var res = fn.bind(f,1,2,3)
* 1、先把fn中this换成f,
* 2、把1，2，3传给 fn
* 3、返回一个由fn组成的新函数；
*
* res();fn(1,2,3)--fn中的this换成了f
* */
var f8 = function (n,m,q,w,e,r,t) {
    console.log(1,n,m,q,w,e,r,t);
    console.log(this);
};
var f9 = function () {
    console.log(2);
};
var f10 = f8.bind(f9,1,2,3);
f10(4,5,6);//f8(1,2,3,4,5,6) -->f8中的this已经换成了f9
Function.prototype.bind = function () {
    var arg = arguments;//arguments本身就是一个对象，不是Arguments的一个实例
    var that = arg[0] || window;//f9
    // arguments.slice(1);
    // arguments.__proto__ = Array.prototype;
    var ary1 = Array.prototype.slice.call(arg,1);//[1,2,3]
    var _this = this;//f8
    return function () {//f10
        var ary2 = [].slice.call(arguments,0);//[4,5,6]
        var ary3 = ary1.concat(ary2);
        _this.apply(that,ary3);//==>f8.apply(f9,[1,2,3,4,5,6])
    }
};
function f() {
    return function () {

    }
}

var ary = [12,23,5,34,23,44,20];
//1、先排序 再去拿首尾项即可
//2、Math.max.apply(null,ary);
//3、假设法--思想就是 假设第一个就是最大的 然后挨个比较；比现在的大就交换，否则继续往下找，知道找完整个数组
var max = ary[0],min = ary[0];
for(let i = 1; i < ary.length; i++){
    if(max < ary[i]){
        max = ary[i];
    }
    if(min > ary[i]){
        min = ary[i]
    }
}
ary.forEach(function (item, index) {
    if(max < item){
        max = item;
    }
    if(min > item){
        min = item
    }
});
ary.forEach((item, index) => {
    if(max < item){
        max = item;
    }
    if(min > item){
        min = item
    }
});
var ary2 = ary.map((item, index) => {
    if(max < item){
        max = item;
    }
    if(min > item){
        min = item
    }
});
//箭头函数写法
var ary3 = ary.map( item=>{
    return item * 2;
});
//普通函数写法
var ary3 = ary.map(function (item) {
    return item * 2;
});

var ary3 = [];
//普通函数写法
ary.forEach(function (item) {
    ary3.push(item*2)
});
//箭头函数写法
ary.forEach((item) => {
    ary3.push(item*2)
});

//map 和 forEach  都是循环数组用的；
// 区别就是 map会把小函数（回调函数）返回的结果组成一个新数组返回
// 而forEach  没有返回值
console.log(ary2);

//4 Es6
Math.max(...ary);//Math.max(12,23,5,34,23,44,20);
Math.min(...ary);//Math.min(12,23,5,34,23,44,20);


console.log(max, min);


// function f6(n,m) {
//     console.log(n,m)
// }
// f6();
// f6(1,2);


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
let a = b = 10;
function ab(){
    console.log(a,b);
    let a = b = 20;
    console.log(a,b);
};
var oDivs = [];
for(let i = 0; i < 4; i++){
    // let i =i 10;
    oDivs[i].onclick = function () {
        console.log(i)
    }
    let i = 10;
}// i 是在哪里声明的？？里边还是外边
console.log(i);
// {
//     i=0;
//     oDivs[0].onclick = function () {
//         console.log(i)
//     }
// }

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

// let i =14;
// let num =null;
// for (let i=0 ;i<4;i++ ){
//     {
//         let i =12;
//         num+=i;
//         console.log(i);
//     }
//     let i= 15;
// }
// console.log(num);
// console.log(i);
//
//
// {
//     let i = 0;
//     {
//         oDivs[0].onclick = function () {
//             console.log(i)
//         }
//     }
// }




// var obj ={
//     name:'1',
//     age:3,
//     sex:1
// };
// // let {name,age,sex} = obj;
//
// let a = {...obj};