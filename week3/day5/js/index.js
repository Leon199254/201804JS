//第一步 拿JSON数据 把数据放到页面上

var data = null;
var xhr = new XMLHttpRequest();
xhr.open('get','./data.json',false);
xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && /^2(\d){2}$/.test(xhr.status)){
        data = utils.toJson(xhr.responseText)
    }
};
xhr.send(null);
console.log(data);

var uls = document.getElementsByClassName('ul');

//1、在这里我们先说好了挨个给ul塞数据
/*
data.forEach((item,index)=>{
    let {src,title,height} = item;
    let str = ` <li style="height:${height}">
                    <img src="${src}" alt="">
                    <p>${title}</p>
                </li>`;
    var n = index%4;//n = [0|1|2|3]  对应uls的索引
    uls[n].innerHTML += str;
});*/

data.forEach((item,index)=>{
    let {src,title,height} = item;
    let str = ` <li style="height:${height}">
                    <img src="./images/timg.gif" trueSrc="${src}" alt="">
                    <p>${title}</p>
                </li>`;
    let minUl = getMinUl();
    minUl.innerHTML += str;
});

//2、思路是先找高度最小的ul塞数据；
// 拿高度 用clientHeight
//拿到高度之后找到高度最小的ul


//目的是找到最小高度的ul
function getMinUl() {
    let ulAry = [...uls];
    let sortAry = ulAry.sort((a,b)=>{
        return a.clientHeight - b.clientHeight
    });
    return sortAry[0];
}

let imgs = document.getElementsByTagName('img');
//这个for是为了给每一个图片加一个自定义属性 用来存储该图片到body的距离
for(let i=0; i< imgs.length ; i++){
    // let t = utils.offset(imgs[i]).top+imgs[i].clientHeight;
    let t = utils.offset(imgs[i]).top + 50;
    imgs[i].imgTop = t;
}

//这个函数是为了对每一个img都做一次图片懒加载的处理
function loadAll() {
    for(let i = 0; i< imgs.length; i++){
        loadImg(imgs[i]);
    }
}

loadAll()//在这执行是为了让当前屏的图片显示出来

//这个函数是为了在屏幕滚动时执行loadAll函数
window.onscroll = function () {
    loadAll();
};


function loadImg(img){
    if(img.loaded){
        return;
    };
    var tempTop = utils.win('scrollTop') + utils.win('clientHeight');
    if(img.imgTop <= tempTop){
        img.style.opacity = 0;
        var trueSrc = img.getAttribute('trueSrc');
        var tempImg = document.createElement('img');
        tempImg.src = trueSrc;
        tempImg.onload = function () {
            img.src = trueSrc;
            img.loaded = true;
            setTimeout(function () {
                img.style.opacity = 1;
            },200);

        };
        tempImg = null;
    }
}

