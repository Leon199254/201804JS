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

    let p = new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open("get","json/data.json");
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4&&/^2\d{2}$/.test(xhr.status)){
                resData = JSON.parse(xhr.responseText);
                resolve(resData);

            }
        }
        xhr.send(null);
    })

    function bindHtml(resData){
        let strLi = ``;
        let strA = ``;
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

    function handleChange(){
        //延迟加载
        window.setTimeout(loadImg,1000);
        //自动轮播
        autoTimer = window.setInterval(autoPlay,2000);
        //启动和停止轮播
        overout();
        //点击焦点切换
        bannerBtn();
        //点击左右箭头切换
        handleArrow();
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
        let newStep = step == oLis.length-1?0:step;
        [...oAs].forEach((item,index)=>{
            newStep == index ? utils.addClass(item,"bg"):utils.removeClass(item,"bg");
        })
    }
    function overout(){

        banner.onmouseover = ()=>{
            clearInterval(autoTimer);
            btnLeft.style.display = btnRight.style.display = "block";
        }

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
           p.then((resData)=>{
               bindHtml(resData);
           }).then(()=>{
              handleChange()
           })
        }
    }
})();
banner.init();