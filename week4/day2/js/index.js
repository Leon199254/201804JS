function Banner(id, url) {
    this.banner = document.getElementById(id);
    this.oUl = utils.children(this.banner, "ul")[0];
    this.oLis = this.oUl.getElementsByTagName("li");
    this.oImgs = this.oUl.getElementsByTagName("img");
    this.bannerTip = utils.children(this.banner, "div")[0];
    this.btnLeft = utils.children(this.banner, "span")[0];
    this.btnRight = utils.children(this.banner, "span")[1];
    this.resData = null;
    this.step = 0;//banner的索引
    this.autoTimer = null;//存定时器
    this.url = url;
    this.init();
}

Banner.prototype = {
    init: function () {
        //1.获取数据
        this.getData();
        //2.绑定数据
        this.bindHtml();
        //3.延迟加载
        window.setTimeout(() => {
            this.loadImg();
        }, 1000);
        //4.自动轮播
        this.autoTimer =  window.setInterval(() => {this.autoPlay()},2000);
        //5.启动和停止轮播
        this.overout();
        //6.点击焦点切换banner
        this.bannerBtn();
        //7.点击左右箭头轮播
        this.handleArrow();

    },
    getData: function () {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.url, false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                this.resData = JSON.parse(xhr.responseText);

            }
        };
        xhr.send(null);
    },
    bindHtml: function () {
        let strLi = "";
        let strA = "";
        this.resData.forEach((item, index) => {
            strLi += `<li><img src="" realImg = "${item.img}" ></li>`;
            strA += index == 0 ? `<a href="javascript:void(0)" class="bg"></a>` : `<a href="javascript:void(0)"></a>`;

        });
        strLi += `<li><img src=""  realImg = "${this.resData[0].img}"></li>`;
        this.oUl.innerHTML = strLi;
        this.oUl.style.width = this.oLis.length * this.oLis[0].offsetWidth + "px";
        this.bannerTip.innerHTML = strA;
    },
    loadImg: function () {
        [...this.oImgs].forEach((item, index) => {
            let tempImg = new Image();
            tempImg.src = item.getAttribute("realImg");
            tempImg.onload = function () {
                item.src = this.src;
                animate(item, {opacity: 1}, 500);
            }
        })
    },
    autoPlay: function () {
            this.step++;
            if (this.step === this.oLis.length) {
                this.oUl.style.left = 0;//瞬间到第一张
                this.step = 1;//紧接着第二张
            }
            animate(this.oUl, {left: -this.step * this.oLis[0].offsetWidth}, 1000);
            this.focusFn();
    },
    focusFn: function () {
        this.oAs = utils.children(this.bannerTip,"a");
        let step = this.step === this.oLis.length - 1 ? 0 : this.step;
        this.oAs.forEach((item, index) => {
            step == index ? utils.addClass(item, "bg") : utils.removeClass(item, "bg");
        })
    },
    overout: function () {
        this.banner.onmouseover = ()=>{
            //去掉自动轮播，左右箭头显示出来
            window.clearInterval(this.autoTimer);
            this.btnLeft.style.display = this.btnRight.style.display  = "block";
        };
        this.banner.onmouseout = ()=>{
            //箭头消失，重新自动轮播
            this.btnLeft.style.display = this.btnRight.style.display  = "none";
            this.autoTimer = window.setInterval(()=>{
                this.autoPlay();
            },2000)
        }
    },
    bannerBtn: function () {
        this.oAs = utils.children(this.bannerTip,"a");
        this.oAs.forEach((item,index)=>{
            item.onclick = ()=>{
                this.step = index;
                animate(this.oUl,{left:-this.step*this.oLis[0].offsetWidth},1000);
                this.focusFn();
            }
        })
    },
    handleArrow: function () {
        this.btnLeft.onclick = ()=>{
            this.step--;
            if(this.step<0){
                this.oUl.style.left = -(this.oLis.length-1)*this.oLis[0].offsetWidth+"px";
                this.step = this.oLis.length-2;
            }
            animate(this.oUl,{left:-this.step*this.oLis[0].offsetWidth},1000);
            this.focusFn();
        };
        this.btnRight.onclick = ()=>{
            this.autoPlay();
        };
    }
};
