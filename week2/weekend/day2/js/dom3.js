
var data = null;
var xhr = new XMLHttpRequest();
xhr.open('get','data.json',false);

xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && xhr.status == 200){
        // data = JSON.parse(xhr.responseText);
        data = utils.toJson(xhr.responseText);
        // console.log(data);
    }
};
xhr.send(null);
console.log(data);
var oUl = utils.getById('oUl');

// data.forEach((item)=>{
//     let {code,name,age} = item;
//     str += `<li>
//                 <span>${code}</span>-
//                 <span>${name}</span>-
//                 <span>${age}</span>
//             </li>`
// });
// oUl.innerHTML = str;
function giveHtml(){
    var str = ``;
    data.forEach((item)=>{
        let {code,name,age} = item;
        str += `<li>
                <span>${code}</span>-
                <span>${name}</span>-
                <span>${age}</span>
            </li>`
    });
    oUl.innerHTML = str;
}
giveHtml();

var age = utils.getById('age');
var flag = 0;//0 代表原始数据  1 代表升序 -1 代表降序
age.onclick = sortEle;
age.onclick = function () {
    // console.log(2)
    sortEle();
};
function sortEle() {
    if(flag == 1){
        data.sort((a,b)=>{
            return b.age - a.age;
        });
        flag = -1;
    }else {
        flag = 1;
        data.sort((a,b)=>{
            return a.age - b.age;
        });
    }
    // data.sort((a,b)=>{
    //     return a.age - b.age;
    // });

    giveHtml();
}

//我不去操作DOM元素，而是直接操作原始数据，把原始数据排好序，在根据排好序的数据拼接字符串，放到页面中即可

//DOM的重绘和回流机制

/*
* DOM 重绘 改变元素的样式会让浏览器重新渲染该DOM元素；比较省性能
*
* DOM 回流机制 改变元素的位置、改变元素结构的时候会触发浏览器的回流机制；比较消耗性能
*
*
* 工作中要尽量减少触发DOM回流的操作
* */





