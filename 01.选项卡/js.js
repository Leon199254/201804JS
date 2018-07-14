let oCenter = document.getElementById('center');
let oMenu = document.getElementById('menu');
let oSpans = oMenu.getElementsByTagName('span');
let oDivs = oCenter.getElementsByTagName('div');

//设置默认样式
oSpans[0].className = 'show';
oDivs[0].className = 'show';

//添加点击效果
for (let i = 0; i < oSpans.length; i++) {
    oSpans[i].onmouseover = function () {
        for (let i = 0; i < oSpans.length; i++) {
            oDivs[i].className= '';
            oSpans[i].className= ''
        }
        oSpans[i].className = 'show';
        oDivs[i].className = 'show';
    }
}

/*oSpans[0].onclick = function () {
    for (let i = 0; i < oSpans.length; i++) {
        oDivs[i].style.display = 'none';
        oSpans[i].style.background = '#ffffff'
    }
    oSpans[0].style.background = '#dad2c7';
    oDivs[0].style.display = 'block'
};

oSpans[1].onclick = function () {
    for (let i = 0; i < oSpans.length; i++) {
        oDivs[i].style.display = 'none';
        oSpans[i].style.background = '#ffffff'
    }
    oSpans[1].style.background = '#dad2c7';
    oDivs[1].style.display = 'block'
};

oSpans[2].onclick = function () {
    for (let i = 0; i < oSpans.length; i++) {
        oDivs[i].style.display = 'none';
        oSpans[i].style.background = '#ffffff'
    }
    oSpans[2].style.background = '#dad2c7';
    oDivs[2].style.display = 'block'
};*/
