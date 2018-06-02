//单例模式  本身就是一个简单的对象；它产生的原因就是为了防止变量命名冲突；命名空间
var person1 = {
    name:'xiaoming',
    age:16
};
//高级单例模式
var person2 = (function () {
    var name1 = 'xiaohong';
    var getName = function () {
        // console.log(this.name1)
        // console.log(name)
        console.log(name1)
    };
    return{
        name1:name1,
        // name:name1,
        getName:getName
    }
})();

person2.getName();//xiaohong
var fn = person2.getName;
fn();


function Fn() {
    this.x = 100;
    this.y = 200;
    this.sum = function () {
        console.log(this.x + this.y);//处理的业务逻辑
        // var f2 = new  Fn;
        return this;//返回的是 这个类的实例；只有这个类的实例才能调用这个类的方法
    };
    this.minus = function () {
        console.log(this.y - this.x);
    }
}
//实现链式写法的关键在于  return this（或者这个类的一个实例）

var f = new Fn;//不传参数  小括号写不写无所谓；
// f = {
// //     x
// //     ...
// // }
console.log(f.sum());//Fn {x: 100, y: 200, sum: ƒ, minus: ƒ}
f.sum().minus();//undefined.minus()
//当return this 的时候 --》f.sum()执行返回的是 f 这个实例； 接着执行的就是 f.minus();
f.minus();

var ary = [1,2,3,4,5,6];
Array.prototype.push2 = function (n) {
    this[this.length] = n;
    return this;
};
Array.prototype.pop2 = function () {
    this.length--;
    return this;
};
var ary2 = ary.slice().push2(10).pop2().push2(23);//slice 里边的 this 就是 ary
//ary.slice()返回的是一个新的数组 ，数组就能调用Array原型上的方法
console.log(ary2,ary);

