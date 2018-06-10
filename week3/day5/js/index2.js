//第一步 拿JSON数据 把数据放到页面上

var data = null;
function ajax() {
    var xhr = new XMLHttpRequest();
    xhr.open('get','./data.json',false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && /^2(\d){2}$/.test(xhr.status)){
            data = utils.toJson(xhr.responseText)
        }
    };
    xhr.send(null);
}
ajax();

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

//目的是找到最小高度的ul
function getMinUl() {
    let ulAry = [...uls];
    let sortAry = ulAry.sort((a,b)=>{
        return a.clientHeight - b.clientHeight
    });
    return sortAry[0];
}

function giveHtml(){
    data.forEach((item,index)=>{
        let {src,title,height} = item;
        let str = ` <li style="height:${height}">
                    <img src="./images/timg.gif" trueSrc="${src}" alt="">
                    <p>${title}</p>
                </li>`;
        let minUl = getMinUl();
        minUl.innerHTML += str;
    });
}
giveHtml();


//2、思路是先找高度最小的ul塞数据；
// 拿高度 用clientHeight
//拿到高度之后找到高度最小的ul


let imgs = document.getElementsByTagName('img');
//这个for是为了给每一个图片加一个自定义属性 用来存储该图片到body的距离

//这个函数是为了对每一个img都做一次图片懒加载的处理
function loadAll() {
    for(let i = 0; i< imgs.length; i++){
        let t = utils.offset(imgs[i]).top + 50;
        imgs[i].imgTop = t;
        loadImg(imgs[i]);
    }
}

loadAll();//在这执行是为了让当前屏的图片显示出来

//这个函数是为了在屏幕滚动时执行loadAll函数
window.onscroll = function () {
    loadMore();//加载更多数据
    loadAll();//进行所有图片的懒加载
};

//单张图片的懒加载处理
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

//怎么实现下滑到一定程度时，接着请求其他的数据来填充页面？？
//就是当最短的那个ul露出尾部的时候就要去请求新的数据了；
function loadMore() {
    let ul = getMinUl();
    let ulTop = utils.offset(ul).top + ul.clientHeight;
    //ulTop 时存储的ul底边到body顶部的距离
    let tempTop = utils.win('scrollTop') + utils.win('clientHeight');
    //tempTop  存储的时当前屏幕+滚动卷过去的高度之和

    if(ulTop <= tempTop){
        //说明ul的底边已经露出了
        ajax();//请求数据用的
        giveHtml();//把数据塞到页面
        setImgTop();//给新加载的img计算top值并存储到img的私有属性上
    }
}

