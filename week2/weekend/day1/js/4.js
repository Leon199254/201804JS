// ajax
//1 创建一个Ajax
var data = null;
var xhr = new XMLHttpRequest();

//2 打开XHR
// 第一个参数是 请求接口的方式
// 第二个参数是 请求文件的路径
// 第三个参数是 同步异步  true代表异步 false代表同步
xhr.open('get','json/data.json',false);

//3 监听请求的状态
//readyState
//0 还没发送请求
//1 代表发起请求
//2 获取响应头信息
//3 请求中
//4 请求结束

//status 网络状态码
//2 开头的代表 成功
//3 代表转接 --》重定向
//4 基本代表前端请求路径错误
//5 都是后台出错
xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && xhr.status == 200){
        // data = JSON.parse(xhr.responseText);
        data = utils.toJson(xhr.responseText);
        // console.log(data);
    }
};


//4 发送请求
xhr.send(null);
console.log(data);
var oUl = utils.getById('oUl');
// oUl.innerText = JSON.stringify(data);
var str = '';
// for(var i = 0; i < data.length; i++){
//     var item = data[i];
//     str += '<li>' +
//         '<span>'+item.code+'</span>'+'-'+
//         '<span>'+item.name+'</span>'+'-'+
//         '<span>'+item.age+'</span>'+
//         '</li>';
// }

data.forEach((item)=>{
    let {code,name,age} = item;
    str += `<li>
                <span>${code}</span>-
                <span>${name}</span>-
                <span>${age}</span>
            </li>`
});
//1、for -->forEach
//2、箭头函数
//3、字符串模板

//对象的解构赋值
let obj = {name:1,age:2,sex:3};
let {name} = obj;
let {name2='xiaoming'} = obj;
let {age:age2} = obj;
//如果想用别的变量名接受对象中的数据，就是用对象属性名 : 变量名 = 对象
console.log(name,age2,name2);

//数组的解构赋值
// let [a,b,c] = [1,2,3,4,5,6,7];
// let [a,b,c] = [1];
let [a,,c] = [1,2,3];
let [a1,b1,...c1] = [1,2,3,4,5,6,7];//结构的项必须放到最后一项，否则报错
console.log(a, b, c);
console.log(a1, b1, c1);

oUl.innerHTML = str;




// function toJson(jsonStr) {
//     // if('JSON' in window){
//     //     return JSON.parse(jsonStr)
//     // }else {
//     //     return eval("("+jsonStr+")")
//     // }
//     var data = null;
//     try {
//         data = JSON.parse(jsonStr);
//     }catch (e) {
//         data = eval("("+jsonStr+")")
//     }finally {
//
//     }
//     return data;
// }
//
// //try catch
// try{
//     console.log(qww)
// }catch(e){
//     console.log(e)
// }finally{
//     console.log('1234')
// }

//JSON.stringify(JSON)  把JSON对象转成JSON字符串