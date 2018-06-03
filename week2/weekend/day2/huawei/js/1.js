//1、要用ajax去后台拿数据
function toJson(jsonStr) {
    var json = null;
    try{
        json = JSON.parse(jsonStr)
    }catch (e) {
        json = eval("("+jsonStr+")");
    }
    return json;
}

var data = null;//为了接收从后台请求到的数据
var xhr = new XMLHttpRequest();
xhr.open('get','json/data.json',false);
xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && xhr.status == 200){
        data = toJson(xhr.responseText)
    }
};
xhr.send(null);
console.log(data);//已经从后台拿到了数据

//接下来需要把数据转化成前端能看的页面数据就可以了

var oUl = document.getElementById('list');
function giveHtml() {
    var str = ``;
    data.forEach((item)=>{
        str +=`
        <li><a href="javascript:;">
            <img src="${item.img}" alt="">
            <p>${item.title}</p>
            <span>￥${item.price}</span><br/>
            <span>时间：${item.time}</span><br/>
            <span>热度：${item.hot}</span>
        </a></li>`
    });
    oUl.innerHTML = str;
}
giveHtml();

//
// var frag = document.createDocumentFragment();
// data.forEach((item)=>{
//     var li = document.createElement('li');
//     var str = `<a href="javascript:;">
//             <img src="${item.img}" alt="">
//             <p>${item.title}</p>
//             <span>￥${item.price}</span><br/>
//             <span>时间：${item.time}</span><br/>
//             <span>热度：${item.hot}</span>`;
//     li.innerHTML = str;
//     frag.appendChild(li);
// })
// oUl.appendChild(frag);

//获取要点击的标签
var header = document.getElementById('header');
var timeBtn = header.getElementsByTagName('a')[0];
//点击标签要实现 排序的功能  我们把排序的功能放到sortEle这个函数里边做
timeBtn.onclick = function () {
    sortEle();
};
var flag = 0;//0 初始状态  -1 降序 1 升序
// function sortEle() {
//     if(flag == 1){
//         data.sort((a,b)=>{
//             var timeA = a.time.split('-').join('');
//             var timeB = b.time.split('-').join('');
//             return  timeB - timeA;
//         });
//         flag = -1;
//     }else {
//         data.sort((a,b)=>{
//             var timeA = a.time.split('-').join('');
//             var timeB = b.time.split('-').join('');
//             return  timeA - timeB;
//         });
//         flag = 1;
//     }
//
//     giveHtml();
// }




var btns = header.getElementsByTagName('a');
for(let i =0; i < btns.length; i++){
    btns[i].onclick = function () {
        sortEle(i);
    }
}

var flagAry = [0 ,0 ,0];//1 升序 -1 降序  0原始数据
// function sortEle(n) {
//     switch (n){
//         case 0:
//             if(flagAry[0] == 1){
//                 data.sort((a,b)=>{
//                     var num1 = a.time.split('-').join('');
//                     var num2 = b.time.split('-').join('');
//                     return num2 - num1;
//                 })
//                 flagAry[0] = -1;
//             }else {
//                 data.sort((a,b)=>{
//                     var num1 = a.time.split('-').join('');
//                     var num2 = b.time.split('-').join('');
//                     return num1 - num2;
//                 })
//                 flagAry[0] = 1;
//             }
//             break;
//         case 1:
//             if(flagAry[1] == 1){
//                 data.sort((a,b)=>{
//                     return b.price - a.price;
//                 })
//                 flagAry[1] = -1;
//             }else {
//                 data.sort((a,b)=>{
//                     return a.price - b.price;
//                 })
//                 flagAry[1] = 1;
//             }
//             break;
//         default:
//             if(flagAry[2] == 1){
//                 data.sort((a,b)=>{
//                     return b.hot - a.hot;
//                 })
//                 flagAry[2] = -1;
//             }else {
//                 data.sort((a,b)=>{
//                     return a.hot - b.hot;
//                 })
//                 flagAry[2] = 1;
//             }
//             break;
//     }
//     // data.sort((a,b)=>{
//     //     switch (n){
//     //         case 0:
//     //             var num1 = a.time.split('-').join('');
//     //             var num2 = b.time.split('-').join('');
//     //             return num1 - num2;
//     //             break;
//     //         case 1:
//     //             return a.price - b.price;
//     //             break;
//     //         default:
//     //             return a.hot - b.hot;
//     //     }
//     // })
//     giveHtml();
// }
var ary = ['time','price','hot'];
function sortEle(n) {
    if(flagAry[n] == 1){
        data.sort((a,b)=>{
            var num1 = a[ary[n]].toString().replace(/-/g,'');
            var num2 = b[ary[n]].toString().replace(/-/g,'');
            return num2 - num1;
        })
        flagAry[n] = -1
    }else {
        data.sort((a,b)=>{
            var num1 = a[ary[n]].toString().replace(/-/g,'');
            // a['price']==a.price
            var num2 = b[ary[n]].toString().replace(/-/g,'');
            return num1 - num2;
        })
        flagAry[n] = 1
    }
    giveHtml();
}