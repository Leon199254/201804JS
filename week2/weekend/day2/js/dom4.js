//文档碎片
var frag = document.createDocumentFragment();

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
    eleAry.sort(function (a,b) {
        var num1 = a.getAttribute('data-age');
        var num2 = b.getAttribute('data-age');
        return num2 - num1;
    });
    eleAry.forEach((item)=>{
        frag.appendChild(item)
    });
    console.log(frag);
    oUl.appendChild(frag);
    frag = null;
}