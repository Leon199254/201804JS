//正则  它是一种处理字符串的规则
// 他处理字符串主要分为两种
// 一种是匹配
// 一种是捕获

//字面量
var reg = /\d/;
//构造函数
var reg = new RegExp('zhufeng','g');




//元字符 和 修饰符
//修饰符 i g m
// g:全局匹配
// m:多行匹配
// i:忽略大小写

//元字符

/*
* 特殊元字符  量词元字符  普通元字符
*
* ^ 表示
* 特殊元字符
* \d : 0~9 的数字 [0-9]
* \D : 非数字
* \w : 数字 字母 下划线[0-9a-zA-Z_]
* \W : 非数字字母下划线
* [a-z]: 匹配小写字母 a-z
* [A-Z]: 匹配大写字母 A-Z
* \n : 换行
* \b: 边界
* [abc] == [a-c]
* [^abc]
*
* x|y == [xy]  或的优先级要比 ^ 和 $  高
*
* 量词元字符
*     *  出现0到多次
*     +  出现1次到多次
*     ？ 出现0次或一次
*     {n}出现n次
*     {n,m} 出现n到m次
*     {n,} 最少出现n次
*
* 普通元字符
*
* /dddd/
*
* */
//正则自身带着两个方法 test(匹配)  exec(捕获)

//正则中的小括号的用法
// 1、提升优先级
// 2、分组引用
// 3、分组匹配


console.log(/^2\d{2}$/.test('233'));
'2017-02-02'.replace(/'-'/g,'');
'2017-02-02'.replace(/-/g,'===');
console.log(/\d/.test('12'));
//'werwrw123131fsffsfs232424sfsdfsf'.replace(/\d/g,'=')


// /^18|19$/; //=== > 匹配以18开头 或者  19结束的所有字符
// /^18|19$/.test('1212121wwwwwww19');//true
// /^18|19$/.test('189erwerwrwrw');//true
// /^18$/.test('1818');// false只匹配 以 1 开头 中间没有任何字符  以8 结尾
// /^(18|19)$/.test('1818');//等价于 /^18$/ 或者  /^19$/
// /^(18\w+|\w+19)$/.test('1818');
// //等价于  /^18\w+$/ 或者 /^\w19$/
// /12\d$/.test('1122rrr121');
// //等价于  必须以一个数字结束 而且该数字前边必须是12 ，其他的不管
// /^12\d$/.test('1122rrr121');
// //等价于  必须以 1 开头 中间是2  必须以一个数字结尾 ；意思就是必须是 12X
//
// /^2\d{2}$/.test('211');
// // 必须以2开头 后边是两位数字 的三位数字

//手机号码的验证
// /^1[356789]\d{9}/; //一个简单的手机号码验证




//捕获
// var res = /\d+/.exec('zhufeng2018zhufeng');
//拿到字符串中的数字
//返回的结果是一个数组 数组的第一项就是匹配的内容


//正则也是一个对象 /\d/ ===/\d/  false;
//我们用正则去捕获内容时，需要用变量把正则保存起来，用来保证使用的是同一个正则

var reg2 = /\d+/g;
// reg2.exec('zhufeng2017zhufenge2018zhufeng2019zhufeng2020');

var ary = [];
var str = 'zhufeng2017zhufenge2018zhufeng2019zhufeng2020';
// for(let i = 0; ;i++){
//     var arr = reg.exec(str);
//     if(arr){
//         ary.push(arr[0])
//     }else {
//         break;
//     }
// }
var arr = reg2.exec(str);
while(arr){
    ary.push(arr[0]);
    arr = reg2.exec(str);
}
console.log(ary);


//字符串的match
var reg3 = /\d+/;
reg3.exec('er2012dsfsf1232sdfvsdf3424');
'er2012dsfsf1232sdfvsdf3424'.match(reg3);
var reg4 = /\d+/g;
'er2012dsfsf1232sdfvsdf3424'.match(reg4);
reg4.exec('er2012dsfsf1232sdfvsdf3424');
//这两者得到的结果是一样的

//字符串的replace
'ww2012-23-23'.replace(/(\d{4})-(\d{2})-(\d{2})/g,function(){
    console.log(arguments);
    var arg = arguments;
    //arg的第一项大正则匹配的内容
    //arg的后几项是小正则匹配到的内容
    //再之后是大正则匹配到的字符开始的索引
    return '>>>'
})
'13500010001'.replace(/(\d{3})(\d{4})(\d{4})/,'$1 **** $3');

var str = 'https://zhufengpeixun.com?t=1q2&q=1e3&y=15&u=21';
var reg = /\w+=\d+/g;
var reg2 = /\w+=\w+/g;
var reg3 = /[^?=&]+=[^?=&]+/g;
str.match(reg3)

var str = '130542189805318453';
var ary = str.match(/\d{6}(\d{4})(\d{2})(\d{2})\d{2}(\d)\w/);

var person = '';
person ='我是'+ ary[1]+'年'+ary[2]+'月'+ary[3]+'日的'+ (ary[4]%2 == 1 ?'男生':'女生');
console.log(person);


