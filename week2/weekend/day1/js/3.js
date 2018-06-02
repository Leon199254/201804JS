// sort
var ary = [1,3,2,55,33,21];
ary.sort(function (a,b) {
    return a - b;
});
ary.sort((a,b)=>{
    return a - b;
});


// var ary = ['a','h','d','w','s'];
// ary.sort((a,b)=>{
//     return a.localeCompare(b)//a - b
// });

var ary = ['张三','李四','王五','马六','赵帅'];
ary.sort(function (a,b) {
    return a.localeCompare(b,'zh');
});