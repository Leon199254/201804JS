let banner = (function () {
    let banner = document.querySelector("#banner"),
        oUl = document.querySelector("#banner>ul"),
        oLis = oUl.getElementsByTagName("li"),
        oImgs = oUl.getElementsByTagName("img"),
        bannerTip = document.querySelector(".bannerTip"),
        oAs = bannerTip.getElementsByTagName("a"),
        btnLeft = document.querySelector(".btnLeft"),
        btnRight = document.querySelector(".btnRight"),
        autoTimer = null,
        step = 0,
        resData = null;

    function getData() {
        let xhr = new XMLHttpRequest();
        xhr.open("get","json/data.json",false);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4&&/^2\d{2}$/.test(xhr.status)){
                resData = JSON.parse(xhr.responseText)

            }
        }
        xhr.send(null);

    }
    let strLi = ``;
    let strA = ``;
    function bindHtml(){
        resData.forEach((item,index)=>{
            strLi+=`<li><img src="" realImg="${item.img}"></li>`;
            strA+=index===0?`<a href="javascript:void(0)" class="bg"></a>`:`<a href="javascript:void(0)"></a>`
        });
        oUl.innerHTML = strLi;
        bannerTip.innerHTML = strA;
        let first = oLis[0].cloneNode(true);//第一个li克隆下
        oUl.appendChild(first);
        //改变ul标签宽度 = li的个数*li的宽度
        utils.css(oUl,"width",oLis.length*oLis[0].offsetWidth);
    }
    function loadImg(){
        [...oImgs].forEach((item,index)=>{
            let tempImg = new Image();
            tempImg.src = item.getAttribute("realImg");
            tempImg.onload = function(){
                item.src = this.src;
                animate(item,{opacity:1},500);
            }
        })
    }
    function autoPlay(){
        step++;
        if(step===oLis.length){
            oUl.style.left = 0;
            step = 1;
        }
        animate(oUl,{left:-step*1000},500);
        focusFn();
    }
    function focusFn(){
        //若是最后一张banner,相当于显示的是第一个banner,索引为0
        let newStep = step == oLis.length-1?0:step;
        [...oAs].forEach((item,index)=>{
            //遍历a标签，若a标签的索引跟当前显示banner的索引一样，则这个a标签添加类名bg,其他的a标签移除类名bg
            newStep == index ? utils.addClass(item,"bg"):utils.removeClass(item,"bg");
        })
    }
    function overout(){
        //划过时，去掉自动轮播效果，左右箭头显示出来
        banner.onmouseover = ()=>{
            clearInterval(autoTimer);
            btnLeft.style.display = btnRight.style.display = "block";
        }
        //划出时：左右箭头隐藏，再重新自动轮播
        banner.onmouseout = ()=>{
            btnLeft.style.display = btnRight.style.display = "none";
            autoTimer = window.setInterval(autoPlay,2000);
        }
    }
    function bannerBtn(){
        [...oAs].forEach((item,index)=>{
            item.onclick = ()=>{
                step = index; //把要显示的banner的索引改成当前点击焦点的索引
                animate(oUl,{left:-step*1000},500);
                focusFn();
            };
        })
    }

    function handleArrow(){
        btnLeft.onclick = function(){
            step--;
            if(step<0){
                //立马到最后一张
                oUl.style.left = -(oLis.length-1)*1000+"px";
                step = oLis.length-2;//紧接着走到倒数第二张
            }
            animate(oUl,{left:-step*1000},500);
            focusFn();
        };
        btnRight.onclick = autoPlay;
    }
    return {
        init() {
            //1.获取数据
            getData();
            //2.绑定数据
            bindHtml();
            //3.延迟加载
            window.setTimeout(loadImg,1000);
            //4.自动轮播
            autoTimer = window.setInterval(autoPlay,2000);
            //5.启动和停止轮播
            overout();
            //6.点击焦点切换
            bannerBtn();
            //7.点击左右箭头切换
            handleArrow();
        }
    }
})();
banner.init();