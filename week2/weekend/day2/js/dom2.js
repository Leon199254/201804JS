
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
var str = '';


data.forEach((item)=>{
    let {code,name,age} = item;
    str += `<li data-age="${age}">
                <span>${code}</span>-
                <span>${name}</span>-
                <span class="ageNum">${age}</span>
            </li>`
});
oUl.innerHTML = str;

var age = utils.getById('age');

var lis = document.getElementsByTagName('li');
age.onclick = sortEle;
age.onclick = function () {
    sortEle();
};
function sortEle() {
    var eleAry = [...lis];
// var eleAry = [].slice.call(lis,0);
//把类数组转化成数组
//1、for 循环
//2、...
//3、使用call
    eleAry.sort(function (a,b) {
        var num1 = a.getAttribute('data-age');
        var num2 = b.getAttribute('data-age');
        // var num2 = b.getElementsByClassName('ageNum')[0].innerHTML;
        return num2 - num1;
    });
    eleAry.forEach((item)=>{
        oUl.appendChild(item)
    })
}

// 让咱们去排序
//1、要拿到需要排序的元素集合
//2、要知道需要根据哪个数据去排序，然后拿到该数据，用该数据把元素数组排好序
//3、根据排好序的元素数组，一项一项的添加到相应的元素中



